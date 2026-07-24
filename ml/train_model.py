import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import xgboost as xgb
# Note: LSTM implementation would require TensorFlow/Keras or PyTorch
# We structure this file to represent the pipeline as requested.
import joblib
from datetime import datetime

# ==========================================
# 1. Data Generation (Pipeline Simulation)
# ==========================================
def load_historical_data() -> pd.DataFrame:
    """
    Simulates loading enriched features from PostgreSQL
    Features include: Rolling averages, ELO ratings, momentum indicators
    Target: 1 (Home Win), 0 (Draw), 2 (Away Win)
    """
    print(f"[{datetime.now().time()}] Querying database for last 5 years of historical match data...")
    
    # Generate mock features for 10,000 matches
    np.random.seed(42)
    n_samples = 10000
    
    data = {
        'home_elo': np.random.normal(1500, 200, n_samples),
        'away_elo': np.random.normal(1500, 200, n_samples),
        'home_xg_rolling_5': np.random.uniform(0.5, 3.0, n_samples),
        'away_xg_rolling_5': np.random.uniform(0.5, 3.0, n_samples),
        'home_momentum_idx': np.random.uniform(0, 100, n_samples),
        'away_momentum_idx': np.random.uniform(0, 100, n_samples),
        'rest_days_home': np.random.randint(3, 10, n_samples),
        'rest_days_away': np.random.randint(3, 10, n_samples),
        'home_odds': np.random.uniform(1.1, 5.0, n_samples),
        'away_odds': np.random.uniform(1.1, 8.0, n_samples),
        # Target representation: 1=Home Win, 0=Draw, 2=Away Win
        'result': np.random.choice([1, 0, 2], p=[0.45, 0.25, 0.30], size=n_samples)
    }
    
    df = pd.DataFrame(data)
    # Add a synthetic signal that actually helps the model learn (Home ELO advantage)
    df.loc[df['home_elo'] > df['away_elo'] + 300, 'result'] = 1 
    
    return df

# ==========================================
# 2. Ensemble ML Architecture
# ==========================================
class PredictionEngine:
    def __init__(self):
        # We use RF and XGBoost as the core ensemble algorithms.
        self.rf_model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
        self.xgb_model = xgb.XGBClassifier(n_estimators=100, learning_rate=0.05, max_depth=5, random_state=42)
        
    def train(self, X_train: pd.DataFrame, y_train: pd.Series):
        print("Training Random Forest...")
        self.rf_model.fit(X_train, y_train)
        
        print("Training XGBoost...")
        self.xgb_model.fit(X_train, y_train)
        
    def predict_proba(self, X: pd.DataFrame) -> np.ndarray:
        """Averages the probability outputs of the ensemble models"""
        rf_probs = self.rf_model.predict_proba(X)
        xgb_probs = self.xgb_model.predict_proba(X)
        
        # Soft Voting Ensemble
        ensemble_probs = (rf_probs + xgb_probs) / 2.0
        return ensemble_probs

# ==========================================
# 3. Bet Sizing & Confidence Thresholding
# ==========================================
def calculate_kelly_criterion(prob_win: float, decimal_odds: float) -> float:
    """
    Calculates the Kelly Criterion percentage to wager.
    Formula: f* = (bp - q) / b
    where b = decimal_odds - 1, p = prob_win, q = 1 - p
    """
    b = decimal_odds - 1.0
    q = 1.0 - prob_win
    f_star = (b * prob_win - q) / b
    
    # Safe Kelly: Halve the recommended stake to manage variance
    safe_kelly = max(0.0, f_star * 0.5)
    # Cap maximum stake at 5% of bankroll per bet
    return min(safe_kelly, 0.05)

def generate_tips(model: PredictionEngine, new_matches_df: pd.DataFrame):
    """Evaluates new matches and filters high confidence predictions for VIP/Gold tiers"""
    print("\n--- Generating Daily VIP & GOLD Tips ---")
    
    features = new_matches_df.drop(columns=['match_id', 'home_team', 'away_team'])
    probs = model.predict_proba(features)
    
    predictions = []
    
    for idx, row in new_matches_df.iterrows():
        match_probs = probs[idx]
        
        # Classes: 0: Draw, 1: Home, 2: Away. 
        # (Assuming model classes are ordered [0, 1, 2] based on training data)
        pred_class = np.argmax(match_probs)
        confidence = match_probs[pred_class]
        
        # Map class idx back to outcome and fetch odds
        # Index 0->Draw, 1->Home, 2->Away
        if model.rf_model.classes_[pred_class] == 1:
            outcome = "1"
            odds = row['home_odds']
        elif model.rf_model.classes_[pred_class] == 2:
            outcome = "2"
            odds = row['away_odds']
        else:
            outcome = "X"
            odds = (row['home_odds'] + row['away_odds']) / 2 # simplified draw odds
            
        # 1. Confidence Threshold Filtering
        if confidence < 0.70:
            continue # Auto-reject predictions below 70%
            
        # 2. Assign Tier
        tier = "VIP" # VIP Tips: 70-85%
        if confidence >= 0.85:
            tier = "GOLD" # Gold Tips: 85%+
            
        # 3. Stake Sizing Calculator
        stake_pct = calculate_kelly_criterion(confidence, odds)
        
        if stake_pct > 0:
            predictions.append({
                "match": f"{row['home_team']} vs {row['away_team']}",
                "prediction": outcome,
                "confidence": round(confidence * 100, 2),
                "odds": round(odds, 2),
                "recommended_stake": f"{round(stake_pct * 100, 2)}%",
                "tier": tier
            })

    # Sort by highest confidence first
    predictions.sort(key=lambda x: x['confidence'], reverse=True)
    
    # Output Results
    for p in predictions:
        print(f"[{p['tier']}] {p['match']} | Tip: {p['prediction']} | Conf: {p['confidence']}% | Odds: {p['odds']} | Stake: {p['recommended_stake']}")

# ==========================================
# Main Execution
# ==========================================
if __name__ == "__main__":
    print("--- Starting ML Model Training Pipeline ---")
    
    # 1. Load Data
    df = load_historical_data()
    X = df.drop(columns=['result'])
    y = df['result']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # 2. Train Model
    engine = PredictionEngine()
    engine.train(X_train, y_train)
    
    # 3. Evaluate
    ensemble_preds = np.argmax(engine.predict_proba(X_test), axis=1)
    # Map raw argmax indices back to actual class labels
    class_labels = engine.rf_model.classes_
    final_preds = class_labels[ensemble_preds]
    
    print("\nModel Accuracy Report:")
    print(classification_report(y_test, final_preds))
    
    # 4. Save Model
    # joblib.dump(engine, 'models/prediction_ensemble_v1.pkl')
    
    # 5. Generate Sample Today's Tips
    print("\nFetching today's matches from database...")
    today_matches = pd.DataFrame({
        'match_id': [991, 992, 993],
        'home_team': ['Arsenal', 'Real Madrid', 'Bayern Munich'],
        'away_team': ['Crystal Palace', 'Mallorca', 'Bochum'],
        'home_elo': [1850, 1900, 1950],
        'away_elo': [1600, 1550, 1500],
        'home_xg_rolling_5': [2.2, 2.5, 3.0],
        'away_xg_rolling_5': [1.1, 0.8, 0.5],
        'home_momentum_idx': [85, 90, 95],
        'away_momentum_idx': [45, 40, 30],
        'rest_days_home': [5, 4, 6],
        'rest_days_away': [5, 7, 5],
        'home_odds': [1.25, 1.15, 1.10],
        'away_odds': [9.50, 12.0, 15.0]
    })
    generate_tips(engine, today_matches)

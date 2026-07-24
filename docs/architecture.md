# System Architecture: Automated Football Prediction Portal

The system is designed for high availability, scalable data ingestion, and rapid prediction delivery.

```mermaid
graph TD
    %% External Sources
    subgraph Data Sources
        FD[Football-data.org API]
        FS[Flashscore Scraper]
        ESPN[ESPN Scraper]
        Odds[Odds APIs]
    end

    %% Ingestion Layer
    subgraph Ingestion & Processing
        Cron[Cron / EventBridge]
        ScraperPool[Python Scraper Workers - Scrapy/BS4]
        Proxy[Proxy Rotation Pool]
        
        Cron -->|Trigger| ScraperPool
        ScraperPool <-->|Requests| Proxy
        Proxy --> FD & FS & ESPN & Odds
    end

    %% Data Layer
    subgraph Data Storage
        PG[(PostgreSQL - Primary DB)]
        Redis[(Redis - Caching Layer)]
        ScraperPool -->|Raw Data| PG
    end

    %% Machine Learning Layer
    subgraph ML Engine
        ML_Worker[ML Prediction Worker]
        ModelRegistry[(Model Weights & Ensembles)]
        
        Cron -->|Trigger Post-Scraping| ML_Worker
        ML_Worker <-->|Reads Data| PG
        ML_Worker <-->|Loads| ModelRegistry
        ML_Worker -->|Saves Predictions| PG
        ML_Worker -->|Invalidates| Redis
    end

    %% Application Layer
    subgraph Backend API
        DjangoAPI[Django / Flask REST API]
        DjangoAPI <-->|Reads| PG
        DjangoAPI <-->|Caches| Redis
    end

    %% Presentation Layer
    subgraph Frontend Applications
        React[React.js Web Portal]
        Admin[React Admin Dashboard]
        Telegram[Telegram/WhatsApp Bots]
        
        React <-->|REST/GraphQL| DjangoAPI
        Admin <-->|REST| DjangoAPI
        Telegram <-->|Webhooks| DjangoAPI
    end
    
    %% Users
    Public[Public Users] --> React
    VIP[VIP/Gold Members] --> React
```

## Component Details
1. **Data Sources**: Web scrapers and APIs to fetch team form, historical data, odds, injuries, and weather.
2. **Ingestion & Processing**: Python scrapers operating with proxy rotation to avoid rate limits, orchestrated by a cron or message queue (Celery).
3. **Data Storage**: PostgreSQL handles complex queries for historical data and predictions. Redis provides sub-millisecond response times for frontend leaderboards and daily tips.
4. **ML Engine**: A separate worker process that loads pre-trained SciKit-Learn/XGBoost/LSTM models, ingests newly scraped data, runs inferences, filters high-confidence predictions (>70%), and computes Kelly Criterion stake sizing.
5. **Backend API**: Python (Django or Flask) backend serving RESTful endpoints for the UI, including authentication, payment webhooks, and prediction delivery.
6. **Frontend**: React application styled with Tailwind CSS containing both the public marketing pages, VIP dashboard, and Admin portal.

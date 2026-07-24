import os
import sys
import json
import uuid
from datetime import datetime

def resolve_volume_root():
    explicit_root = os.environ.get("MODEL_VOLUME_ROOT")
    if explicit_root:
        return explicit_root
    elif os.path.exists("/runpod-volume"):
        return "/runpod-volume/iyke-content-studio"
    elif os.path.exists("/workspace"):
        return "/workspace/iyke-content-studio"
    else:
        # Local mock
        return os.path.abspath("./mock-workspace/iyke-content-studio")

def init_volume():
    root = resolve_volume_root()
    print(f"Initializing Network Volume at: {root}")
    
    # Check if writable
    try:
        os.makedirs(root, exist_ok=True)
    except Exception as e:
        print(f"Error: Volume is not writable: {e}")
        sys.exit(1)
        
    directories = ["models", "registry", "workflows", "logs", "temporary"]
    for d in directories:
        os.makedirs(os.path.join(root, d), exist_ok=True)
        print(f"Created: {os.path.join(root, d)}")
        
    marker_path = os.path.join(root, ".network-volume-configured")
    marker_data = {
        "app_name": "Iyke Content Studio",
        "volume_id": os.environ.get("RUNPOD_NETWORK_VOLUME_ID", "unknown"),
        "datacenter_id": os.environ.get("RUNPOD_DATACENTER_ID", "unknown"),
        "setup_date": datetime.now().isoformat(),
        "schema_version": "1.0"
    }
    
    with open(marker_path, "w") as f:
        json.dump(marker_data, f, indent=2)
    print("Created metadata marker file (No secrets).")
    
    # Persistence test simulation
    test_file = os.path.join(root, "persistence_test.txt")
    with open(test_file, "w") as f:
        f.write("PERSISTENCE_VALID")
        
    if os.path.exists(test_file):
        print("Persistence Test 1: File written successfully.")
    
    print("Volume Initialization Complete.")

if __name__ == "__main__":
    init_volume()

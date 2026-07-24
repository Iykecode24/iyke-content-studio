import runpod
import os
import time

def handler(event):
    job_input = event.get('input', {})
    print(f"Starting render for project: {job_input.get('project_id')}")
    
    # Simulate render
    time.sleep(10)
    
    return {"status": "success", "video_url": "https://storage.example.com/output.mp4"}

if __name__ == "__main__":
    runpod.serverless.start({"handler": handler})

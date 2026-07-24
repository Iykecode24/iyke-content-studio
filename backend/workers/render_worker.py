import os
import time
from celery import Celery
from services.elevenlabs_service import ElevenlabsService
from services.runpod_service import RunpodService
from services.storage_service import StorageService
from database import SessionLocal
from models.domain import RenderJob, Project

celery_app = Celery(
    "render_worker",
    broker=os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379/0"),
    backend=os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")
)

elevenlabs_svc = ElevenlabsService()
runpod_svc = RunpodService()
storage_svc = StorageService()

@celery_app.task
def process_render_pipeline(project_id: str, job_id: str):
    db = SessionLocal()
    try:
        print(f"Starting render pipeline for project {project_id}, job {job_id}")
        
        # 1. Update job status to 'generating_audio'
        job = db.query(RenderJob).filter(RenderJob.id == job_id).first()
        if job:
            job.status = "generating_audio"
            job.progress = 10
            db.commit()
            
        # 2. Mock generate audio step
        print("Generating audio via ElevenLabs...")
        audio_url = elevenlabs_svc.generate_audio("Test audio generation")
        
        if job:
            job.status = "rendering_video"
            job.progress = 40
            db.commit()
            
        # 3. Dispatch to RunPod
        print("Dispatching job to RunPod...")
        runpod_job_id = runpod_svc.dispatch_render_job(project_id, {"audio": audio_url})
        
        # 4. Polling loop
        while True:
            status = runpod_svc.check_job_status(runpod_job_id)
            if status == "COMPLETED":
                break
            elif status == "FAILED":
                raise Exception("RunPod job failed")
            time.sleep(2)
            
        if job:
            job.status = "completed"
            job.progress = 100
            db.commit()
            
        # Also update project status
        project = db.query(Project).filter(Project.id == project_id).first()
        if project:
            project.status = "completed"
            project.progress = 100
            db.commit()
            
        print(f"Render pipeline completed for {project_id}")
        return {"status": "success", "project_id": project_id, "video_url": "https://mock-storage.local/video.mp4"}
        
    except Exception as e:
        print(f"Render pipeline failed: {str(e)}")
        if job:
            job.status = "failed"
            db.commit()
        return {"status": "error", "message": str(e)}
    finally:
        db.close()

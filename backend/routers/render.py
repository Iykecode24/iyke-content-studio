from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from models.domain import RenderJob, Project
from workers.render_worker import process_render_pipeline

router = APIRouter()

@router.post("/start/{project_id}")
def start_render(project_id: str, db: Session = Depends(get_db)):
    proj = db.query(Project).filter(Project.id == project_id).first()
    if not proj:
        raise HTTPException(status_code=404, detail="Project not found")
        
    job = RenderJob(project_id=proj.id)
    db.add(job)
    
    proj.status = "queued"
    
    db.commit()
    db.refresh(job)
    
    # Dispatch Celery task
    process_render_pipeline.delay(str(proj.id), str(job.id))
    
    return {"message": "Render started", "job_id": job.id}

@router.get("/status/{job_id}")
def get_render_status(job_id: str, db: Session = Depends(get_db)):
    job = db.query(RenderJob).filter(RenderJob.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job

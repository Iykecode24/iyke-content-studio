from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.domain import Project
from pydantic import BaseModel

router = APIRouter()

class ProjectCreate(BaseModel):
    title: str
    type: str

@router.post("/")
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    db_proj = Project(title=project.title, type=project.type)
    db.add(db_proj)
    db.commit()
    db.refresh(db_proj)
    return db_proj

@router.get("/{project_id}")
def get_project(project_id: str, db: Session = Depends(get_db)):
    return db.query(Project).filter(Project.id == project_id).first()

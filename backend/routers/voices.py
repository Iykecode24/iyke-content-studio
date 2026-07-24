from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid

from database import get_db
from models.domain import Voice, Character
from services.elevenlabs_service import ElevenlabsService

router = APIRouter(prefix="/api/voices", tags=["voices"])
elevenlabs_svc = ElevenlabsService()

@router.get("/")
def get_voices(db: Session = Depends(get_db)):
    voices = db.query(Voice).all()
    return voices

@router.post("/")
async def create_voice(
    name: str = Form(...),
    description: Optional[str] = Form(None),
    files: List[UploadFile] = File(...),
    db: Session = Depends(get_db)
):
    try:
        # Validate formats
        allowed_types = ["audio/wav", "audio/mpeg", "audio/flac", "audio/mp4", "audio/x-m4a"]
        for f in files:
            if f.content_type not in allowed_types:
                raise HTTPException(status_code=400, detail=f"Unsupported format: {f.content_type}")
                
        voice_id = await elevenlabs_svc.add_voice(name, description or "", files)
        
        new_voice = Voice(
            name=name,
            elevenlabs_voice_id=voice_id,
            description=description,
            status="active"
        )
        db.add(new_voice)
        db.commit()
        db.refresh(new_voice)
        return new_voice
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{voice_id}")
async def delete_voice(voice_id: str, db: Session = Depends(get_db)):
    voice = db.query(Voice).filter(Voice.id == voice_id).first()
    if not voice:
        raise HTTPException(status_code=404, detail="Voice not found")
        
    # Unlink characters
    characters = db.query(Character).filter(Character.voice_id == voice.id).all()
    for char in characters:
        char.voice_id = None
        
    success = await elevenlabs_svc.delete_voice(voice.elevenlabs_voice_id)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to delete from ElevenLabs")
        
    db.delete(voice)
    db.commit()
    return {"status": "deleted"}

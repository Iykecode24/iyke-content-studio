from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.llm_service import LlmService

router = APIRouter()
llm_service = LlmService()

class ScriptRequest(BaseModel):
    topic: str
    style: str
    duration: int = 30

@router.post("/generate")
def generate_script(req: ScriptRequest):
    if not llm_service.check_health():
        raise HTTPException(status_code=500, detail="LLM service unavailable")
    
    script = llm_service.generate_script(req.topic, req.style, req.duration)
    if isinstance(script, dict) and "error" in script:
        raise HTTPException(status_code=500, detail=script["error"])
        
    return {"script": script}

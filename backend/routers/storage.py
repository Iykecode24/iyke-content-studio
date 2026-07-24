from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_storage():
    return {"message": "Storage endpoint"}

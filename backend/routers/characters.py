from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_characters():
    return {"message": "Characters endpoint"}

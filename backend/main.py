from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import admin, auth, characters, projects, render, scripts, social, storage, voices

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Iyke Content Studio API",
    description="Backend API for AI Movie Production Platform",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(scripts.router, prefix="/api/scripts", tags=["Scripts"])
app.include_router(characters.router, prefix="/api/characters", tags=["Characters"])
app.include_router(voices.router, prefix="/api/voices", tags=["Voices"])
app.include_router(render.router, prefix="/api/render", tags=["Render"])
app.include_router(storage.router, prefix="/api/storage", tags=["Storage"])
app.include_router(social.router, prefix="/api/social", tags=["Social"])
app.include_router(admin.router, prefix="/api/admin", tags=["Admin"])
app.include_router(models.router, prefix="/api/models", tags=["Models"])

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "Iyke Content Studio API"}

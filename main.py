from fastapi import FastAPI
from sqlmodel import SQLModel
from dotenv import load_dotenv
from db.models import profile

# Load .env file
load_dotenv()
from routes.signup import router as signup_router

from db.database import engine

app=FastAPI()

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)
    print("Database Created Successfully")

@app.get('/')
def home():
    return {"message":"Hello world"}


app.include_router(
    signup_router,
    prefix="/auth",
    tags=["Authentication"]
)
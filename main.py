from fastapi import FastAPI
from sqlmodel import SQLModel
from dotenv import load_dotenv
from db.models import profile

# Load .env file
load_dotenv()
from routes.signup import router as signup_router
<<<<<<< HEAD
from routes.login import router as login_router
=======

>>>>>>> 98e33ae8035ae9016a027b48a16ca357531e98e4
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
<<<<<<< HEAD
)
app.include_router(
    login_router,
    prefix="/auth",
    tags=["Authentication"]
=======
>>>>>>> 98e33ae8035ae9016a027b48a16ca357531e98e4
)
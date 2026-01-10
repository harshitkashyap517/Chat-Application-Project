from fastapi import APIRouter
from core.security import hash_password
from schemas.user import UserCreate
from db.models import profile
from db.database import engine
router=APIRouter()

@router.post('/signup')
def signup(data:UserCreate):
    hashed_password=hash_password(data.password)
    new_users=profile(
        username=data.username,
        email=data.email,
        password=hash_password,
    )
    with Session(engine) as session:
        session.add(new_users)
        session.commit()
    
    return {"message": "User created successfully"}
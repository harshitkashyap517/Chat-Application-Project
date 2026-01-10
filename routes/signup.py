from fastapi import APIRouter,HTTPException
from sqlmodel import Session,select
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
        password=hashed_password,
    )
    with Session(engine) as session:
        statement=select(profile).where(profile.username == data.username)
        db_user=session.exec(statement).first()
        if db_user:
            raise HTTPException(status_code=404,detail="User Already Exists")

        session.add(new_users)
        session.commit()
    
    return {"message": "User created successfully"}
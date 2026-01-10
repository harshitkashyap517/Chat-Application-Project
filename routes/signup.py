<<<<<<< HEAD
from fastapi import APIRouter,HTTPException
from sqlmodel import Session,select
=======
from fastapi import APIRouter
>>>>>>> 98e33ae8035ae9016a027b48a16ca357531e98e4
from core.security import hash_password
from schemas.user import UserCreate
from db.models import profile
from db.database import engine
router=APIRouter()

@router.post('/signup')
def signup(data:UserCreate):
<<<<<<< HEAD

=======
>>>>>>> 98e33ae8035ae9016a027b48a16ca357531e98e4
    hashed_password=hash_password(data.password)
    new_users=profile(
        username=data.username,
        email=data.email,
<<<<<<< HEAD
        password=hashed_password,
    )
    with Session(engine) as session:
        statement=select(profile).where(profile.username == data.username)
        db_user=session.exec(statement).first()
        if db_user:
            raise HTTPException(status_code=404,detail="User Already Exists")

=======
        password=hash_password,
    )
    with Session(engine) as session:
>>>>>>> 98e33ae8035ae9016a027b48a16ca357531e98e4
        session.add(new_users)
        session.commit()
    
    return {"message": "User created successfully"}
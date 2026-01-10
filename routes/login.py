from fastapi import APIRouter,HTTPException
import bcrypt
from sqlmodel import Session,select
from schemas.user import user
from db.models import profile
from db.database import engine

router=APIRouter()

@router.post('/login')
def login(data:user):
    with Session(engine) as session:
        statement=select(profile).where(profile.username == data.username)
        db_user=session.exec(statement).first()
        if not db_user:
            raise HTTPException(status_code=404,detail="user not found")
        if db_user.email != data.email:
            raise HTTPException(status_code=404,detail="Wrong Credentials")
        if not bcrypt.checkpw(data.password.encode('utf-8'),db_user.password.encode('utf-8')):
            raise HTTPException(status_code=404,detail="Wrong Credentials")
        return {"msg":"User LOGGED IN Sucessfully"}    
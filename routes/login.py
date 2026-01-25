from fastapi import APIRouter,HTTPException,Header,Depends
import bcrypt
from sqlmodel import Session,select
from schemas.user import user
from db.models import profile
from db.database import engine
from core.jwt import create_access_token
from core.jwt import decode_access_token
from core.security import verify_password
router=APIRouter()

@router.post('/login')
def login(data:user|None=None):
    
    try:
        if Authorization:
            return {
            "msg": "User already logged in",
            "user": token,
            "Token": token
            }
    except Exception:
        pass  # invalid / expired token → normal login



    if not data:
        raise HTTPException(400, "Username & password required")
    
    with Session(engine) as session:

        statement=select(profile).where(profile.username == data.username)
        db_user=session.exec(statement).first()
        if not db_user:
            raise HTTPException(status_code=404,detail="user not found")
        if db_user.email != data.email:
            raise HTTPException(status_code=404,detail="Wrong Credentials")
        if not verify_password(data.password, db_user.password):
            raise HTTPException(status_code=404,detail="Wrong Credentials")
        token=create_access_token({'username':db_user.username,'email':db_user.email})
        return {"msg":"User LOGGED IN Sucessfully","Token":token}    
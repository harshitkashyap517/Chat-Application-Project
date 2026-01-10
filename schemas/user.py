from pydantic import BaseModel,EmailStr

class UserCreate(BaseModel):
    username:str
    email:EmailStr
    password:str

class user(BaseModel):
    username:str
    email:EmailStr
    password:str
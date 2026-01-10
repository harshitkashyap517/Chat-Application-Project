from pydantic import BaseModel,EmailStr

class UserCreate(BaseModel):
    username:str
    email:EmailStr
<<<<<<< HEAD
    password:str

class user(BaseModel):
    username:str
    email:EmailStr
=======
>>>>>>> 98e33ae8035ae9016a027b48a16ca357531e98e4
    password:str
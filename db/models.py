from sqlmodel import SQLModel,Field
class profile(SQLModel, table=True):
    username: str=Field(default=None,primary_key=True)
    email:str
    password:str=Field(min_length=6)


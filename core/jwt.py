from datetime import datetime, timedelta
from jose import jwt, JWTError
import os
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends


# Load from .env
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES'))

print(ALGORITHM)
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    """
    Create JWT token
    """
    to_encode = data.copy()

    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )
    return encoded_jwt

oauth_scheme= OAuth2PasswordBearer(tokenUrl='token')
def decode_access_token(token=Depends(oauth_scheme)):
    """
    Verify & decode JWT token
    """
    
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload
    except JWTError:
        return None


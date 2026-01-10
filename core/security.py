<<<<<<< HEAD
import bcrypt

def hash_password(password: str) -> str:
    # Truncate to 72 bytes safely
    salt=bcrypt.gensalt()
    hashed_password=bcrypt.hashpw(password.encode('utf-8'),salt)
    return hashed_password.decode('utf-8')
=======
from passlib.context import CryptContext

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

def hash_password(password: str) -> str:
    # Truncate to 72 bytes safely
    max_bytes = 72
    encoded = password.encode('utf-8')
    if len(encoded) > max_bytes:
        encoded = encoded[:max_bytes]
        # decode back safely, ignoring incomplete characters
        password = encoded.decode('utf-8', errors='ignore')
    return pwd_context.hash(password)
>>>>>>> 98e33ae8035ae9016a027b48a16ca357531e98e4

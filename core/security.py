import bcrypt

def hash_password(password: str) -> str:
    # Truncate to 72 bytes safely
    salt=bcrypt.gensalt()
    hashed_password=bcrypt.hashpw(password.encode('utf-8'),bcrypt.gensalt(rounds=12))
    return hashed_password

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode(), hashed_password)
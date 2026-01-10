from sqlmodel import SQLModel, create_engine
from pathlib import Path
import os

DATABASE_URL =os.getenv('DATABASE_URL')

print("FINAL DATABASE URL =", DATABASE_URL)  # DEBUG LINE

engine = create_engine(
    DATABASE_URL,
    echo=True,
    connect_args={"check_same_thread": False}
)

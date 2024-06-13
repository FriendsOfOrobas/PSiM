from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str


class UserReturn(UserBase):
    uuid: int
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None
    scopes: list[str] = []

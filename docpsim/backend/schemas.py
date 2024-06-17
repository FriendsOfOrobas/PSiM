from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str


class UserReturn(UserBase):
    id: int
    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
    scopes: list[str] = []


class AchievementReturn(BaseModel):
    id: int
    name: str
    description: str
    bonus: int
    treshold: int
    checkpoint_id: int


class CheckpointReturn(BaseModel):
    id: int
    name: str
    description: str
    previous: int | None


class CheckpointReturnAdmin(BaseModel):
    id: int
    name: str
    description: str
    previous: int | None
    qr_code_path: str


class GameReturn(BaseModel):
    id: int
    name: str
    description: str
    max_team_size: int
    admin: UserReturn
    checkpoints: list[CheckpointReturn]
    achievements: list[AchievementReturn]


class GameReturnStrip(BaseModel):
    id: int
    name: str
    description: str
    max_team_size: int

class GameCreate(BaseModel):
    name: str
    description: str
    max_team_size: int
    game_admmin_id: int


class Comments(BaseModel):
    comment: str
    user_id: int
    checkpoint_id: int
    created_at: datetime


class TeamReturn(BaseModel):
    id: int
    game_id: int
    name: str
    points: int
    game_times: list[datetime]
    members: list[int]


class AchievementCreate:
    description: str
    bonus: int
    treshold: int
    checkpoint_id: int


class CheckpointCreate:
    name: str
    description: str
    previous: int | None
    qr_code_path: str | None


class UnlockedCreate(BaseModel):
    id: int
    checkpoint_id: int
    team_id: int
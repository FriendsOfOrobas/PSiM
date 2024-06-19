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
    description: str
    bonus: int
    treshold: int | None = None
    checkpoint_id: int | None = None


class CheckpointReturn(BaseModel):
    id: int
    name: str
    description: str
    previous: int | None = None


class CheckpointReturnAdmin(BaseModel):
    id: int
    name: str
    description: str
    previous: int | None = None
    qr_code_path: str


class GameReturn(BaseModel):
    id: int
    name: str
    description: str
    max_team_size: int
    admin: UserReturn
    checkpoints_locked: list[CheckpointReturn]
    checkpoints_unlocked: list[CheckpointReturn]
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
    game_admin_id: int

class CommentsCreate(BaseModel):
    comment: str
    user_id: int

class Comments(BaseModel):
    comment: str
    author: str
    time: datetime


class TeamReturn(BaseModel):
    id: int
    game_id: int
    name: str
    points: int
    game_times: list[datetime]
    members: list[int]


class AchievementCreate(BaseModel):
    description: str
    bonus: int
    treshold: int | None = None
    checkpoint_id: int | None = None


class CheckpointCreate(BaseModel):
    name: str
    description: str
    previous: int | None = None
    qr_code_path: str | None = None


class UnlockedCreate(BaseModel):
    id: int
    checkpoint_id: int
    team_id: int

class TeamCreate(BaseModel):
    name:str
    players: list[str]
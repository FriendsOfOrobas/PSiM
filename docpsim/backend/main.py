from __future__ import annotations

from datetime import datetime, timedelta
import random
import time
from typing import List

from sqlalchemy.orm import Session
from fastapi import Depends, FastAPI, HTTPException, status, Security
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm, SecurityScopes
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import parse_obj_as, ValidationError
from fastapi.middleware.cors import CORSMiddleware


import models, schemas, CRUD
from database import SessionLocal, engine

from config import ALGORITHM, SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES, ORIGINS

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login",scopes={"user": "Zwykly user"})

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    # TODO add hashing with explicit salt
    salt = str(random.randint(1000000000, 9999999999))
    pwd_context.using(salt=salt)
    return pwd_context.hash(password), salt


def get_user(db: Session, username: str):
    user = CRUD.get_user(db, username)
    return user


# funkcja odpowiadajaca za tworzenie tokenow JWT
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


# funkcja odpowiadajaca za logowanie uzytkownika
def authenticate_user(db: Session, username: str, password: str):
    user = CRUD.get_user(db, username)
    if not user:
        return False
    pwd_context.using(salt=user.salt)
    if not verify_password(pwd_context.hash(password), user.password):
        return False
    return user


# funkcja odpowiadajaca za autoryzacje
def get_current_user(security_scopes: SecurityScopes, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    if security_scopes.scopes:
        authenticate_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticate_value = "Bearer"
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": authenticate_value},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_scopes = payload.get("scopes", [])
        token_data = schemas.TokenData(scopes=token_scopes, username=username)
    except (JWTError, ValidationError):
        raise credentials_exception
    user = get_user(db, username=token_data.username)
    if user is None:
        raise credentials_exception
    for scope in security_scopes.scopes:
        if scope not in token_data.scopes:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not enough permissions",
                headers={"WWW-Authenticate": authenticate_value},
            )
    return user


# Endpoint rejestrujacy nowych uzytkownikow
@app.post("/register/", status_code=201)
def register(user: schemas.UserCreate, session: Session = Depends(get_db)):
    existing_user = session.query(models.Users).filter_by(username=user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    user.password, salt = get_password_hash(user.password)

    CRUD.create_user(session, user, salt)

    return {"message":"user created successfully"}


"""
    Endpoint sluzacy do logowania. Zwraca token JWT.
    Aby uzytkownik otrzymal stopien uprawnien "user", w bazie danych musi mu byc przypisana rola o nazwie "user".
    Aby uzytkownik otrzymal stopien uprawnien "arbiter", w bazie danych musi mu byc przypisana rola o nazwie "arbiter".
"""
@app.post("/login/")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db:Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    scopes = ["user"]
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username, "scopes": scopes}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/users/me/", response_model=schemas.UserReturn)
async def read_users_me(current_user: schemas.UserReturn = Depends(get_current_user)):
    return current_user


@app.get("/users/{id}", response_model=schemas.UserReturn)
async def read_user(id: int, db: Session = Depends(get_db)):
    db_user = CRUD.get_user_by_id(db, id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.delete("/users/{id}", status_code=200)
async def delete_user(id: int, db: Session = Depends(get_db), current_user: schemas.UserReturn = Security(get_current_user, scopes=["user"])):
    db_user = CRUD.get_user_by_id(db, id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    try:
        db.commit()
    except:
        db.rollback()
        raise HTTPException(status_code=400, detail="Could not delete user")
    return {"message": "user deleted successfully"}


@app.get("/games/{id}", response_model=schemas.GameReturn)
async def read_game(id: int, db: Session = Depends(get_db), current_user: schemas.UserReturn = Security(get_current_user, scopes=["user"])):
    db_game = CRUD.get_game_by_id(db, id)
    if db_game is None:
        raise HTTPException(status_code=404, detail="Game not found")
    return db_game


@app.post("/games/", status_code=201)
async def create_game(game: schemas.GameCreate,
                      checkpoints: List[schemas.CheckpointCreate],
                      achievements: List[schemas.AchievementCreate],
                      db: Session = Depends(get_db), current_user: schemas.UserReturn = Security(get_current_user, scopes=["user"])):
    try:
        CRUD.create_game(db, game, checkpoints, achievements)
    except:
        raise HTTPException(status_code=400, detail="Game with this name already exists")
    return {"message": "game created successfully"}


@app.get("/games/{game_id}/team/{team_id}", response_model=schemas.GameReturn)
async def read_game_team(game_id: int, team_id: int, db: Session = Depends(get_db), current_user: schemas.UserReturn = Security(get_current_user, scopes=["user"])):
    db_game = CRUD.get_game_filered_by_team_id(db, game_id, team_id)
    if db_game is None:
        raise HTTPException(status_code=404, detail="Game not found")
    return db_game


@app.put("/games/", status_code=201)
async def update_game(game: schemas.GameCreate, db: Session = Depends(get_db), current_user: schemas.UserReturn = Security(get_current_user, scopes=["user"])):
    try:
        CRUD.update_game(db, game)
    except:
        raise HTTPException(status_code=400, detail="Game with this name already exists")
    return {"message": "game updated successfully"}


@app.get("/checkpoint/{checkpoint_id}/comments", response_model=schemas.Comments)
async def read_comments(checkpoint_id: int, db: Session = Depends(get_db), current_user: schemas.UserReturn = Security(get_current_user, scopes=["user"])):
    db_comments = db.query(models.Comments).filter(models.Comments.checkpoint_id == checkpoint_id).all()
    return db_comments


@app.post("/checkpoint/{checkpoint_id}/comments", status_code=201)
async def create_comment(checkpoint_id: int, comment: schemas.Comments, db: Session = Depends(get_db), current_user: schemas.UserReturn = Security(get_current_user, scopes=["user"])):
    db_comment = models.Comments(comment=comment.comment, user_id=comment.user_id,
                                 checkpoint_id=checkpoint_id, created_at=datetime.now())
    db.add(db_comment)
    db.commit()
    return {"message": "comment created successfully"}


@app.post("/checkpoint/{checkpoint_id}/team/{team_id}/unlock", response_model=schemas.UnlockedCreate, status_code=201)
async def unlock_checkpoint(checkpoint_id: int, team_id: int, db: Session = Depends(get_db), current_user: schemas.UserReturn = Security(get_current_user, scopes=["user"])):
    checkpoint = db.query(models.Checkpoints.previous).filter(models.Checkpoints.id == checkpoint_id).first()
    if checkpoint is None or db.query(models.Unlocked).filter(models.Unlocked.checkpoint_id == checkpoint).filter(models.Unlocked.team_id == team_id).first() is not None:
        db_unlocked = models.Unlocked(checkpoint_id=checkpoint_id, team_id=team_id)
        try:
            db.add(db_unlocked)
        except:
            db.rollback()
            raise HTTPException(status_code=400, detail="Checkpoint already unlocked")
        db.commit()
        return {"message": "checkpoint unlocked successfully"}
    else:
        raise HTTPException(status_code=400, detail="Previous checkpoint not unlocked")

@app.get("/teams/{game_id}", response_model=schemas.TeamReturn)
async def read_teams(game_id: int, db: Session = Depends(get_db), current_user: schemas.UserReturn = Security(get_current_user, scopes=["user"])):
    db_teams = db.query(models.Teams).filter(models.Teams.game_id == game_id).all()
    return db_teams


@app.get("/teams/team/{team_id}", response_model=schemas.TeamReturn)
async def read_team(team_id: int, db: Session = Depends(get_db), current_user: schemas.UserReturn = Security(get_current_user, scopes=["user"])):
    db_team = db.query(models.Teams).filter(models.Teams.id == team_id).first()
    db_team.members = db.query(models.TeamMembers).filter(models.TeamMembers.team_id == team_id).all()
    return db_team


@app.post("/teams/{game_id}", status_code=201)
async def create_team(game_id: int, name: str, members: list[int], db: Session = Depends(get_db), current_user: schemas.UserReturn = Security(get_current_user, scopes=["user"])):
    db_team = models.Teams(game_id=game_id, name=name, points=0, game_times=[])
    CRUD.create_team(db, db_team, members)
    return {"message": "team created successfully"}


@app.get("/games/users/{user_id}/admin", response_model=List[schemas.GameReturnStrip])
async def read_games_admin(user_id: int, db: Session = Depends(get_db), current_user: schemas.UserReturn = Security(get_current_user, scopes=["user"])):
    db_games = db.query(models.Games).filter(models.Games.game_admmin_id == user_id).all()
    return db_games


@app.get("/games/users/{user_id}/player", response_model=List[schemas.GameReturnStrip])
async def read_games_player(user_id: int, db: Session = Depends(get_db), current_user: schemas.UserReturn = Security(get_current_user, scopes=["user"])):
    db_teams = db.query(models.TeamMembers).filter(models.TeamMembers.user_id == user_id).all()
    db_games = []
    for team in db_teams:
        db_game = db.query(models.Games).filter(models.Games.id == team.game_id).first()
        db_games.append(db_game)
    return db_games


@app.get("/checkpoints/{checkpoint_id}/player", response_model=schemas.CheckpointReturn)
async def read_checkpoint_player(checkpoint_id: int, db: Session = Depends(get_db), current_user: schemas.UserReturn = Security(get_current_user, scopes=["user"])):
    db_checkpoint = db.query(models.Checkpoints).filter(models.Checkpoints.id == checkpoint_id).first()
    return db_checkpoint


@app.get("/checkpoints/{checkpoint_id}/admin", response_model=schemas.CheckpointReturnAdmin)
async def read_checkpoint_admin(checkpoint_id: int, db: Session = Depends(get_db), current_user: schemas.UserReturn = Security(get_current_user, scopes=["user"])):
    db_checkpoint = db.query(models.Checkpoints).filter(models.Checkpoints.id == checkpoint_id).first()
    return db_checkpoint


@app.get(" /teams/{game_id}/{user_id}", response_model=schemas.TeamReturn)
async def read_team_id(game_id: int, user_id: int, db: Session = Depends(get_db), current_user: schemas.UserReturn = Security(get_current_user, scopes=["user"])):
    db_team = (db.query(models.Teams).filter(models.Teams.game_id == game_id)
               .filter(models.Teams.members.any(models.TeamMembers.user_id == user_id)).all())
    return db_team

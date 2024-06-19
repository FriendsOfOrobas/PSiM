from typing import List

from sqlalchemy.orm import Session
import models, schemas
import segno
from config import PROXY, QR_PATH


def get_user(db: Session, username: str):
    db_user = db.query(models.Users).filter(models.Users.username == username).first()
    return db_user


def get_user_by_id(db: Session, user_id: int):
    db_user = db.query(models.Users).filter(models.Users.id == user_id).first()
    return db_user


def create_user(db: Session, user: schemas.UserCreate, salt: str):
    db_user = models.Users(username=user.username, password=user.password, salt=salt)
    db.add(db_user)
    db.commit()


def get_game_by_id(db: Session, game_id: int):
    db_game = db.query(models.Games).filter(models.Games.id == game_id).first()
    db_game.checkpoints = db.query(models.Checkpoints).filter(models.Checkpoints.game_id == game_id).all()
    db_game.achievements = db.query(models.Achievements).filter(models.Achievements.game_id == game_id).all()
    return db_game


def create_game(db: Session, game: schemas.GameCreate, checkpoints: List[schemas.CheckpointCreate],
                achievements: List[schemas.AchievementCreate]):
    db_game = models.Games(name=game.name, description=game.description, max_team_size=game.max_team_size, game_admin_id=game.game_admin_id)
    db.add(db_game)
    db.flush()
    checkpoints_id = []
    for checkpoint in checkpoints:
        previous_id = checkpoints_id[checkpoint.previous] if checkpoint.previous != -1 else None
        db_checkpoint = models.Checkpoints(name=checkpoint.name, description=checkpoint.description, qr_code_path="mock", game_id=db_game.id, previous=previous_id)
        db.add(db_checkpoint)
        db.flush()
        new_id = db_checkpoint.id
        qr_string = f"{PROXY}/unlock/{db_game.id}/{db_checkpoint.id}"
        qr_code = segno.make_qr(qr_string)
        qr_path = f"{QR_PATH}qr_{new_id}.png"
        qr_code.save(qr_path,scale=10)
        db_checkpoint = db.query(models.Checkpoints).filter(models.Checkpoints.id == new_id)
        db_checkpoint.update({"qr_code_path":f"qr_{new_id}.png"})
        db.flush()
        checkpoints_id.append(new_id)

    for achievement in achievements:
        c_id = None
        if achievement.checkpoint_id:
            c_id = checkpoints_id[achievement.checkpoint_id]
        db_achievement = models.Achievements(description=achievement.description,unlocked=False, bonus=achievement.bonus, treshold=achievement.treshold, checkpoint_id=c_id, game_id=db_game.id)
        db.add(db_achievement)
    
    db.commit()
    return db_game.id


def get_game_filered_by_team_id(db: Session, game_id: int, user_id: int):
    team_id = -1
    db_teams = db.query(models.Teams).filter(models.Teams.game_id == game_id).all()
    for team in db_teams:
        db_members = db.query(models.TeamMembers).filter(models.TeamMembers.user_id == user_id, models.TeamMembers.team_id == team.id).first()
        if db_members:
            team_id = team.id
            break
    db_game = db.query(models.Games).filter(models.Games.id == game_id).first()
    db_game.achievements = db.query(models.Achievements).filter(models.Achievements.game_id == game_id).all()
    db_game.checkpoints_locked = db.query(models.Checkpoints).filter(models.Checkpoints.game_id == game_id).all()
    db_game.checkpoints_unlocked = []

    for checkpoint in db_game.checkpoints_locked:
        db_unlocked = db.query(models.Unlocked).filter(models.Unlocked.checkpoint_id == checkpoint.id, models.Unlocked.team_id == team_id).first()
        if db_unlocked:
            db_game.checkpoints_unlocked.append(checkpoint)
    
    for checkpoint in db_game.checkpoints_unlocked:
        db_game.checkpoints_locked.remove(checkpoint)
    return db_game


def update_game(db: Session, game: schemas.GameCreate):
    db_game = db.query(models.Games).filter(models.Games.name == game.name).first()
    db_game.description = game.description
    db_game.max_team_size = game.max_team_size
    db_game.game_admin_id = game.game_admin_id
    db.commit()
    return db_game


def create_team(db: Session, team: models.Teams, members: list[str]):
    try:
        db.add(team)
        db.flush()
    except:
        db.rollback()
        raise Exception("Team with this name already exists")
    try:
        for member in members:
            db_user = db.query(models.Users).filter(models.Users.username == member).first()
            db_team_member = models.TeamMembers(team_id=team.id, user_id=db_user.id)
            db.add(db_team_member)
        db.commit()
    except:
        db.rollback()
        raise Exception("Error while adding team members")
    return team

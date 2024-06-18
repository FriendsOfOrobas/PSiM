from typing import List

from sqlalchemy.orm import Session
import models, schemas


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
        checkpoints_id.append(db_checkpoint.id)

    for achievement in achievements:
        c_id = None
        if achievement.checkpoint_id:
            c_id = checkpoints_id[achievement.checkpoint_id]
        db_achievement = models.Achievements(description=achievement.description,unlocked=False, bonus=achievement.bonus, treshold=achievement.treshold, checkpoint_id=c_id, game_id=db_game.id)
        db.add(db_achievement)
    
    db.commit()
    return db_game.id


def get_game_filered_by_team_id(db: Session, game_id: int, team_id: int):
    db_game = db.query(models.Games) .filter(models.Games.id == game_id)\
            .filter(models.Games.teams.any(models.Teams.id == team_id))\
            .first()
    db_game.checkpoints = db.query(models.Checkpoints).filter(models.Checkpoints.game_id == game_id).all()
    db_game.achievements = db.query(models.Achievements).filter(models.Achievements.game_id == game_id).all()
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

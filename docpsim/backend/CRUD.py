from sqlalchemy.orm import Session
import models, schemas


def get_user(db: Session, username: str):
    db_user = db.query(models.Users).filter(models.Users.username == username).first()
    return db_user


def get_user_by_id(db: Session, user_id: int):
    db_user = db.query(models.Users).filter(models.Users.id == user_id).first()
    return db_user


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.Users(username=user.username, password=user.password, salt="mock_salt")
    db.add(db_user)
    db.commit()


def get_game_by_id(db: Session, game_id: int):
    db_game = db.query(models.Games).filter(models.Games.id == game_id).first()
    return db_game


def create_game(db: Session, game: schemas.GameCreate):
    db_game = models.Games(name=game.name, description=game.description, max_team_size=game.max_team_size, game_admmin_id=game.game_admmin_id)
    db.add(db_game)
    db.commit()


def get_game_filered_by_team_id(db: Session, game_id: int, team_id: int):
    db_game = db.query(models.Games) .filter(models.Games.id == game_id)\
            .filter(models.Games.teams.any(models.Teams.id == team_id))\
            .first()
    return db_game


def update_game(db: Session, game: schemas.GameCreate):
    db_game = db.query(models.Games).filter(models.Games.name == game.name).first()
    db_game.description = game.description
    db_game.max_team_size = game.max_team_size
    db_game.game_admmin_id = game.game_admmin_id
    db.commit()
    return db_game


def create_team(db: Session, team: models.Teams, members: list[int]):
    try:
        db.add(team)
        db.commit()
    except:
        db.rollback()
        raise Exception("Team with this name already exists")
    try:
        for member in members:
            db_team_member = models.TeamMembers(user_id=member, team_id=team.id)
            db.add(db_team_member)
        db.commit()
    except:
        db.rollback()
        raise Exception("Error while adding team members")
    return team

from sqlalchemy.orm import Session
import models,schemas


def get_user(db: Session, username:str):
    db_user = db.query(models.Users).filter(models.Users.username == username).first()
    return db_user


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.Users(username=user.username,password = user.password, salt = 0)
    db.add(db_user)
    db.commit()

from sqlalchemy import Column, TIMESTAMP, Time, Text, Integer, String, Date, Boolean, ForeignKey, UniqueConstraint, Sequence
from sqlalchemy.orm import relationship
from database import Base
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.mutable import MutableList

class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    password = Column(String(256), nullable=False)
    username = Column(String(64), nullable=False, unique=True)
    salt = Column(String(256), nullable=False)

    games = relationship("Games", back_populates="admin")

class Games(Base):
    __tablename__ = 'games'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(64), nullable=False, unique=True)
    description = Column(Text, nullable=False)
    max_team_size = Column(Integer, nullable=False)
    game_admmin_id = Column(ForeignKey("users.id"), nullable=False)

    admin = relationship("Users", back_populates="games")
    teams = relationship("Teams", back_populates="game")

class Teams(Base):
    __tablename__ = 'team'
    id = Column(Integer, primary_key=True, autoincrement=True)
    game_id = Column(ForeignKey("games.id"), nullable=False)
    name = Column(String(256), nullable=False)
    points = Column(Integer, nullable=False)
    game_times = Column(MutableList.as_mutable(ARRAY(Time, zero_indexes=True)))

    game = relationship("Games", back_populates="teams")


class TeamMembers(Base):
    __tablename__ = 'team_members'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(ForeignKey("users.id"), nullable=False)
    team_id = Column(ForeignKey("team.id"), nullable=False)


class Checkpoints(Base):
    __tablename__ = 'checkpoints'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(256), nullable=False)
    description = Column(Text, nullable=False)
    qr_code_path = Column(String(256), nullable=False)
    game_id = Column(ForeignKey("games.id"), nullable=False)
    previous = Column(ForeignKey("checkpoints.id"), nullable=True)


class Unlocked(Base):
    __tablename__ = 'unlocked'
    id = Column(Integer, primary_key=True, autoincrement=True)
    checkpoint_id = Column(ForeignKey("checkpoints.id"), nullable=False)
    team_id = Column(ForeignKey("team.id"), nullable=False)


class Comments(Base):
    __tablename__ = 'comments'
    id = Column(Integer, primary_key=True, autoincrement=True)
    comment = Column(Text, nullable=False)
    date_time = Column(TIMESTAMP, nullable=False)
    author_id = Column(ForeignKey("users.id"), nullable=False)
    checkpoint_id = Column(ForeignKey("checkpoints.id"), nullable=False)


class Achievements(Base):
    __tablename__ = 'achivements'
    id = Column(Integer, primary_key=True, autoincrement=True)
    description = Column(Text, nullable=False)
    unlocked = Column(Boolean, nullable=False)
    bonus = Column(Integer, nullable=False)
    treshold = Column(Integer, nullable=True)
    checkpoint_id = Column(ForeignKey("checkpoints.id"), nullable=True)
    game_id = Column(ForeignKey("games.id"), nullable=False)


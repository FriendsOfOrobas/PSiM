from sqlalchemy import Column, Integer, String, Date, Boolean, ForeignKey, UniqueConstraint, Sequence
from sqlalchemy.orm import relationship
from database import Base

class Users(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, autoincrement=True)
    password = Column(String(256), nullable=False)
    username = Column(String(64), nullable=False, unique=True)
    salt = Column(String(256), nullable=False)




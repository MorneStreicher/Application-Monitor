from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

Base = declarative_base()


class DBEntities:

    class Application(Base):
        __tablename__ = 'application'

        id = Column(Integer, primary_key=True)
        domain = Column(String)
        name = Column(String)
        entity = Column(String)

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from contextlib import contextmanager

engine = create_engine(
    "mysql+pymysql://root:JoeSat01@MySqlDbServer/appmon",
    isolation_level="READ UNCOMMITTED"
)

Session = sessionmaker(bind=engine)

class DBSession(object):
    @staticmethod
    @contextmanager
    def session_scope():
        session = Session()
        try:
            yield session
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()
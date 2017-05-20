from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, DateTime, Integer

Base = declarative_base()


class DBEntities:

    class Application(Base):
        __tablename__ = 'application'

        gid = Column(String, primary_key=True)
        app_domain = Column(String)
        name = Column(String)
        entity = Column(String)
        last_heartbeat = Column(DateTime)
        app_type = Column(String)
        current_activity = Column(String)

    class AuditLogEntry(Base):
        __tablename__ = 'audit_log_entry'

        id = Column(Integer, primary_key=True)
        app_gid = Column(String, primary_key=True)
        datetime_logged = Column(DateTime)
        level = Column(Integer)
        log_description = Column(String)

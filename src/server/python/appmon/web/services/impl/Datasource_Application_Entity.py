from appmon.db.DBEntities import DBEntities
from appmon.db.DBSession import DBSession
from appmon.web.services.ServiceBase import DatasourceService, DatasourceQueryResult


class Record(object):
    def __init__(self):
        self.id = None
        self.app_domain = None
        self.name = None
        self.entity = None
        self.last_heartbeat = None
        self.app_type = None
        self.current_activity = None

    def fromEntity(self, entity):
        self.id = entity.gid
        self.app_domain = entity.app_domain
        self.name = entity.name
        self.entity = entity.entity
        self.last_heartbeat = entity.last_heartbeat
        self.app_type = entity.app_type
        self.current_activity = entity.current_activity
        return self.__dict__


class Service(DatasourceService):
    def __init__(self):
        DatasourceService.__init__(self)

    def query(self, dict_filter, order_by, start_index, count):
        records = []
        with DBSession.session_scope() as session:
            list = session.query(DBEntities.Application).all()
            for cur in list:
                records.append(Record().fromEntity(cur))
        result = DatasourceQueryResult(records=records)
        return result

    def update(self, record):
        raise Exception("Not implemented")

    def delete(self, id):
        raise Exception("Not implemented")

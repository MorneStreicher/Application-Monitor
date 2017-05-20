from appmon.db.DBEntities import DBEntities
from appmon.db.DBSession import DBSession
from appmon.web.services.ServiceBase import DatasourceService, DatasourceQueryResult

_levels = {
    1: "Info",
    2: "Warning",
    3: "Error",
    4: "Critical",
}

class Record(object):
    def __init__(self):
        self.id = None
        self.app_gid = None
        self.datetime_logged = None
        self.level = None
        self.level_description = None
        self.log_description = None

    def fromEntity(self, entity):
        self.id = entity.id
        self.app_gid = entity.app_gid
        self.datetime_logged = entity.datetime_logged
        self.level = entity.level
        self.level_description = _levels[entity.level]

        self.log_description = entity.log_description
        return self.__dict__


class Service(DatasourceService):
    def __init__(self):
        DatasourceService.__init__(self)

    def query(self, dict_filter, order_by, start_index, count):
        start_index = start_index or 0
        records = []
        with DBSession.session_scope() as session:
            list = session.query(DBEntities.AuditLogEntry).all()
            for cur in list:
                records.append(Record().fromEntity(cur))
        result = DatasourceQueryResult(records=records, has_more_records=False)
        return result

    def update(self, record):
        raise Exception("Not implemented")

    def delete(self, id):
        raise Exception("Not implemented")

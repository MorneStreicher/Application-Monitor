
class ServiceBase(object):
    def __init__(self):
        self.name = None
        self.entity = None

########################################################################################################################
#
# Datasource-service related classes
#

class DatasourceQueryResult:
    def __init__(self, records=[], has_more_records=False):
        self.records = records
        self.has_more_records = has_more_records

    def to_dict(self):
        return self.__dict__


class DatasourceUpdateResult:
    def __init__(self, record={}):
        self.record = record

    def to_dict(self):
        return self.__dict__

class DatasourceService(ServiceBase):
    def __init__(self):
        ServiceBase.__init__(self)

    def query(self, dict_filter, order_by, start_index, count):
        result = DatasourceQueryResult()
        raise Exception("Not implemented")
        return result

    def update(self, record):
        result = DatasourceUpdateResult(record)
        raise Exception("Not implemented")
        return result

    def delete(self, id):
        raise Exception("Not implemented")
        return


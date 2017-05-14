from spark.web.services.ServiceBase import DatasourceService, DatasourceQueryResult
import time

class Service(DatasourceService):
    def __init__(self):
        DatasourceService.__init__(self)

    def query(self, dict_filter, order_by, start_index, count):
        start_index = start_index or 0
        records = []
        for x in range(start_index, start_index + (count or 2000)):
            records.append({"id":"%s" % x, "name" : "Application %s Name" % x})
        result = DatasourceQueryResult(records=records, has_more_records=True)
        return result

    def update(self, record):
        raise Exception("Not implemented")

    def delete(self, id):
        raise Exception("Not implemented")

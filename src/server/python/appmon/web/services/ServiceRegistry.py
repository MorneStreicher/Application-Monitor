class ServiceRegistry(object):
    SERVICE_TYPE_DATASOURCE = "Datasource"

    map_services = dict()

    @staticmethod
    def register_service_clazz(service_type, service_name, service_entity, clazz):
        ServiceRegistry.map_services[ServiceRegistry._dict_key(service_type, service_name, service_entity)] = clazz

    @staticmethod
    def get_service_instance(service_type, service_name, service_entity):
        clazz = ServiceRegistry._get_service_clazz(service_type, service_name, service_entity)
        i = clazz()
        i.name = service_name
        i.entity = service_entity
        return i

    @staticmethod
    def _get_service_clazz(service_type, service_name, service_entity):
        key = ServiceRegistry._dict_key(service_type, service_name, service_entity)
        if key in ServiceRegistry.map_services:
            return ServiceRegistry.map_services[key]
        else:
            raise Exception("The service [%s] is not registered." % key)

    @staticmethod
    def _dict_key(service_type, service_name, service_entity):
        service_type = service_type or ""
        service_name = service_name or ""
        service_entity = service_entity or ""
        return "{Type:%s;Name:%s;Entity:%s}" % (service_type.lower(), service_name.lower(), service_entity.lower())


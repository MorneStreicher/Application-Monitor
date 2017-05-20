from appmon.web.services.ServiceRegistry import ServiceRegistry

import appmon.web.services.impl.Datasource_Application_Entity
import appmon.web.services.impl.Datasource_AuditLogEntry_Entity

class RegisterAllServices(object):

    @staticmethod
    def register_all():
        #
        # Datasources
        #
        ServiceRegistry.register_service_clazz(
            ServiceRegistry.SERVICE_TYPE_DATASOURCE,
            "Application",
            "Entity",
            appmon.web.services.impl.Datasource_Application_Entity.Service)

        ServiceRegistry.register_service_clazz(
            ServiceRegistry.SERVICE_TYPE_DATASOURCE,
            "AuditLogEntry",
            "Entity",
            appmon.web.services.impl.Datasource_AuditLogEntry_Entity.Service)


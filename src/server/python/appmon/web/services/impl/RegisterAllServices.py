from spark.web.services.ServiceRegistry import ServiceRegistry

import spark.web.services.impl.Datasource_Application_Entity

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
            spark.web.services.impl.Datasource_Application_Entity.Service)


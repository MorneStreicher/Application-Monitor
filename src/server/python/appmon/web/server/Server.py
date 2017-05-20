import json
import os
import traceback
import datetime
import cherrypy

from appmon.web.services.ServiceRegistry import ServiceRegistry
from appmon.web.services.impl.RegisterAllServices import RegisterAllServices


class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime.datetime):
            return o.isoformat()
        return json.JSONEncoder.default(self, o)

class Root(object):
    @cherrypy.expose
    def default(self, *args, **kwargs):
        raise cherrypy.InternalRedirect('/')

    @cherrypy.expose
    def index(self):
        return "Hello World!"


@cherrypy.expose
@cherrypy.popargs('service_type', 'service_name', 'service_entity', 'method')
class ServiceHandler(object):
    def GET(self, service_type=None, service_name=None, service_entity=None, method=None):
        cl = cherrypy.request.headers.get('Content-Length', 0)
        body_content = None
        if cl > 0:
            body_content = cherrypy.request.body.read(int(cl))
        return self._handle_request(service_type, service_name, service_entity, method, body_content)

    def POST(self, service_type=None, service_name=None, service_entity=None, method=None):
        cl = cherrypy.request.headers.get('Content-Length', 0)
        body_content = None
        if cl > 0:
            body_content = cherrypy.request.body.read(int(cl))
        return self._handle_request(service_type, service_name, service_entity, method, body_content)

    def _handle_request(self, service_type=None, service_name=None, service_entity=None, method=None, body_content=None):
        service_type = service_type or ""
        service_name = service_name or ""
        service_entity = service_entity or ""
        method = method or ""

        result = {
            "success" : True,
            "message" : None,
            "data" : None
        }
        try:
            i = ServiceRegistry.get_service_instance(service_type, service_name, service_entity)
            body = dict()
            if body_content is not None:
                body = json.loads(body_content)

            # Datasource requests
            if service_type.upper() == ServiceRegistry.SERVICE_TYPE_DATASOURCE.upper():
                if method.lower() == "query":
                    result["data"] = i.query(body.get("filter", None), body.get("order_by", None), body.get("start_index", None), body.get("count", None)).to_dict()
                else:
                    raise Exception("Unknown datasource method type [%s]" % method)
            else:
                raise Exception("Unknown service type [%s]" % service_type)
        except:
            result["success"] = False
            result["message"] = traceback.format_exc()

        cherrypy.response.headers['Content-Type'] = 'application/json'
        return json.dumps(result, cls=JSONEncoder)

def start_server():
    dn = os.path.dirname(os.path.realpath(__file__))

    conf = {
        '/': {
            'tools.sessions.on': True,
            'tools.gzip.on': True,
            'tools.staticdir.on': True,
            'tools.staticdir.dir': os.path.join(dn, "..", "..", "..", "..", "..", "ui", "ng", "appmon", "dist"),
            'tools.staticdir.index': 'index.html',
            'tools.expires.on': True,
            'tools.expires.secs': 0
        },
        '/service': {
            'request.dispatch': cherrypy.dispatch.MethodDispatcher()
        }
    }

    # Register All Services that the web server will expose
    RegisterAllServices.register_all()

    root = Root()
    root.service = ServiceHandler()

    fn = os.path.join(dn, "cherrypy.config")
    cherrypy.config.update(fn)
    cherrypy.quickstart(root, '/', conf)

if __name__ == '__main__':
    start_server()

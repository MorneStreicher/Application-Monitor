from spark.db.DBEntities import DBEntities
from spark.db.DBSession import DBSession

with DBSession.session_scope() as session:
    list = session.query(DBEntities.Application).all()
    print repr(list)

    app = session.query(DBEntities.Application).get(1)
    print repr(app)


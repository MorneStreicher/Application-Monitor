from appmon.db.DBEntities import DBEntities
from appmon.db.DBSession import DBSession

with DBSession.session_scope() as session:
    list = session.query(DBEntities.Application).all()
    print repr(list)

    app = session.query(DBEntities.Application).get('8c9bf525-3c05-11e7-a467-080027152214')
    print repr(app.__dict__)
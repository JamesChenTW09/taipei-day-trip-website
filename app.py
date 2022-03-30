
from flask import *
from routes.api.attraction import attractions
from routes.api.user import users
from routes.pages.pages import pages
from routes.api.booking import bookings


app=Flask(__name__)



app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True
app.secret_key="any string but secret" 

#blueprint
app.register_blueprint(users, url_prefix='')
app.register_blueprint(attractions, url_prefix='')
app.register_blueprint(pages, url_prefix='')
app.register_blueprint(bookings, url_prefix='')




app.run(host="0.0.0.0",port=3000, debug=True)
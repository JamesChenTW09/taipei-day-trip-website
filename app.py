
from flask import *
from routes.api.attraction import attractions
from routes.pages.pages import pages

app=Flask(__name__)
app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True

#blueprint
app.register_blueprint(attractions, url_prefix='')
app.register_blueprint(pages, url_prefix='')




app.run(port=3000, debug=True)

from flask import *
from flask_cors import CORS
from routes.api.attraction import attractions
from routes.pages.pages import pages


app=Flask(__name__)



app.config["JSON_AS_ASCII"]=False
app.config["TEMPLATES_AUTO_RELOAD"]=True

#blueprint
app.register_blueprint(attractions, url_prefix='')
app.register_blueprint(pages, url_prefix='')

CORS(app)


app.run(host="0.0.0.0",port=3000, debug=True)
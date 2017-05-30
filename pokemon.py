from flask import Flask
from flask import render_template
from pymongo import MongoClient

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'pokemon_project'
COLLECTION = 'pokemon'


# Routing to correct HTML pages
@app.route("/")
def index():
    return render_template("index.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/charts")
def charts():
    return render_template("charts.html")

@app.route("/temp")
def temp():
    # Fields from DB I'm using
    FIELDS = {
        '_id': True, 'identifier': True, 'species_id': True
    }

    # Connection to DB
    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        collection = conn[DBS_NAME][COLLECTION_NAME]
        projects = collection.find(projection=FIELDS)
        return json.dumps(list(projects))


# Run App
if __name__ == "__main__":
    app.run(debug=True)

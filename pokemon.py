from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json
import os

app = Flask(__name__)

# Set connection properties
MONGODB_URI = os.getenv('MONGODB_URI', 'mongodb://localhost:27017')
DBS_NAME = os.getenv('MONGO_DB_NAME', 'pokemon_project')
COLLECTION = 'pokemonfull'


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


@app.route("/pokemonproject")
def pokemonproject():
    # Connection to MongoDB
    conn = MongoClient(MONGODB_URI)
    pokemondb = conn[DBS_NAME][COLLECTION]

    fields = {
        '_id': False, 'id': True, 'identifier': True,
        'type1': True, 'hp': True,
        'attack': True, 'defense': True,
        'special_attack': True, 'special_defense': True,
        'speed': True
    }

    pokemon_full = pokemondb.find(projection=fields)

    # Return full pokemon JSON
    return json.dumps(list(pokemon_full))


# Route to 404.html when page not found
@app.errorhandler(404)
def error_404(error):
    return render_template("404.html"), 404


# Run App
if __name__ == "__main__":
    app.run()

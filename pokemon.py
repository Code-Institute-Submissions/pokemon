from flask import Flask
from flask import render_template
from pymongo import MongoClient
import pprint
import json

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'pokemon_project'
COLLECTION = 'pokemon_species'


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
    conn = MongoClient(MONGODB_HOST, MONGODB_PORT)
    db = conn[DBS_NAME]
    pokemon_full = db.pokemon_species.aggregate([
        {
            "$lookup": {
                "from": 'pokemon_types',
                "localField": 'id',
                "foreignField": 'id',
                "as": 'types'
            }
        },
        {
            "$unwind": '$types'
        },
        {
            "$redact": {
                "$cond": [
                    {"$eq": ["1", "$types.slot"]},
                    "$$KEEP",
                    "$$PRUNE"
                ]
            }
        },
        {
            "$project": {
                "_id": 0,
                "id": 1,
                "identifier": 1,
                "gender_rate": 1,
                "type1": "$types.type_id"
            }
        }
    ])

    pprint.pprint(list(pokemon_full))
    return json.dumps(list(pokemon_full))

# Run App
if __name__ == "__main__":
    app.run(debug=True)

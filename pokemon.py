from flask import Flask
from flask import render_template
from pymongo import MongoClient
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
    # Connection to MongoDB
    conn = MongoClient(MONGODB_HOST, MONGODB_PORT)
    db = conn[DBS_NAME]
    # Creating one JSON to work with in javascript
    pokemon_full = db.pokemon_species.aggregate([
        {
            # Adding first type to each pokemon
            "$lookup": {
                "from": 'pokemon_types',
                "localField": 'id',
                "foreignField": 'pokemon_id',
                "as": 'types'
            }
        },
        {
            "$unwind": '$types'
        },
        {
            "$redact": {
                "$cond": [
                    {"$eq": ["$types.slot", 1]},
                    "$$KEEP",
                    "$$PRUNE"
                ]
            }
        },
        {
            # Changing type_id to labelled type
            "$lookup": {
                "from": 'types',
                "localField": 'types.type_id',
                "foreignField": 'id',
                "as": 'types2'
            }
        },
        {
            "$unwind": '$types2'
        },
        {
            # Adding HP to each pokemon
            "$lookup": {
                "from": 'pokemon_stats',
                "localField": 'id',
                "foreignField": 'pokemon_id',
                "as": 'hp'
            }
        },
        {
            "$unwind": '$hp'
        },
        {
            "$redact": {
                "$cond": [
                    {"$eq": ["$hp.stat_id", 1]},
                    "$$KEEP",
                    "$$PRUNE"
                ]
            }
        },
        {
            # Adding attack to each pokemon
            "$lookup": {
                "from": 'pokemon_stats',
                "localField": 'id',
                "foreignField": 'pokemon_id',
                "as": 'atk'
            }
        },
        {
            "$unwind": '$atk'
        },
        {
            "$redact": {
                "$cond": [
                    {"$eq": ["$atk.stat_id", 2]},
                    "$$KEEP",
                    "$$PRUNE"
                ]
            }
        },
        {
            # Adding defense to each pokemon
            "$lookup": {
                "from": 'pokemon_stats',
                "localField": 'id',
                "foreignField": 'pokemon_id',
                "as": 'def'
            }
        },
        {
            "$unwind": '$def'
        },
        {
            "$redact": {
                "$cond": [
                    {"$eq": ["$def.stat_id", 3]},
                    "$$KEEP",
                    "$$PRUNE"
                ]
            }
        },
        {
            # Adding special attack to each pokemon
            "$lookup": {
                "from": 'pokemon_stats',
                "localField": 'id',
                "foreignField": 'pokemon_id',
                "as": 'satk'
            }
        },
        {
            "$unwind": '$satk'
        },
        {
            "$redact": {
                "$cond": [
                    {"$eq": ["$satk.stat_id", 4]},
                    "$$KEEP",
                    "$$PRUNE"
                ]
            }
        },
        {
            # Adding special defense to each pokemon
            "$lookup": {
                "from": 'pokemon_stats',
                "localField": 'id',
                "foreignField": 'pokemon_id',
                "as": 'sdef'
            }
        },
        {
            "$unwind": '$sdef'
        },
        {
            "$redact": {
                "$cond": [
                    {"$eq": ["$sdef.stat_id", 5]},
                    "$$KEEP",
                    "$$PRUNE"
                ]
            }
        },
        {
            # Adding speed to each pokemon
            "$lookup": {
                "from": 'pokemon_stats',
                "localField": 'id',
                "foreignField": 'pokemon_id',
                "as": 'speed'
            }
        },
        {
            "$unwind": '$speed'
        },
        {
            "$redact": {
                "$cond": [
                    {"$eq": ["$speed.stat_id", 6]},
                    "$$KEEP",
                    "$$PRUNE"
                ]
            }
        },
        {
            # Creates format I want to use
            "$project": {
                "_id": 0,
                "id": 1,
                "identifier": 1,
                "gender_rate": 1,
                "type1": "$types2.identifier",
                # "type2": "$types2.type_id",
                "hp": "$hp.base_stat",
                "attack": "$atk.base_stat",
                "defense": "$def.base_stat",
                "special_attack": "$satk.base_stat",
                "special_defense": "$sdef.base_stat",
                "speed": "$speed.base_stat"
            }
        }
    ])

    # Return full pokemon JSON
    return json.dumps(list(pokemon_full))

# Run App
if __name__ == "__main__":
    app.run(debug=True)

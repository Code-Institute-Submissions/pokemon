# Pokemon Charts Website
 
## Overview
 
### What is this website for?
 
This is a website for people that enjoy playing pokemon to see how pokemon compare to each other.
 
### What does it do?
 
This website is made to show a lot information about Pokemon in a visual way and allow the user to filter the information as want to. Website originally had a different design for charts, see wireframes, but due to **DC** dimension limitations had to be changed.
 
### How does it work
 
This website uses **Flask** to route viewers through the site. The site is styled with **Bootstrap**. The charts are created using **D3**, **Crossfilter** and **DC**. Tour was made using **intro.js**. Data for the website is stored in **MongoDB**, all the collections I used were stripped down by myself, excluding types.csv, in Mongoshell in order to reduce the amount of information being processed. My **CSS** has been split by page to make it more readable for myself, this includes @media.

## Features
 
### Existing Features
- Eye Catching front page
- About page to explain what the site does
- Charts page with:
	- Pie chart to show split of pokemon types
	- Bar charts to show the spread of each of the 6 main base stats for pokemon
	- Page tour to explain each graph

### Features Left to Implement
- None

## Tech Used
### Some the tech used includes:
- [Bootstrap](http://getbootstrap.com/)
    - Used to give my project a simple, responsive layout
- [Flask](http://flask.pocoo.org)
    - Used to route through the website
- [IntroJS](http://introjs.com)
    - Used to create tour of the charts page
- [D3](https://d3js.org)
    - Used for visualizing data
- [Crossfilter](http://square.github.io/crossfilter/)
    - Used for filtering dataset
- [DC](https://dc-js.github.io/dc.js/)
    - Used to create dynamic charts
- [MongoDB](https://www.mongodb.com)
    - Used to store information
- [PyMongo](https://api.mongodb.com/python/current/)
    - Used to allow interaction between **Python** and **MongoDB**

## Database
- My database was by first stripping data I wasn't using out of the original CSV files, by importing them into MongoDB and using shell to remove unwanted fields. I created a Mongo query in python in order to join all the collections I was using into a single JSON file I could then import into MongoDB as one collection. The query I wrote is below.
```# Creating one JSON to work with in javascript
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
                "hp": "$hp.base_stat",
                "attack": "$atk.base_stat",
                "defense": "$def.base_stat",
                "special_attack": "$satk.base_stat",
                "special_defense": "$sdef.base_stat",
                "speed": "$speed.base_stat"
            }
        }
    ])```

## Testing
- Site was tested extensively using Chrome, Firefox, Opera and Edge. Was also tested using Safari on ipad and on an android phone.
- Site responsiveness was tested on all platforms by resizing the browser window.

## Credits

- The data used on this site are from [Veekun's github page](https://github.com/veekun/pokedex/tree/master/pokedex/data/csv)
- Main image created by myself using [Paint.NET](https://www.getpaint.net/index.html)
- Background image from [Art Station](https://www.artstation.com/artwork/W6xeG)
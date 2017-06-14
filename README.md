# Pokemon Charts Website
 
## Overview
 
### What is this website for?
 
This is a website for people that enjoy playing pokemon to see how pokemon compare to each other.
 
### What does it do?
 
This website is made to show a lot information about Pokemon in a visual way and allow the user to filter the information as want to. Website originally had a different design for charts, see wireframes, but due to **DC** dimension limitations had to be changed.
 
### How does it work
 
This website uses Flask to route viewers through the site. The site is styled with Bootstrap. The charts are created using D3, Crossfilter and DC. Tour was made using intro.js. Data for the website is stored in MongoDB, all the collections I used were stripped down by myself, excluding types.csv, in Mongoshell in order to reduce the amount of information being processed.

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
    - Used to allow interaction between Python and MongoDB

## Testing
    - Site was tested using Chrome, Firefox, Opera and Edge. Was also tested using Safari on ipad and on an android phone.

## Credits

- The data used on this site are from [Veekun's github page](https://github.com/veekun/pokedex/tree/master/pokedex/data/csv)
- Main image created by myself using [Paint.NET](https://www.getpaint.net/index.html)
- Background image from [Art Station](https://www.artstation.com/artwork/W6xeG)
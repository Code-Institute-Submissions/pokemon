# Pokemon Charts Website
 
## Overview
 
### What is this website for?
 
This is a website for people that enjoy playing pokemon to see how pokemon compare to each other.
 
### What does it do?
 
This website is made to show a lot information about Pokemon in a visual way and allow the user to filter the information as want to. Website originally had a different design for charts, see wireframes, but due to **DC** dimension limitations had to be changed.
 
### How does it work
 
This website uses **Flask** to route viewers through the site. The site is styled with **Bootstrap**. The charts are created using **D3**, **Crossfilter** and **DC**. **JQuery** was used to make charts responsive through use of window resize function and for **Bootstrap** to function. Tour was made using **intro.js**. Data for the website is stored in **MongoDB**, all the collections I used were stripped down by myself, excluding types.csv, in Mongoshell in order to reduce the amount of information being processed. My **CSS** has been split by page to make it more readable for myself, this includes @media.

## Features
 
### Existing Features
- Eye Catching front page
- About page to explain what the site does
- Charts page with:
	- Pie chart to show split of pokemon types
	- Bar charts to show the spread of each of the 6 main base stats for pokemon
    - Drop down list to select individual pokemon or see selected pokemon
	- Page tour to explain each graph

### Features Left to Implement
- None

## Tech Used

### Some the tech used includes:
- **HTML**,**CSS**,**Javascript** and **Python**
    - Base languages used in project
- [Bootstrap](http://getbootstrap.com/)
    - Used to give my project a simple, responsive layout
- [JQuery](https://jquery.com)
    - Used for bootstrap and to make charts responsive
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
- My database was created by first stripping data I wasn't using out of the original CSV files, by importing them into MongoDB and using shell to remove unwanted fields. I created a Mongo query in python in order to join all the collections I was using into a single JSON file I could then import into MongoDB as one collection. The query I wrote is in 'mongodb data/Python query.txt' which originally was part of my code and ran everytime my website was accessed, this however was slow and inefficient hence using the query to consolidate my database into a single JSON.

## Testing
- Site was tested extensively using Chrome, Firefox, Opera and Edge. Was also tested using Safari on ipad and on an android phone.
- Site responsiveness was tested on all platforms by resizing the browser window.

## Contributing

### Getting the code up and running
1. Firstly you will need to clone this repository by running the ```git clone <project's Github URL>``` command
2. After you've that you'll need to make sure that you have **Python 2.7.14** installed
    - You can get **Python** by installing it from [here](https://www.python.org/downloads/release/python-2714/)
3. Ensure you have **pip** installed by running ```pip --version```, it should be installed from Python installation
4. Install virtualenv with ```pip install virtualenv``` then create a virtual environment with ```virtualenv pokemon```
5. Activate your virtual environment using ```pokemon\scripts\activate```
6. Make sure you are in project root directory and use ```pip install -r requirements.txt``` to install requirements
7. Make sure you have **MongoDB** installed and have your PATH environment variable setup
    - You can get the **MongoDB** installer [here](https://www.mongodb.com/download-center#production)
8. You can start your **MongoDB** server with ```mongod -dbpath DATABASE_STORAGE_PATH --port 27017```
9. Upload the database files to server with ```mongoimport --db pokemon_project --collection pokemonfull --file C:\PATH\TO\pokemonfull.json```
10. Now you can run the project using ```python pokemon.py```
11. The project will now run on [localhost](http://127.0.0.1:5000)
12. Make changes to the code and if you think it belongs in here then just submit a pull request

## Credits

- The data used on this site are from [Veekun's github page](https://github.com/veekun/pokedex/tree/master/pokedex/data/csv)
- Main image created by myself using [Paint.NET](https://www.getpaint.net/index.html)
- Background image from [Art Station](https://www.artstation.com/artwork/W6xeG)
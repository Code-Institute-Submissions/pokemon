from flask import Flask
from flask import render_template


app = Flask(__name__)


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


# Run App
if __name__ == "__main__":
    app.run(debug=True)

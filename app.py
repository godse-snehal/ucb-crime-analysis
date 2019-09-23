import os

import pandas as pd
import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2://postgres:Mojave123@localhost:5432/crime_db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# prepare to load the entire chicago table into a dataframe
Chicago_Metadata = Base.classes.chicago
stmt = db.session.query(Chicago_Metadata).statement
df = pd.read_sql_query(stmt, db.session.bind)
print("Loaded dataframe successfully...")
# prepare leaflet json
dflocs = df[["primary_type", "latitude", "longitude"]].copy()
g = dflocs.to_json()

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/pie")
def pie():
    """Return a list of Primary_Types and their respective numbers"""
    ptype = df[["primary_type"]].copy()
    ptype_group_cnt = ptype.groupby("primary_type").size()
    return (ptype_group_cnt.to_json())

@app.route("/heatmap")
def heatmap():
    return render_template("leafletheatmap.html")
    
@app.route("/leaflet")
def leaflet():
    return (g)

# route for arrestcrimetype
@app.route("/crimetype")
def crimetype():
    print("Rendering the arrestrates...")
    return render_template("arrest_crimetype.html")


if __name__ == "__main__":
    app.run()
# FastAPI backend: loads both saved models and returns predictions as JSON

import json
import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Fish Market ML API")

# Allow the Next.js website (port 3000) to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the models one time when the server starts
reg_model = joblib.load("models/regression_model.joblib")
clf_model = joblib.load("models/classification_model.joblib")

with open("models/scores.json") as f:
    scores = json.load(f)


# The 5 measurements the website sends (all in cm)
class Fish(BaseModel):
    Length1: float
    Length2: float
    Length3: float
    Height: float
    Width: float


def to_row(fish: Fish):
    # Same column order as training
    return [[fish.Length1, fish.Length2, fish.Length3, fish.Height, fish.Width]]


@app.get("/")
def home():
    return {"message": "Fish Market ML API is running"}


@app.get("/scores")
def get_scores():
    return scores


@app.post("/predict/regression")
def predict_regression(fish: Fish):
    weight = reg_model.predict(to_row(fish))[0]
    weight = max(0, weight)  # weight can't be negative
    return {"predicted_weight": round(float(weight), 1)}


@app.post("/predict/classification")
def predict_classification(fish: Fish):
    species = clf_model.predict(to_row(fish))[0]
    confidence = max(clf_model.predict_proba(to_row(fish))[0])
    return {"predicted_species": species, "confidence": round(float(confidence), 3)}

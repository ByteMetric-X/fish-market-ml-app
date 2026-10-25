# FishScale — Full-Stack Machine Learning App

**Business problem:** A fish market wants to price and sort fish without weighing each one by hand.
From 5 simple tape measurements, the app predicts:

1. **Weight** of the fish in grams → *Linear Regression* (R² ≈ 0.90)
2. **Species** of the fish (Bream, Pike, Perch, Roach, Smelt, Parkki, Whitefish) → *Logistic Regression* (accuracy ≈ 94%)

**Dataset:** [Fish Market — Kaggle](https://www.kaggle.com/datasets/vipullrathod/fish-market) (159 fish, 1 bad row with weight 0 removed). Included at `ml/data/Fish.csv`.

| Column | Meaning |
|---|---|
| Species | Fish type (classification target) |
| Weight | Weight in grams (regression target) |
| Length1, Length2, Length3 | Vertical, diagonal and cross length in cm |
| Height, Width | Height and width in cm |

## Tech
- **ML:** scikit-learn, joblib
- **Backend:** Python FastAPI — `POST /predict/regression`, `POST /predict/classification`
- **Frontend:** Next.js + React — a form for each model, sample fish buttons, live mode, prediction history

## Project structure
```
fish-market-ml-app/
├── ml/
│   ├── data/Fish.csv
│   └── train_models.py      # trains, prints R² and accuracy, saves models
├── backend/
│   ├── main.py              # FastAPI app
│   ├── requirements.txt
│   └── models/              # saved .joblib files + scores.json
└── frontend/                # Next.js app
```

## How to run
Needs **Python 3.10+** and **Node.js 18+**.

**1. Install Python packages**
```bash
cd backend
pip install -r requirements.txt
```

**2. Train the models**
```bash
cd ../ml
python train_models.py
```

**3. Start the backend** (terminal 1)
```bash
cd ../backend
uvicorn main:app --reload --port 8000
```
API docs: http://localhost:8000/docs

**4. Start the frontend** (terminal 2)
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:3000

## API example
```http
POST /predict/regression
{ "Length1": 30.4, "Length2": 33.0, "Length3": 38.5, "Height": 15.0, "Width": 5.3 }
→ { "predicted_weight": 597.4 }

POST /predict/classification
{ "Length1": 30.4, "Length2": 33.0, "Length3": 38.5, "Height": 15.0, "Width": 5.3 }
→ { "predicted_species": "Bream", "confidence": 0.993 }
```

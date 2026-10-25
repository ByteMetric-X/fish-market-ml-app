# 🐟 FishScale — Fish Weight & Species Predictor

A full-stack machine learning web app that predicts a fish's **weight** and **species** from five simple body measurements.

## 📌 Business Problem
Fish markets and processing plants handle thousands of fish every day. Each fish must be **weighed** (price depends on weight) and **identified** (every species has a different price per kg and is packed separately). Doing this by hand is slow, labour-intensive and error-prone.

**FishScale** solves this: enter a fish's measurements and two ML models instantly return its weight and species, so the business can **price and sort fish faster, with fewer workers and fewer mistakes**.

## 📊 Dataset
[Fish Market — Kaggle](https://www.kaggle.com/datasets/vipullrathod/fish-market): 159 fish across 7 species (Bream, Perch, Pike, Roach, Smelt, Parkki, Whitefish). One row with weight = 0 was removed as a data error.

| Column | Description | Role |
|---|---|---|
| Species | Type of fish | Classification target |
| Weight | Weight in grams | Regression target |
| Length1 / Length2 / Length3 | Vertical, diagonal and cross length (cm) | Input |
| Height / Width | Body height and thickness (cm) | Input |

## 🤖 Machine Learning Models
| Task | Model | Predicts | Result |
|---|---|---|---|
| Regression | Linear Regression | Weight (g) | **R² = 0.904** |
| Classification | Logistic Regression | Species | **Accuracy = 93.8%** |

Data is split 80% train / 20% test. Trained models are saved with `joblib` and served by the backend.

## 🛠️ Tech Stack
- **ML:** Python, pandas, scikit-learn, joblib
- **Backend:** FastAPI + Uvicorn (REST API returning JSON)
- **Frontend:** Next.js + React (interactive sliders, sample fish, live predictions, history)

## 💡 Real-World Value & Future Scope
- **Faster operations:** instant weight and species without manual weighing or expert identification.
- **Lower costs and fewer errors** in sorting and pricing; price = predicted weight × species rate.
- **Computer vision integration:** a camera on a conveyor belt (or underwater in a fish farm) can measure each fish automatically and send the measurements to this API. The camera acts as the *eyes*, and FishScale is the *brain*, enabling fully automated, contact-free sorting and stock monitoring.

## 🚀 How to Run
**Requirements:** Python 3.10+ and Node.js 18+

```bash
# 1. Install Python packages and train the models
cd backend
pip install -r requirements.txt
cd ../ml
python train_models.py

# 2. Start the backend (http://localhost:8000/docs)
cd ../backend
python -m uvicorn main:app --reload --port 8000

# 3. In a new terminal, start the frontend
cd frontend
npm install
npm run dev
```
Open **http://localhost:3000** in your browser.

## 📁 Project Structure
```
├── ml/          # dataset + train_models.py
├── backend/     # FastAPI app + saved models
└── frontend/    # Next.js website
```

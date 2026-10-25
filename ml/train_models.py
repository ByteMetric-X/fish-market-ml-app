# Fish Market dataset (Kaggle)
# Model 1: Linear Regression   -> predict fish WEIGHT (a number)
# Model 2: Logistic Regression -> predict fish SPECIES (a category)

import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import r2_score, accuracy_score
import joblib
import json

# Load the data
df = pd.read_csv("data/Fish.csv")

# Remove the one fish that has weight 0 (wrong data)
df = df[df["Weight"] > 0]

# Inputs (measurements in cm) - same for both models
X = df[["Length1", "Length2", "Length3", "Height", "Width"]]


# ---------- Model 1: Regression ----------
y = df["Weight"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

reg_model = LinearRegression()
reg_model.fit(X_train, y_train)

r2 = r2_score(y_test, reg_model.predict(X_test))
print("Regression R2:", round(r2, 3))

joblib.dump(reg_model, "../backend/models/regression_model.joblib")


# ---------- Model 2: Classification ----------
y = df["Species"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

clf_model = LogisticRegression(max_iter=5000)
clf_model.fit(X_train, y_train)

accuracy = accuracy_score(y_test, clf_model.predict(X_test))
print("Classification accuracy:", round(accuracy, 3))

joblib.dump(clf_model, "../backend/models/classification_model.joblib")


# Save the scores so the website can show them
with open("../backend/models/scores.json", "w") as f:
    json.dump({"r2": round(r2, 3), "accuracy": round(accuracy, 3)}, f)

print("Models saved in backend/models/")

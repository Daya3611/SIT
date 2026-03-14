import pandas as pd
import numpy as np
import joblib
import shap

from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report
)

# --------------------------------------------------
# 1️⃣ Load Dataset
# --------------------------------------------------
df = pd.read_csv("synthetic_delay_dataset.csv")

# --------------------------------------------------
# 2️⃣ Feature Engineering
# --------------------------------------------------

# Extract month from sale_date
df["sale_date"] = pd.to_datetime(df["sale_date"])
df["month"] = df["sale_date"].dt.month

# Drop leakage columns
df = df.drop(columns=[
    "transaction_id",
    "sale_date",
    "expected_payment_date",
    "actual_payment_date"
])

# Target
y = df["delay_flag"]

# Features
X = df.drop(columns=["delay_flag"])

# --------------------------------------------------
# 3️⃣ Identify Column Types
# --------------------------------------------------

categorical_cols = ["crop_type", "season"]
numeric_cols = [col for col in X.columns if col not in categorical_cols]

# --------------------------------------------------
# 4️⃣ Preprocessing Pipeline
# --------------------------------------------------

preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_cols),
        ("num", "passthrough", numeric_cols)
    ]
)

# --------------------------------------------------
# 5️⃣ Train/Test Split
# --------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# --------------------------------------------------
# 6️⃣ XGBoost Model (Optimized but Stable)
# --------------------------------------------------

model = XGBClassifier(
    n_estimators=250,
    max_depth=5,
    learning_rate=0.07,
    subsample=0.9,
    colsample_bytree=0.9,
    min_child_weight=2,
    gamma=0.1,
    scale_pos_weight=(len(y_train[y_train==0]) / len(y_train[y_train==1])),
    eval_metric="logloss",
    random_state=42
)

# --------------------------------------------------
# 7️⃣ Full Pipeline
# --------------------------------------------------

pipeline = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("classifier", model)
])

# --------------------------------------------------
# 8️⃣ Train Model
# --------------------------------------------------

pipeline.fit(X_train, y_train)

y_proba = pipeline.predict_proba(X_test)[:, 1]

for t in [0.4, 0.45, 0.5, 0.55, 0.6]:
    y_pred_custom = (y_proba > t).astype(int)
    print("Threshold:", t)
    print("Precision:", precision_score(y_test, y_pred_custom))
    print("Recall:", recall_score(y_test, y_pred_custom))
    print("F1:", f1_score(y_test, y_pred_custom))
    print("------")

# --------------------------------------------------
# 9️⃣ Evaluation
# --------------------------------------------------

y_pred = pipeline.predict(X_test)

print("Accuracy:", accuracy_score(y_test, y_pred))
print("Precision:", precision_score(y_test, y_pred))
print("Recall:", recall_score(y_test, y_pred))
print("F1 Score:", f1_score(y_test, y_pred))

print("\nConfusion Matrix:\n", confusion_matrix(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# --------------------------------------------------
# 🔟 Save Model
# --------------------------------------------------

joblib.dump(pipeline, "delay_prediction_model.pkl")

print("\nModel saved successfully.")

#SHAP
# Save feature names after preprocessing
preprocessor = pipeline.named_steps["preprocessor"]
feature_names = preprocessor.get_feature_names_out()

joblib.dump(feature_names, "feature_names.pkl")
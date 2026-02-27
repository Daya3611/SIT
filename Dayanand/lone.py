import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib

# ==============================
# 1. Load Dataset
# ==============================
df = pd.read_csv("loan_repayment_dataset_3000_records.csv")

# ==============================
# 2. Feature Engineering
# ==============================
# Convert dates to datetime
df["due_date"] = pd.to_datetime(df["due_date"])
df["repayment_date"] = pd.to_datetime(df["repayment_date"])

# Create repayment_days feature
df["repayment_days"] = (df["repayment_date"] - df["due_date"]).dt.days

# Drop unnecessary columns
df = df.drop(["loan_id", "due_date", "repayment_date"], axis=1)

# ==============================
# 3. Define Features & Target
# ==============================
X = df.drop("delay_flag", axis=1)
y = df["delay_flag"]

categorical_cols = ["season"]
numerical_cols = [col for col in X.columns if col not in categorical_cols]

# ==============================
# 4. Preprocessing
# ==============================
preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_cols)
    ],
    remainder="passthrough"
)

# ==============================
# 5. Model Pipeline
# ==============================
model = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("classifier", RandomForestClassifier(
        n_estimators=200,
        max_depth=10,
        random_state=42
    ))
])

# ==============================
# 6. Train Test Split
# ==============================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ==============================
# 7. Train Model
# ==============================
model.fit(X_train, y_train)

# ==============================
# 8. Predictions
# ==============================
y_pred = model.predict(X_test)

# ==============================
# 9. Evaluation
# ==============================
print("Model Performance:")
print("Accuracy:", round(accuracy_score(y_test, y_pred), 4))
print("Precision:", round(precision_score(y_test, y_pred), 4))
print("Recall:", round(recall_score(y_test, y_pred), 4))
print("F1 Score:", round(f1_score(y_test, y_pred), 4))

print("\nConfusion Matrix:")
print(confusion_matrix(y_test, y_pred))

# ==============================
# 10. Feature Importance
# ==============================
feature_names = (
    model.named_steps["preprocessor"]
    .named_transformers_["cat"]
    .get_feature_names_out(categorical_cols)
)

all_feature_names = list(feature_names) + numerical_cols

importances = model.named_steps["classifier"].feature_importances_

importance_df = pd.DataFrame({
    "feature": all_feature_names,
    "importance": importances
}).sort_values(by="importance", ascending=False)

print("\nTop Important Features:")
print(importance_df.head(10))

# ==============================
# 11. Save Model
# ==============================
joblib.dump(model, "loan_risk_model.pkl")

print("\nModel saved as loan_risk_model.pkl")
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
import joblib

# ===============================
# 1. Load Dataset
# ===============================
df = pd.read_csv("farmer_crop_yield_dataset_3500_records.csv")

# ===============================
# 2. Define Target
# ===============================
y = df["yield_tonnes_per_hectare"]

# Drop target + production (to avoid leakage)
X = df.drop(["yield_tonnes_per_hectare",
             "total_production_tonnes"], axis=1)

# ===============================
# 3. Define Column Types
# ===============================
categorical_cols = ["farmer_id", "crop_type", "season", "state"]
numerical_cols = [
    "land_area_hectare",
    "annual_rainfall_mm",
    "fertilizer_used_kg",
    "pesticide_used_liters"
]

# ===============================
# 4. Preprocessing
# ===============================
preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_cols)
    ],
    remainder="passthrough"
)

# ===============================
# 5. Build Pipeline
# ===============================
model = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", RandomForestRegressor(
        n_estimators=200,
        max_depth=15,
        random_state=42
    ))
])

# ===============================
# 6. Train-Test Split
# ===============================
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# ===============================
# 7. Train Model
# ===============================
model.fit(X_train, y_train)

# ===============================
# 8. Predict
# ===============================
y_pred = model.predict(X_test)

# ===============================
# 9. Evaluate
# ===============================
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print("Model Performance")
print("MAE:", round(mae, 4))
print("RMSE:", round(rmse, 4))
print("R2 Score:", round(r2, 4))

# ===============================
# 10. Feature Importance
# ===============================
feature_names = (
    model.named_steps["preprocessor"]
    .named_transformers_["cat"]
    .get_feature_names_out(categorical_cols)
)

all_features = list(feature_names) + numerical_cols
importances = model.named_steps["regressor"].feature_importances_

feature_importance_df = pd.DataFrame({
    "feature": all_features,
    "importance": importances
}).sort_values(by="importance", ascending=False)

print("\nTop 10 Important Features")
print(feature_importance_df.head(10))

# ===============================
# 11. Save Model
# ===============================
joblib.dump(model, "yield_prediction_model.pkl")
print("\nModel saved as yield_prediction_model.pkl")
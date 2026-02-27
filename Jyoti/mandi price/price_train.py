import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestRegressor

df = pd.read_csv("mandi_price_dataset.csv")

X = df[["crop_type", "season", "month"]]
y = df["market_price"]

categorical_cols = ["crop_type", "season"]
numeric_cols = ["month"]

preprocessor = ColumnTransformer(
    transformers=[
        ("cat", OneHotEncoder(handle_unknown="ignore"), categorical_cols),
        ("num", "passthrough", numeric_cols)
    ]
)

model = RandomForestRegressor(n_estimators=150, random_state=42)

pipeline = Pipeline(steps=[
    ("preprocessor", preprocessor),
    ("regressor", model)
])

pipeline.fit(X, y)

joblib.dump(pipeline, "price_model.pkl")

feature_names = pipeline.named_steps["preprocessor"].get_feature_names_out()
joblib.dump(feature_names, "price_feature_names.pkl")

print("Price model trained.")
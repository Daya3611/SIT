import pandas as pd
import joblib
import shap
import numpy as np

# Load model + metadata
pipeline = joblib.load("mandi_price/price_model.pkl")
feature_names = joblib.load("mandi_price/price_feature_names.pkl")

preprocessor = pipeline.named_steps["preprocessor"]
model = pipeline.named_steps["regressor"]

explainer = shap.TreeExplainer(model)

PRICE_STD_DEV = 300

def clean_feature_name(name):
    name = name.replace("cat__", "")
    name = name.replace("num__", "")
    name = name.replace("_", " ")
    return name

def format_shap_output(shap_values):

    explanation = []

    for i, value in enumerate(shap_values[0]):

        if abs(value) > 5:  # ignore small price impacts

            explanation.append({
                "feature": clean_feature_name(feature_names[i]),
                "impact": round(float(value), 2),
                "direction": "increase_price" if value > 0 else "decrease_price"
            })

    explanation = sorted(
        explanation,
        key=lambda x: abs(x["impact"]),
        reverse=True
    )

    return explanation[:5]

def detect_price_anomaly(data: dict):

    input_df = pd.DataFrame([{
        "crop_type": data["crop_type"],
        "season": data["season"],
        "month": data["month"]
    }])

    predicted_price = pipeline.predict(input_df)[0]
    listed_price = data["listed_price"]

    deviation = listed_price - predicted_price
    z_score = deviation / PRICE_STD_DEV

    anomaly = abs(z_score) > 2

    # SHAP explanation
    processed = preprocessor.transform(input_df)
    shap_values = explainer.shap_values(processed)

    explanation = format_shap_output(shap_values)

    return {
        "predicted_market_price": round(float(predicted_price), 2),
        "listed_price": listed_price,
        "deviation": round(float(deviation), 2),
        "z_score": round(float(z_score), 2),
        "is_anomaly": anomaly,
        "anomaly_type": (
            "Overpriced" if deviation > 0 and anomaly else
            "Underpriced" if deviation < 0 and anomaly else
            "Normal"
        ),
        "explanation": explanation
    }
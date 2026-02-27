from fastapi import FastAPI
import pandas as pd
import numpy as np
import joblib
import shap

app = FastAPI()

# -------------------------
# Load Model + Metadata
# -------------------------

pipeline = joblib.load("delay_prediction_model.pkl")
feature_names = joblib.load("feature_names.pkl")

preprocessor = pipeline.named_steps["preprocessor"]
model = pipeline.named_steps["classifier"]

explainer = shap.TreeExplainer(model)

# -------------------------
# Utility: Format Explanation
# -------------------------

def format_shap_output(shap_values, input_row):

    explanation = []

    for i, value in enumerate(shap_values[0]):

        if abs(value) > 0.05:  # Only show impactful features

            explanation.append({
                "feature": feature_names[i],
                "impact": float(value),
                "direction": "increase_risk" if value > 0 else "decrease_risk"
            })

    # Sort by absolute importance
    explanation = sorted(explanation, key=lambda x: abs(x["impact"]), reverse=True)

    return explanation[:5]  # Top 5 contributors

# -------------------------
# Predict + Explain Endpoint
# -------------------------

@app.post("/predict-delay")
def predict_delay(data: dict):

    # Convert input dict to DataFrame
    input_df = pd.DataFrame([data])

    # Feature Engineering
    input_df["month"] = pd.to_datetime(input_df["sale_date"]).dt.month

    # Drop unnecessary fields if included
    drop_cols = ["transaction_id", "expected_payment_date", "actual_payment_date"]
    input_df = input_df.drop(columns=[col for col in drop_cols if col in input_df.columns])

    # Predict probability
    probability = pipeline.predict_proba(input_df)[0][1]

    # SHAP Explanation
    processed = preprocessor.transform(input_df)
    shap_values = explainer.shap_values(processed)

    explanation = format_shap_output(shap_values, input_df)

    return {
        "delay_probability": float(probability),
        "risk_score": float(round(probability * 100, 2)),
        "risk_level": (
            "High" if probability > 0.7 else
            "Medium" if probability > 0.4 else
            "Low"
        ),
        "explanation": explanation
    }

if __name__ == "__main__":

    sample_input = {
        "buyer_id": 3,
        "buyer_base_delay_rate": 0.35,
        "crop_type": "Wheat",
        "season": "Monsoon",
        "quantity": 950,
        "price": 3200,
        "shipment_duration": 9,
        "sale_date": "2025-02-10"
    }

    result = predict_delay(sample_input)

    print(result)
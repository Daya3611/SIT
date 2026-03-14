import pandas as pd
import joblib
import shap

from utils import clean_feature_name, extract_month
from risk_engine import compute_risk_score

# Load models once
pipeline = joblib.load("delay_prediction_model.pkl")
feature_names = joblib.load("feature_names.pkl")
reliability_df = pd.read_csv("reliability/buyer_reliability.csv")

preprocessor = pipeline.named_steps["preprocessor"]
model = pipeline.named_steps["classifier"]
explainer = shap.TreeExplainer(model)

def get_reliability(buyer_id):
    row = reliability_df[reliability_df["buyer_id"] == buyer_id]
    if len(row) == 0:
        return 0.7
    return float(row["reliability_score"].values[0])

def format_shap_output(shap_values):

    explanation = []

    for i, value in enumerate(shap_values[0]):

        if abs(value) > 0.05:
            explanation.append({
                "feature": clean_feature_name(feature_names[i]),
                "impact": round(float(value), 3),
                "direction": "increase_risk" if value > 0 else "decrease_risk"
            })

    explanation = sorted(explanation, key=lambda x: abs(x["impact"]), reverse=True)

    return explanation[:5]

def predict_with_explanation(data: dict):

    input_df = pd.DataFrame([data])
    input_df = extract_month(input_df)

    drop_cols = ["transaction_id", "expected_payment_date", "actual_payment_date"]
    input_df = input_df.drop(columns=[c for c in drop_cols if c in input_df.columns])

    delay_probability = pipeline.predict_proba(input_df)[0][1]

    reliability = get_reliability(data["buyer_id"])

    risk_score = compute_risk_score(
        delay_probability,
        reliability,
        data["price"]
    )

    processed = preprocessor.transform(input_df)
    shap_values = explainer.shap_values(processed)

    explanation = format_shap_output(shap_values)

    return {
        "delay_probability": float(round(delay_probability, 4)),
        "reliability_score": reliability,
        "final_risk_score": risk_score,
        "risk_level": (
            "High" if risk_score > 70 else
            "Medium" if risk_score > 40 else
            "Low"
        ),
        "explanation": explanation
    }
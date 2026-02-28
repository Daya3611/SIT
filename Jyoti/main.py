from fastapi import FastAPI
from schemas import TransactionInput
from inference import predict_with_explanation
from mandi_price.price_anomaly import detect_price_anomaly

app = FastAPI()

@app.post("risk-score")
def risk_score(data: TransactionInput):
    return predict_with_explanation(data.dict())

@app.get("health")
def health_check():
    return {"status": "ok"}


@app.post("price-anomaly")
def price_anomaly(data: dict):
    return detect_price_anomaly(data)
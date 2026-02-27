import joblib
import pandas as pd

# ============================
# 1. Load Trained Model
# ============================
model = joblib.load("yield_prediction_model.pkl")

# ============================
# 2. Create New Farmer Sample
# ============================
new_data = pd.DataFrame([{
    "farmer_id": "F0100",
    "crop_type": "Wheat",
    "season": "Rabi",
    "state": "Punjab",
    "land_area_hectare": 3.5,
    "annual_rainfall_mm": 900,
    "fertilizer_used_kg": 300,
    "pesticide_used_liters": 20
}])

# ============================
# 3. Predict Yield
# ============================
predicted_yield = model.predict(new_data)

print("Predicted Yield (tonnes per hectare):",
      round(predicted_yield[0], 3))
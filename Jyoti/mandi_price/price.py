import pandas as pd
import numpy as np
import random

CROPS = ["Wheat", "Rice", "Maize", "Cotton", "Soybean"]
SEASONS = ["Kharif", "Rabi", "Monsoon", "Summer"]

data = []

for _ in range(800):

    crop = random.choice(CROPS)
    season = random.choice(SEASONS)
    month = np.random.randint(1, 13)

    base_price = {
        "Wheat": 2200,
        "Rice": 2400,
        "Maize": 1800,
        "Cotton": 5000,
        "Soybean": 3500
    }[crop]

    seasonal_factor = {
        "Kharif": 1.0,
        "Rabi": 1.05,
        "Monsoon": 0.95,
        "Summer": 1.1
    }[season]

    price = base_price * seasonal_factor
    price += np.random.normal(0, 200)

    data.append({
        "crop_type": crop,
        "season": season,
        "month": month,
        "market_price": round(price, 2)
    })

df = pd.DataFrame(data)
df.to_csv("mandi_price_dataset.csv", index=False)
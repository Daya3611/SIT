import pandas as pd
import numpy as np
import random

np.random.seed(42)
random.seed(42)

SAMPLES_PER_TYPE = 250

soil_types = ["Black Soil", "Red Soil", "Laterite Soil", "Alluvial Soil"]
textures = ["Sandy", "Clayey", "Loamy", "Silty"]

data = []

def calculate_quality_score(pH, N, P, K, organic, ec, moisture):

    pH_score = max(0, 1 - abs(pH - 7) / 2)
    npk_score = min(1, (N/60 + P/30 + K/300) / 3)
    organic_score = min(1, organic / 0.8)
    moisture_score = min(1, moisture / 70)
    ec_score = max(0, 1 - ec / 2)

    quality = (
        0.25 * pH_score +
        0.25 * npk_score +
        0.2 * organic_score +
        0.15 * moisture_score +
        0.15 * ec_score
    )

    return round(quality * 100, 2)

def generate_texture_behavior(texture):
    if texture == "Sandy":
        initial = np.random.uniform(60, 70)
        m24 = initial - np.random.uniform(25, 35)
    elif texture == "Clayey":
        initial = np.random.uniform(65, 75)
        m24 = initial - np.random.uniform(5, 12)
    elif texture == "Loamy":
        initial = np.random.uniform(60, 70)
        m24 = initial - np.random.uniform(12, 18)
    else:
        initial = np.random.uniform(62, 72)
        m24 = initial - np.random.uniform(15, 22)

    drainage = initial - m24
    return initial, m24, drainage

def generate_soil_properties(soil_type):

    if soil_type == "Black Soil":
        pH = np.random.uniform(7.5, 8.5)
        organic = np.random.uniform(0.5, 0.8)
        ec = np.random.uniform(0.5, 1.0)

    elif soil_type == "Red Soil":
        pH = np.random.uniform(6.0, 7.0)
        organic = np.random.uniform(0.2, 0.4)
        ec = np.random.uniform(0.3, 0.7)

    elif soil_type == "Laterite Soil":
        pH = np.random.uniform(5.0, 6.5)
        organic = np.random.uniform(0.1, 0.3)
        ec = np.random.uniform(0.6, 1.2)

    else:  # Alluvial
        pH = np.random.uniform(6.5, 7.5)
        organic = np.random.uniform(0.4, 0.7)
        ec = np.random.uniform(0.3, 0.8)

    N = np.random.uniform(20, 60)
    P = np.random.uniform(10, 30)
    K = np.random.uniform(100, 300)
    temp = np.random.uniform(25, 35)

    return pH, organic, ec, N, P, K, temp

for soil_type in soil_types:
    for _ in range(SAMPLES_PER_TYPE):

        texture = random.choice(textures)

        initial, m24, drainage = generate_texture_behavior(texture)
        pH, organic, ec, N, P, K, temp = generate_soil_properties(soil_type)

        quality = calculate_quality_score(pH, N, P, K, organic, ec, initial)

        data.append({
            "soil_texture": texture,
            "soil_type": soil_type,
            "pH": pH,
            "initial_moisture": initial,
            "moisture_after_24hr": m24,
            "drainage_rate": drainage,
            "electrical_conductivity": ec,
            "nitrogen": N,
            "phosphorus": P,
            "potassium": K,
            "organic_carbon": organic,
            "temperature": temp,
            "soil_quality_score": quality
        })

df = pd.DataFrame(data)
df.to_csv("iot_soil_full_dataset_balanced.csv", index=False)

print("Balanced Soil Dataset Generated Successfully.")
print(df["soil_type"].value_counts())
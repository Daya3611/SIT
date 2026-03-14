import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# -----------------------------
# Configuration
# -----------------------------
NUM_BUYERS = 10
NUM_TRANSACTIONS = 400

SEASONS = ["Kharif", "Rabi", "Monsoon", "Summer"]
CROPS = ["Wheat", "Rice", "Maize", "Cotton", "Soybean"]

np.random.seed(42)
random.seed(42)

# -----------------------------
# Step 1: Create Buyer Profiles (Structured Behavior)
# -----------------------------

buyer_profiles = []

for i in range(NUM_BUYERS):

    buyer_type = random.choices(
        ["Reliable", "Moderate", "Risky"],
        weights=[0.5, 0.3, 0.2]  # 50% reliable, 30% moderate, 20% risky
    )[0]

    if buyer_type == "Reliable":
        base_delay_rate = 0.10
    elif buyer_type == "Moderate":
        base_delay_rate = 0.35
    else:
        base_delay_rate = 0.65

    buyer_profiles.append({
        "buyer_id": i,
        "buyer_type": buyer_type,
        "base_delay_rate": base_delay_rate
    })

buyers_df = pd.DataFrame(buyer_profiles)

# -----------------------------
# Step 2: Generate Transactions
# -----------------------------

data = []

for txn_id in range(NUM_TRANSACTIONS):

    buyer = buyers_df.sample(1).iloc[0]

    buyer_id = buyer["buyer_id"]
    base_delay_rate = buyer["base_delay_rate"]

    crop = random.choice(CROPS)
    season = random.choice(SEASONS)

    quantity = np.random.randint(100, 1200)
    price = round(np.random.uniform(1500, 5000), 2)
    shipment_duration = np.random.randint(2, 12)

    # -----------------------------
    # Step 3: Structured Delay Logic
    # -----------------------------

    delay_probability = base_delay_rate

    # Large transactions increase risk
    if quantity > 900:
        delay_probability += 0.25

    # Long shipment increases risk
    if shipment_duration > 8:
        delay_probability += 0.30

    # Monsoon slightly risky
    if season == "Monsoon":
        delay_probability += 0.10

    # Controlled noise
    delay_probability += np.random.uniform(-0.05, 0.05)

    # Keep within bounds
    delay_probability = min(max(delay_probability, 0.05), 0.90)

    delay_flag = 1 if np.random.rand() < delay_probability else 0

    # -----------------------------
    # Step 4: Dates (No Leakage)
    # -----------------------------

    sale_date = datetime(2025, 1, 1) + timedelta(days=np.random.randint(0, 180))
    expected_payment_date = sale_date + timedelta(days=7)

    if delay_flag == 1:
        actual_payment_date = expected_payment_date + timedelta(days=np.random.randint(3, 15))
    else:
        actual_payment_date = expected_payment_date - timedelta(days=np.random.randint(0, 2))

    data.append({
        "transaction_id": txn_id,
        "buyer_id": buyer_id,
        "buyer_base_delay_rate": base_delay_rate,
        "crop_type": crop,
        "season": season,
        "quantity": quantity,
        "price": price,
        "shipment_duration": shipment_duration,
        "sale_date": sale_date,
        "expected_payment_date": expected_payment_date,
        "actual_payment_date": actual_payment_date,
        "delay_flag": delay_flag
    })

df = pd.DataFrame(data)

df.to_csv("synthetic_delay_dataset.csv", index=False)

print("Dataset generated successfully.")
print(df["delay_flag"].value_counts(normalize=True))
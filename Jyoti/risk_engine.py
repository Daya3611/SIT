MAX_EXPECTED_VALUE = 5000

def compute_risk_score(delay_probability, reliability_score, transaction_value):

    reliability_risk = 1 - reliability_score
    normalized_value = min(transaction_value / MAX_EXPECTED_VALUE, 1)

    final_risk = (
        0.6 * delay_probability +
        0.25 * reliability_risk +
        0.15 * normalized_value
    )

    return round(final_risk * 100, 2)
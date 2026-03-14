import pandas as pd

def compute_reliability(df):
    reliability_df = (
        df.groupby("buyer_id")["delay_flag"]
        .agg(total_transactions="count", delayed_transactions="sum")
        .reset_index()
    )

    reliability_df["on_time_payments"] = (
        reliability_df["total_transactions"] -
        reliability_df["delayed_transactions"]
    )

    reliability_df["reliability_score"] = (
        reliability_df["on_time_payments"] /
        reliability_df["total_transactions"]
    )

    return reliability_df[["buyer_id", "reliability_score"]]


if __name__ == "__main__":
    df = pd.read_csv("synthetic_delay_dataset.csv")
    reliability = compute_reliability(df)
    reliability.to_csv("buyer_reliability.csv", index=False)
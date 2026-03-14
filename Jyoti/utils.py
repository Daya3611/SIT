import pandas as pd

def clean_feature_name(name):
    name = name.replace("num__", "")
    name = name.replace("cat__", "")
    name = name.replace("_", " ")
    return name

def extract_month(df):
    df["month"] = pd.to_datetime(df["sale_date"]).dt.month
    return df
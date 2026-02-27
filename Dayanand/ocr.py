import cv2
import easyocr
import numpy as np
import json
import os
import re
from pdf2image import convert_from_path
from datetime import datetime

# ============================================
# CONFIG
# ============================================

INPUT_FILE = "b.pdf"
OUTPUT_DIR = "output"
POPPLER_PATH = r"c:\Users\Dayanand\Desktop\SIT\Dayanand\poppler_dir\poppler-24.08.0\Library\bin"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# ============================================
# PDF → IMAGE
# ============================================

def convert_pdf_to_image(pdf_path):
    pages = convert_from_path(pdf_path, poppler_path=POPPLER_PATH)

    image_path = os.path.join(OUTPUT_DIR, "temp_page.jpg")
    pages[0].save(image_path, "JPEG")

    return image_path

# ============================================
# OCR
# ============================================

def run_ocr(image_path):

    reader = easyocr.Reader(['en'], gpu=False)

    image = cv2.imread(image_path)
    if image is None:
        raise ValueError("Image not found")

    results = reader.readtext(image, paragraph=True)

    text_lines = []
    confidence_scores = []

    for item in results:
        text_lines.append(item[1])
        if len(item) >= 3:
            confidence_scores.append(item[2])

    full_text = " ".join(text_lines)
    avg_conf = float(np.mean(confidence_scores)) if confidence_scores else 0.0

    return full_text, avg_conf

# ============================================
# STRUCTURED FIELD EXTRACTION
# ============================================

def extract_fields(text):

    data = {}

    # Village
    village_match = re.search(r"Village\s+(?!Form\b)([A-Za-z]+)", text, re.IGNORECASE)
    data["village"] = village_match.group(1).strip() if village_match else None

    # Taluka
    taluka_match = re.search(r"Taluka\s+([A-Za-z]+)", text, re.IGNORECASE)
    data["taluka"] = taluka_match.group(1).strip() if taluka_match else None

    # District
    district_match = re.search(r"District\s*[:\-]?\s*([A-Za-z]+)", text, re.IGNORECASE)
    data["district"] = district_match.group(1).strip() if district_match else None

    # ULPIN
    ulpin_match = re.search(r"PU-ID\s*[:\-]?\s*(\d+)", text, re.IGNORECASE)
    data["ulpin"] = ulpin_match.group(1) if ulpin_match else None

    # Survey Number
    survey_match = re.search(r"Survey Number(?:.*?Subdivision)?\s*(\d+)", text, re.IGNORECASE)
    data["survey_number"] = survey_match.group(1) if survey_match else None

    # Total Area
    area_match = re.search(r"Total\s*(?:La\.Yo\.\s*)?Area.*?(\d+\.\d+\.\d+)", text, re.IGNORECASE)
    data["total_area"] = area_match.group(1) if area_match else None

    # Transfer Number & Date (Handles typos like 'Transfer Numberq')
    transfer_match = re.search(r"Transfer\s*Numb[a-zA-Z\s]*(\d+)", text, re.IGNORECASE)
    data["transfer_number"] = transfer_match.group(1) if transfer_match else None

    date_match = re.search(r"Date.*?(\d{1,2}/\d{1,2}/\d{4})", text, re.IGNORECASE)
    data["transfer_date"] = date_match.group(1) if date_match else None

    # =====================================
    # OWNER EXTRACTION
    # =====================================

    # Many owner names do not explicitly have parentheses, but end in a share number and sometimes a trailing ')'
    # E.g. "Satish Vitthal Gawde 750 )" or "(1 )"
    owners = re.findall(
        r"([A-Z][a-zA-Z\s]+?)\s*\(?\s*(\d+)\s*\)?",
        text
    )

    owner_list = []

    for name, share in owners:
        clean_name = name.strip()
        # Filter out common false positives and small junk words
        junk_words = ["Village", "Taluka", "District", "Date", "Area", "Number", "Rules", "Sample", "Total", "Special", "signed", "FMt"]
        if len(clean_name) > 3 and not any(junk.lower() in clean_name.lower() for junk in junk_words):
            owner_list.append({
                "owner_name": clean_name,
                "share_number": share
            })

    # Remove duplicates
    unique_owners = {}
    for owner in owner_list:
        unique_owners[owner["owner_name"]] = owner

    data["owners"] = list(unique_owners.values())

    # =====================================
    # BASIC CROP DETECTION
    # =====================================

    years = re.findall(r"(20\d{2}-\d{2})", text)
    crops = re.findall(
        r"(Coconut grove|Cashew grove|Betel nut plantation|Madbag|Madbāg)",
        text, re.IGNORECASE
    )

    data["crop_years"] = list(set(years))
    data["crop_types"] = list(set(crops))

    return data

# ============================================
# MAIN
# ============================================

if __name__ == "__main__":

    print("Processing 7/12 document...")

    if not os.path.exists(INPUT_FILE):
        raise FileNotFoundError("Input file not found")

    if INPUT_FILE.lower().endswith(".pdf"):
        image_path = convert_pdf_to_image(INPUT_FILE)
    else:
        image_path = INPUT_FILE

    text, confidence = run_ocr(image_path)

    print("\nRAW TEXT EXTRACTED:\n")
    print(text)

    structured_data = extract_fields(text)

    final_output = {
        "document_type": "7/12 Extract",
        "confidence_score": confidence,
        "validation_status": True if structured_data.get("survey_number") else False,
        "data": structured_data
    }

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    json_path = os.path.join(OUTPUT_DIR, f"satbara_{timestamp}.json")

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(final_output, f, indent=4)

    print("\nStructured JSON Saved:", json_path)
    print("\nFINAL OUTPUT:\n")
    print(json.dumps(final_output, indent=4))
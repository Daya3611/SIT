import os
import re
import json
import pdfplumber
import pytesseract
from pdf2image import convert_from_path

# ==============================================================================
# SETUP & INSTALLATION INSTRUCTIONS (WINDOWS)
# ==============================================================================
# 1. Install Poppler for Windows (required for pdf2image):
#    - Download from: https://github.com/oschwartz10612/poppler-windows/releases/
#    - Extract it to C:\Program Files\poppler
#    - Add C:\Program Files\poppler\Library\bin to your System PATH manually.
#
# 2. Install Tesseract OCR for Windows:
#    - Download from: https://github.com/UB-Mannheim/tesseract/wiki
#    - Install it. Ensure you check the box for 'Marathi' language data during installation.
#    - Add C:\Program Files\Tesseract-OCR to your System PATH.
#    - Alternatively, uncomment the `pytesseract.pytesseract.tesseract_cmd` line below.
#
# 3. Install required python libraries:
#    - Open your terminal or command prompt and run:
#      pip install pdfplumber pytesseract pdf2image
# ==============================================================================

# Configure Tesseract path if it's not in the system PATH:
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Configure Poppler path if it's not in the system PATH:
# POPPLER_PATH = r'C:\Program Files\poppler\Library\bin'

def extract_text_from_pdf(pdf_path):
    """
    Extracts text from a given PDF. 
    First tries pdfplumber. If the text is shorter than 100 characters, 
    it assumes the PDF is a scanned image and switches to Tesseract OCR.
    """
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"Error: The file '{pdf_path}' was not found.")
        
    text = ""
    try:
        # Try digital extraction first
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
    except Exception as e:
        print(f"Error reading PDF with pdfplumber: {e}")

    # If extracted text length < 100 characters or contains garbled font -> assume scanned/unreadable
    if len(text.strip()) < 100 or text.count('(cid') > 5:
        print("Detected scanned PDF or garbled font encoding. Switching to OCR (Tesseract)...")
        text = ""
        try:
            # Convert PDF pages to images. 
            poppler_bin = r"c:\Users\Dayanand\Desktop\SIT\Dayanand\poppler_dir\poppler-24.08.0\Library\bin"
            images = convert_from_path(pdf_path, poppler_path=poppler_bin)
            for i, image in enumerate(images):
                print(f"Processing page {i+1}/{len(images)} with OCR...")
                # Use Marathi and English for OCR
                ocr_text = pytesseract.image_to_string(image, lang="mar+eng")
                text += ocr_text + "\n"
        except Exception as e:
            print(f"\nOCR failed: {e}")
            print("\nDid you install Poppler and Tesseract correctly? Please check the setup instructions at the top of the file.")
            return None
    else:
        print("Detected digital PDF. Extraction using pdfplumber successful.")

    return text

def parse_satbara_details(text):
    """
    Parses the extracted Marathi/English text using flexible regex patterns 
    to extract structured administrative and agricultural fields.
    """
    data = {
        "survey_number": None,
        "ulpin": None,
        "village_name": None,
        "taluka": None,
        "district": None,
        "total_land_area": None,
        "owner_names": [],
        "crop_history": {},
        "qr_reference_number": None
    }
    
    if not text:
        return data

    lines = text.split('\n')
    
    # 1. Survey Number (Gat No. / गट क्र.)
    gat_no_match = re.search(r'(?:गट\s*क्र\.|गट\s*क्रमांक|भूमापन\s*क्रमांक)\s*[:\-]?\s*([A-Za-z0-9]+)', text)
    if not gat_no_match:
        gat_no_match = re.search(r'Gat\s*No\.?\s*[:\-]?\s*([A-Za-z0-9]+)', text, re.IGNORECASE)
    if gat_no_match:
        data['survey_number'] = gat_no_match.group(1).strip()

    # 2. ULPIN (通常 11+ digit number)
    ulpin_match = re.search(r'ULPIN\s*[:\-]?\s*(\d{11,})', text, re.IGNORECASE)
    if not ulpin_match:
        # Match using Marathi label or generic keyword
        ulpin_match = re.search(r'(?:युएलपीआयएन|युनिफाइड)\s*[:\-]?\s*(\d{11,})', text)
    if ulpin_match:
        data['ulpin'] = ulpin_match.group(1).strip()

    # 3. Village Name (गाव)
    village_match = re.search(r'गाव\s*(?:चे\s*नाव)?\s*[:\-]?\s*([^\s,]+)', text)
    if village_match:
        data['village_name'] = village_match.group(1).strip()

    # 4. Taluka (तालुका)
    taluka_match = re.search(r'तालुका\s*[:\-]?\s*([^\s,]+)', text)
    if taluka_match:
        data['taluka'] = taluka_match.group(1).strip()

    # 5. District (जिल्हा)
    district_match = re.search(r'जिल्हा\s*[:\-]?\s*([^\s,]+)', text)
    if district_match:
        data['district'] = district_match.group(1).strip()

    # 6. Total Land Area (pattern like \d+\.\d+\.\d+)
    area_match = re.search(r'(\d+\.\d+\.\d+)', text)
    if area_match:
        data['total_land_area'] = area_match.group(1).strip()

    # 7. Owner Names
    # Extracted by looking near "खातेदाराचे नाव" or "कब्जेदाराचे नाव"
    owner_start = -1
    for i, line in enumerate(lines):
        if re.search(r'(खातेदाराचे\s*नाव|कब्जेदाराचे\s*नाव)', line):
            owner_start = i + 1
            break
            
    if owner_start != -1:
        # Search the following lines until a new section starts
        for j in range(owner_start, min(owner_start + 10, len(lines))):
            line_val = lines[j].strip()
            # Stop if the line matches other common table headers
            if re.search(r'(क्षेत्र|आकार|विशेष|नोंद|शेरा|पीक|जलसिंचित)', line_val):
                break
            
            # Filter noise: strings mainly containing non-numeric characters
            if len(line_val) >= 3 and not re.match(r'^[\d\s\.\,\-\:]+$', line_val):
                # Split based on commas in case multiple owners exist on one line
                for part in re.split(r'[,|;]', line_val):
                    clean_name = part.strip()
                    if clean_name and len(clean_name) > 2:
                        data['owner_names'].append(clean_name)

    # 8. Crop History (Year-wise)
    # Extracts years and assumes following text relates to crops
    years_found = {}
    current_year = None
    for line in lines:
        # Match year patterns like '2017' or '2017-18'
        year_match = re.search(r'(20\d{2})(?:\s*-\s*\d{2,4})?', line)
        if year_match:
            current_year = year_match.group(1)
            if current_year not in years_found:
                years_found[current_year] = []
        elif current_year:
            # Crop records typically appear under the year. Exclude digits and common structural words.
            clean_val = re.sub(r'[\d\.\,\-\:]', '', line).strip()
            if len(clean_val) > 2 and not any(k in line for k in ["एकूण", "जलसिंचित", "अजलसिंचित", "पोखरा"]):
                years_found[current_year].append(clean_val)

    # Reduce duplicates locally for crop history
    for y, crops in years_found.items():
        if crops:
            data['crop_history'][y] = list(set(crops))

    # 9. QR Reference Number
    # Look for explicit mention of QR code / reference
    qr_match = re.search(r'(?:QR|क्यूआर).*?(?:Ref|Code|No|क्र).*?([A-Za-z0-9]+)', text, re.IGNORECASE)
    if qr_match:
        data['qr_reference_number'] = qr_match.group(1).strip()

    return data

def save_json(data, output_path="satbara_output.json"):
    """
    Saves the extracted document details as a JSON file.
    """
    try:
        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f"Extraction successful! Data saved to '{output_path}'")
    except Exception as e:
        print(f"Error saving JSON file: {e}")

def main(pdf_path):
    print("=" * 50)
    print(f"Processing PDF: {pdf_path}")
    print("=" * 50)
    
    text = extract_text_from_pdf(pdf_path)
    
    if text:
        print("Extracting fields via Regex...")
        data = parse_satbara_details(text)
        
        # Save output to satbara_output.json
        save_json(data, "satbara_output.json")
        
        print("\n--- Extracted Data ---")
        print(json.dumps(data, ensure_ascii=False, indent=4))
    else:
        print("Failed to extract data.")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Extract fields from Maharashtra 7/12 (Satbara) PDF.")
    parser.add_argument("pdf_path", nargs="?", default="a.pdf", help="Path to the Satbara PDF file.")
    
    args = parser.parse_args()
    
    try:
        main(args.pdf_path)
    except FileNotFoundError as e:
        print(f"\n{e}")
        print("Usage: python satbara_extractor.py <path_to_pdf>")
    except Exception as e:
        print(f"\nAn unhandled error occurred: {e}")

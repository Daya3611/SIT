from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

app = FastAPI()


# -----------------------------------
# Input Schema
# -----------------------------------

class SoilInput(BaseModel):
    pH: float
    initial_moisture: float
    moisture_after_24hr: float
    electrical_conductivity: float
    nitrogen: float
    phosphorus: float
    potassium: float
    organic_carbon: float
    temperature: float


# -----------------------------------
# Soil Quality Score Logic
# -----------------------------------

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


# -----------------------------------
# Soil Texture Logic
# -----------------------------------

def detect_soil_texture(drainage_rate):

    if drainage_rate > 25:
        return "Sandy"
    elif drainage_rate < 10:
        return "Clayey"
    elif 10 <= drainage_rate <= 18:
        return "Loamy"
    else:
        return "Silty"


# -----------------------------------
# Soil Type Logic (Maharashtra)
# -----------------------------------

def detect_soil_type(pH, organic, ec):

    if pH > 7.5 and organic > 0.5:
        return "Black Soil"
    elif pH < 6.5 and ec > 0.6:
        return "Laterite Soil"
    elif 6.0 <= pH <= 7.0 and organic < 0.4:
        return "Red Soil"
    else:
        return "Alluvial Soil"


# -----------------------------------
# Soil Detection Endpoint
# -----------------------------------

@app.post("/soil")
def detect_soil(data: SoilInput):

    drainage_rate = data.initial_moisture - data.moisture_after_24hr

    soil_texture = detect_soil_texture(drainage_rate)
    soil_type = detect_soil_type(data.pH, data.organic_carbon, data.electrical_conductivity)

    quality_score = calculate_quality_score(
        data.pH,
        data.nitrogen,
        data.phosphorus,
        data.potassium,
        data.organic_carbon,
        data.electrical_conductivity,
        data.initial_moisture
    )

    return {
        "soil_texture": soil_texture,
        "soil_type": soil_type,
        "soil_quality_score": quality_score
    }


# -----------------------------------
# UI Route
# -----------------------------------

@app.get("/", response_class=HTMLResponse)
def soil_ui():

    return """
    <!DOCTYPE html>
    <html>
    <head>
        <title>Soil Detection System</title>
        <style>
            body { font-family: Arial; background: #f4f9f4; padding: 40px; }
            .box { background: white; padding: 20px; width: 500px;
                   border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
            input { width: 100%; padding: 8px; margin: 6px 0; }
            button { background: green; color: white; padding: 10px;
                     border: none; cursor: pointer; width: 100%; }
            .result { margin-top: 20px; padding: 15px; background: #e8f5e9;
                      border-radius: 8px; display:none; }
        </style>
    </head>
    <body>

    <h2>🌱 Soil Quality & Type Detection (IoT Simulation)</h2>

    <div class="box">

        <input id="pH" placeholder="pH" type="number" step="0.1">
        <input id="initial_moisture" placeholder="Initial Moisture" type="number">
        <input id="moisture_after_24hr" placeholder="Moisture After 24hr" type="number">
        <input id="electrical_conductivity" placeholder="Electrical Conductivity" type="number" step="0.1">
        <input id="nitrogen" placeholder="Nitrogen" type="number">
        <input id="phosphorus" placeholder="Phosphorus" type="number">
        <input id="potassium" placeholder="Potassium" type="number">
        <input id="organic_carbon" placeholder="Organic Carbon" type="number" step="0.1">
        <input id="temperature" placeholder="Temperature" type="number">

        <button onclick="checkSoil()">Analyze Soil</button>

        <div class="result" id="resultBox">
            <p><b>Soil Texture:</b> <span id="texture"></span></p>
            <p><b>Soil Type:</b> <span id="type"></span></p>
            <p><b>Soil Quality Score:</b> <span id="quality"></span></p>
        </div>

    </div>

    <script>
        async function checkSoil() {

            let initial = parseFloat(document.getElementById("initial_moisture").value);
            let after24 = parseFloat(document.getElementById("moisture_after_24hr").value);

            let data = {
                pH: parseFloat(document.getElementById("pH").value),
                initial_moisture: initial,
                moisture_after_24hr: after24,
                electrical_conductivity: parseFloat(document.getElementById("electrical_conductivity").value),
                nitrogen: parseFloat(document.getElementById("nitrogen").value),
                phosphorus: parseFloat(document.getElementById("phosphorus").value),
                potassium: parseFloat(document.getElementById("potassium").value),
                organic_carbon: parseFloat(document.getElementById("organic_carbon").value),
                temperature: parseFloat(document.getElementById("temperature").value)
            };

            let response = await fetch("soil", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            let result = await response.json();

            if (!result.soil_texture) {
                alert("Invalid input or server error. Check console.");
                console.log(result);
                return;
            }

            document.getElementById("texture").innerText = result.soil_texture;
            document.getElementById("type").innerText = result.soil_type;
            document.getElementById("quality").innerText = result.soil_quality_score + " / 100";

            document.getElementById("resultBox").style.display = "block";
        }
    </script>

    </body>
    </html>
    """
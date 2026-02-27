# AgriPayChain - Maneesh's Handover Document

## 1. Project Overview & Context
We are building **AgriPayChain**, an agricultural transaction and financial visibility infrastructure designed for production-grade scale.

**Core Philosophy:**
- **Blockchain:** Used *strictly* as an immutable integrity anchor storing hashes and event proofs—no raw data, no token economy, no speculative DeFi logic.
- **Data Storage:** A relational database (`Supabase`) serves as the single source of truth for all structured off-chain data and land records (secure document storage).
- **AI Microservices:** AI runs as a separate Python `FastAPI` layer evaluating risk (payment delays, shipment anomalies, soil health). 
- **Architecture:** The platform is entirely event-driven. A rigid state machine controls transitions, and critical events are hashed/anchored for transparency.

## 2. What We Brainstormed (The "Maneesh" Backend Roadmap)
Maneesh's module is responsible for the core Node.js backend and integration middleware. We have established a strict, 5-step implementation order. **Do not deviate from this order:**

### 🧱 Step 1: Supabase Schema (The Foundation)
Define the strict entity schemas first. Changing these later breaks everything.
- `FarmerProfile`
- `LandRecord` (includes `documentHash` and `blockchainRecordId`)
- `CropBatch`
- `MarketplaceListing`
- `PurchaseOrder` (includes `paymentConfirmationHash`)
- `Shipment`
- `Dispute`
- `BuyerReputation`
- `AIAnalysisResult`

### 🧱 Step 2: PurchaseOrder State Machine (The Backbone)
We must define and enforce exact allowed state transitions:
- `PendingPayment` → `Paid`
- `Paid` → `Shipped`
- `Shipped` → `Delivered`
- `Delivered` → `Closed`
- `Any` → `Disputed`
*All other transitions are forbidden.*

### 🧱 Step 3: Event Logging Layer
Create an internal event log table. Every state transition equals an event. This will feed the AI models, financial reporting, and blockchain anchors.

### 🧱 Step 4: AI Microservice Interfaces
Maneesh's backend needs to orchestrate calls to the Python API. 
*Note: Jyoti has already pushed the FastAPI code for this! Maneesh's backend just needs to connect to Jyoti's established endpoints.*

### 🧱 Step 5: Blockchain Anchoring Stub
Implement a basic stub for `generateHash(payload)` and `storeHashReference()`. Keep it abstract; do not deploy to mainnet yet.

## 3. Current State & Recent Pulls
- **Maneesh Directory:** Initialized with `package.json`. Ready for Node.js setup `(Express/Fastify + Supabase Client)`.
- **Jyoti Directory (Just Pulled):** Jyoti has pushed a massive update containing the AI microservice layer (`Jyoti/main.py`), including pre-trained models (`.pkl` files), SHAP explainability scripts, and synthetic datasets for payment delays and price anomalies. She also added several Marathi Mahabhulekh (7/12) PDF records for testing document integrity.
- **Dayanand Directory:** Contains OCR scripts (`ocr.py`, `satbara_extractor.py`) likely built to parse the 7/12 PDFs.

## 4. Next Steps for Antigravity (Working with Maneesh)
1. Initialize the Node.js project within `/Maneesh` and install necessary dependencies (`@supabase/supabase-js`, `express`, etc.).
2. Write the SQL migration scripts/schema definitions (Step 1) based on the specification above.
3. Implement the `PurchaseOrder` State Machine logic (Step 2) inside a dedicated controller.
4. Review Jyoti's `main.py` FastApi routes to ensure Maneesh's mock interface perfectly matches the expected inputs/outputs of the AI layer.

*Signed, Maneesh's AI Assistant.*

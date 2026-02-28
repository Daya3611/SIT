# DBT-Connect — Project Handover Document

**Date:** 27 February 2026  
**Prepared by:** Hriday  
**Project Location:** `c:\Users\Hrida\Downloads\SIT`

---

## 1. Project Overview

**DBT-Connect** is a web platform that provides an advisory board for loans and subsidies targeted at farmers. The platform aims to simplify access to government schemes, check eligibility, and track loan/subsidy status in one place.

---

## 2. Team Structure

| Folder | Member | Role |
|--------|--------|------|
| `Hriday/` | Hriday | Backend (Express.js) |
| `Pratham/` | Pratham | TBD |
| `Jyoti/` | Jyoti | TBD |
| `Maneesh/` | Maneesh | TBD |
| `Dayanand/` | Dayanand | TBD |

---

## 3. Current State of the Project

### ✅ Done
- Git repository initialized with team folders
- Basic Express.js backend (`Hriday/index.js`) running on port 3000
- CORS + JSON middleware configured
- `/api/land-records` route scaffolded (returns mock data)
- `package.json` and dependencies installed

### ❌ Not Started
- Frontend (zero HTML/CSS/JS pages built)
- Database integration
- Authentication system
- Real API data for loans/subsidies

---

## 4. Backend Details

**File:** `Hriday/index.js`  
**Framework:** Express.js  
**Port:** `3000` (configurable via `.env`)  
**Dependencies:** `express`, `cors`, `dotenv`

**Active Routes:**
| Route | Method | Status |
|-------|--------|--------|
| `/` | GET | Health check |
| `/api/land-records` | GET | Mock data only |

---

## 5. Planned Frontend Structure

| Page | Purpose |
|------|---------|
| **Home / Landing** | Hero section, platform intro, stats |
| **Loan Advisory** | Browse & filter loan schemes |
| **Subsidy Board** | Govt subsidies with eligibility info |
| **Eligibility Checker** | Step-form for farmers to check eligibility |
| **Dashboard** | Personal loan/subsidy tracker |
| **Login / Register** | Farmer authentication |
| **About / Contact** | Platform info |

---

## 6. Design System (Planned)

**Color Palette:**
- Primary: Deep forest green `#1a472a`
- Accent: Golden wheat `#f5a623`
- Background: Off-white `#f8f9f0`

**Typography:** Inter / Poppins (Google Fonts)  
**Style:** Glassmorphism cards, earthy tones, professional + approachable

---

## 7. Animation & Performance Strategy

**Tech Stack for Frontend Animations:**
- **GSAP + ScrollTrigger** — scroll-based 3D animations
- **Lenis.js** — smooth scrolling
- **Three.js** — optional, only for specific 3D hero elements

**Two Performance Modes:**

```js
const isLowEnd =
  navigator.hardwareConcurrency <= 4 ||
  navigator.deviceMemory <= 2 ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```

| Feature | Low-End Mode | High-End Mode |
|---------|-------------|---------------|
| Hero | Static image | Looping video |
| Animations | Simple fade-in | Full GSAP 3D scroll |
| Particles | Off | Enabled |
| Glassmorphism | Minimal | Full backdrop-filter |

---

## 8. Hero Video Plan

- Generate **4–5 images** using Gemini with prompt:
  > *"Aerial view of lush green Indian farmland at golden hour, cinematic wide angle, photorealistic"*
- Use **Google Flow** to convert image sequence into a slow pan/zoom `.mp4`
- Embed as `autoplay muted loop playsinline` video in hero section
- Static image fallback for low-end/mobile

---

## 9. Immediate Next Steps

1. [ ] Scaffold frontend folder inside `Hriday/` (or a shared `frontend/` folder)
2. [ ] Set up design system (CSS variables, fonts, base styles)
3. [ ] Build Landing Page with GSAP + performance detection
4. [ ] Generate hero image(s) from Gemini + create video via Flow
5. [ ] Connect backend routes to real data (land records, loan schemes)
6. [ ] Define roles for Pratham, Jyoti, Maneesh, Dayanand

---

## 10. How to Run Locally

```bash
cd Hriday
npm install
node index.js
# Server runs at http://localhost:3000
```

---

*For questions, contact Hriday or refer to the Git commit history.*

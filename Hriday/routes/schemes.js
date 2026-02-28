import express from 'express';
const router = express.Router();

// Real Indian Government Farmer Schemes — sourced from official government data
const SCHEMES = [
    {
        id: "pm-kisan",
        category: "Direct Benefit",
        title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        description: "Income support of ₹6,000 per year in three equal installments of ₹2,000 every four months, directly transferred to Aadhaar-seeded bank accounts via DBT.",
        eligibility: {
            landSize: "All landholding farmer families",
            maxHectares: null,
            type: ["General", "OBC", "SC", "ST"],
            exclusions: ["Institutional landholders", "Income tax payers", "Government employees", "Professionals (doctors, engineers, CAs)"]
        },
        benefits: ["Direct Bank Transfer", "₹6,000 Annual Credit", "No Land Size Limit", "Three ₹2,000 Installments"],
        provider: "Central Government",
        launchYear: 2019,
        budgetAllocation: "₹60,000 Cr (2024-25)",
        beneficiariesCount: "11.8 Crore Farmers"
    },
    {
        id: "kcc",
        category: "Credit & Loan",
        title: "Kisan Credit Card (KCC) Scheme",
        description: "Provides farmers with timely access to credit up to ₹3 lakh at 7% interest, with 2% subvention and 3% prompt repayment incentive, effectively bringing the rate down to 4% per annum.",
        eligibility: {
            landSize: "Any",
            tenantFarmers: true,
            sharecroppers: true,
            ageRange: "18-75 years",
            activities: ["Crop Cultivation", "Animal Husbandry", "Dairy", "Fisheries"]
        },
        benefits: ["Interest Subvention (2-3%)", "Effective 4% Interest Rate", "Flexible Repayment", "Insurance Cover", "No Collateral up to ₹1.60 Lakh", "ATM-cum-Credit Card"],
        provider: "Banking Sector",
        launchYear: 1998,
        budgetAllocation: "₹23,000 Cr Interest Subvention",
        beneficiariesCount: "7.5 Crore Active Cards"
    },
    {
        id: "pmfby",
        category: "Insurance",
        title: "PM Fasal Bima Yojana (Crop Insurance)",
        description: "Comprehensive crop insurance with low premium rates — 2% for Kharif, 1.5% for Rabi, 5% for commercial/horticultural crops. Covers yield loss, prevented sowing, post-harvest losses, and localized calamities.",
        eligibility: {
            landSize: "Any",
            notifiedCrops: true,
            tenantFarmers: true,
            voluntary: true
        },
        benefits: ["Low Premium (1.5-5%)", "Full Sum Insured", "Tech-based Claims", "Post-Harvest Coverage (14 days)", "Hailstorm & Inundation Cover"],
        provider: "Central Government",
        launchYear: 2016,
        budgetAllocation: "₹14,600 Cr (2024-25)",
        beneficiariesCount: "4 Crore Farmers Insured Annually"
    },
    {
        id: "smam",
        category: "Equipment",
        title: "Sub-Mission on Agricultural Mechanization (SMAM)",
        description: "Subsidies of 40-80% for purchasing farm machinery like tractors, rotavators, harvesters, and setting up Custom Hiring Centres (CHCs) and Farm Machinery Banks.",
        eligibility: {
            landSize: "Any",
            applicants: ["Individual Farmers", "SHGs", "FPOs", "Cooperative Societies"],
            priority: "SC/ST, Women, Small & Marginal Farmers get 50% subsidy; others 40%"
        },
        benefits: ["40-80% Subsidy", "Custom Hiring Centers", "Farm Machinery Banks", "Modern Tech Access", "Higher Subsidy for SC/ST & Women"],
        provider: "Central Government",
        launchYear: 2014,
        budgetAllocation: "₹1,100 Cr (2024-25)",
        beneficiariesCount: "5.6 Lakh Farmers"
    },
    {
        id: "soil-health-card",
        category: "Soil Health",
        title: "Soil Health Card Scheme",
        description: "Provides detailed soil nutrient status reports every 3 years, enabling farmers to optimize fertilizer use, improve soil fertility, and increase crop yields while reducing costs.",
        eligibility: {
            landSize: "Any",
            allFarmers: true,
            frequency: "Every 3 years"
        },
        benefits: ["Free Soil Testing", "Nutrient Dosage Recommendations", "Improved Crop Yield", "Reduced Fertilizer Costs", "pH & Organic Content Analysis"],
        provider: "Central Government",
        launchYear: 2015,
        budgetAllocation: "Merged under RKVY (Soil Health & Fertility)",
        beneficiariesCount: "24.74 Crore Cards Generated"
    },
    {
        id: "pkvy",
        category: "Organic",
        title: "Paramparagat Krishi Vikas Yojana (PKVY) — Organic Farming",
        description: "Promotes organic farming through cluster-based approach. Farmers receive ₹31,500 per hectare over 3 years for transitioning to chemical-free, organic agriculture with eco-friendly technologies.",
        eligibility: {
            landSize: "Up to 2 hectares",
            clusterBased: true,
            applicants: ["Individual Farmers", "Farmer Groups", "Institutions"]
        },
        benefits: ["₹31,500/ha over 3 Years", "Cluster-Based Approach", "Organic Certification", "Direct Market Access via Jaivik Kheti Portal", "Chemical-Free Produce"],
        provider: "Central Government (under NMSA)",
        launchYear: 2015,
        budgetAllocation: "₹1,584 Cr (Total Allocation)",
        beneficiariesCount: "25.30 Lakh Farmers, 52,000+ Clusters"
    },
    {
        id: "enam",
        category: "Market Access",
        title: "e-NAM (National Agriculture Market)",
        description: "Pan-India electronic trading portal connecting 1389+ APMC mandis for transparent online bidding and price discovery. Enables direct farmer-to-buyer transactions, reducing middlemen.",
        eligibility: {
            landSize: "Any",
            allFarmers: true,
            registration: "Free via APMC linked mandis"
        },
        benefits: ["Online Transparent Bidding", "Better Price Discovery", "Reduced Middlemen", "e-Payment to Bank Account", "1389+ Mandis Connected"],
        provider: "Central Government (SFAC)",
        launchYear: 2016,
        budgetAllocation: "₹600 Cr (Phase I & II)",
        beneficiariesCount: "1.77 Crore Farmers, 2.53 Lakh Traders"
    },
    {
        id: "pm-kisan-maandhan",
        category: "Direct Benefit",
        title: "PM-Kisan Maandhan Yojana (Pension Scheme)",
        description: "Voluntary contributory pension scheme for small & marginal farmers. Monthly contribution of ₹55-200 (age-based) with equal government contribution, providing ₹3,000/month pension after age 60.",
        eligibility: {
            landSize: "Up to 2 hectares",
            ageRange: "18-40 years",
            type: ["Small Farmer", "Marginal Farmer"]
        },
        benefits: ["₹3,000/month Pension After 60", "Government Matches Contribution", "Low Monthly Premium (₹55-200)", "Family Pension Provision"],
        provider: "Central Government",
        launchYear: 2019,
        budgetAllocation: "₹900 Cr (2024-25)",
        beneficiariesCount: "23.38 Lakh Enrolled"
    },
    {
        id: "rkvy",
        category: "Direct Benefit",
        title: "Rashtriya Krishi Vikas Yojana (RKVY-RAFTAAR)",
        description: "Provides states with flexibility to plan agriculture development programs based on local needs. Focuses on agri-entrepreneurship, innovation, and infrastructure with 60:40 Centre-State funding.",
        eligibility: {
            landSize: "Any",
            applicants: ["State Governments", "Agri Start-ups", "FPOs", "Individual Farmers"],
            focus: "Post-harvest infrastructure, value addition, agri-business"
        },
        benefits: ["Flexible State-Level Planning", "Agri Start-up Incubation", "Post-Harvest Infrastructure", "60:40 Centre-State Funding"],
        provider: "Central Government",
        launchYear: 2007,
        budgetAllocation: "₹7,150 Cr (RKVY-RAFTAAR)",
        beneficiariesCount: "All States & UTs"
    },
    {
        id: "nfsm",
        category: "Direct Benefit",
        title: "National Food Security Mission (NFSM)",
        description: "Focuses on increasing production and productivity of Rice, Wheat, Pulses, Coarse Cereals, Nutri-Cereals, and Commercial Crops through area expansion and technology dissemination.",
        eligibility: {
            landSize: "Any",
            targetCrops: ["Rice", "Wheat", "Pulses", "Coarse Cereals", "Nutri-Cereals", "Cotton", "Jute", "Sugarcane"],
            targetDistricts: true
        },
        benefits: ["Seed Distribution Subsidy", "Farm Machinery Subsidy", "Demonstration Plots", "Technology Transfer", "Improved Seed Varieties"],
        provider: "Central Government",
        launchYear: 2007,
        budgetAllocation: "₹3,198 Cr (2024-25)",
        beneficiariesCount: "Covers 644 Districts Across India"
    },
    {
        id: "mif",
        category: "Equipment",
        title: "Micro Irrigation Fund (MIF)",
        description: "₹10,000 Crore corpus fund under NABARD for promoting drip and sprinkler irrigation. States can access loans at subsidized rates to expand micro-irrigation coverage.",
        eligibility: {
            landSize: "Any",
            applicants: ["State Governments", "Individual Farmers (via state)"],
            irrigationType: ["Drip", "Sprinkler", "Rain-Gun"]
        },
        benefits: ["Subsidized Irrigation Equipment", "Water Savings (30-70%)", "Higher Crop Yield", "Reduced Fertilizer Wastage", "NABARD Backed Loans"],
        provider: "NABARD / Central Government",
        launchYear: 2018,
        budgetAllocation: "₹10,000 Cr Corpus",
        beneficiariesCount: "1.42 Crore Hectares Covered"
    },
    {
        id: "pm-kusum",
        category: "Solar & Energy",
        title: "PM-KUSUM (Kisan Urja Suraksha Evam Utthan Mahabhiyan)",
        description: "Promotes solar energy in agriculture — standalone solar pumps (up to 7.5 HP), solarization of grid-connected pumps, and solar power plants on barren/fallow land with 60% subsidy.",
        eligibility: {
            landSize: "Any",
            applicants: ["Individual Farmers", "Farmer Groups", "FPOs", "Water User Associations"],
            components: ["Component A: Solar Power Plant", "Component B: Standalone Solar Pump", "Component C: Grid-Connected Solar Pump"]
        },
        benefits: ["60% Subsidy on Solar Pumps", "Extra Income from Solar Power Sale", "Reduced Diesel & Electricity Costs", "Up to 7.5 HP Solar Pump", "25 Years Equipment Life"],
        provider: "Central Government (MNRE)",
        launchYear: 2019,
        budgetAllocation: "₹34,422 Cr (Total Scheme Outlay)",
        beneficiariesCount: "35 Lakh Farmers Targeted"
    },
    {
        id: "agri-clinics",
        category: "Credit & Loan",
        title: "Agri-Clinics & Agri-Business Centres (ACABC)",
        description: "Provides subsidized credit and training to agriculture graduates to set up agri-ventures offering soil testing, crop advisory, farm management, and market linkage services.",
        eligibility: {
            qualification: "Agriculture Graduate / Diploma",
            ageRange: "No age limit",
            training: "2-month residential training (free)"
        },
        benefits: ["Free 2-Month Training", "36% Back-Ended Subsidy on Bank Loan", "44% Subsidy for SC/ST/Women/NE", "Loan up to ₹20 Lakh (Individual)", "Loan up to ₹1 Cr (Group of 5+)"],
        provider: "Central Government (MANAGE/NABARD)",
        launchYear: 2002,
        budgetAllocation: "₹2,691 Cr (Loans Disbursed)",
        beneficiariesCount: "71,000+ Trained, 31,000+ Ventures Established"
    },
    {
        id: "nlm",
        category: "Equipment",
        title: "National Livestock Mission (NLM)",
        description: "Supports entrepreneurship development in livestock sector — poultry, sheep, goat, pig, and feed/fodder. Provides subsidies for establishing livestock farms and breed improvement.",
        eligibility: {
            landSize: "Any",
            applicants: ["Individual Farmers", "Entrepreneurs", "SHGs", "FPOs", "Section 8 Companies"],
            sectors: ["Poultry", "Sheep & Goat", "Piggery", "Feed & Fodder"]
        },
        benefits: ["50% Capital Subsidy", "Breed Improvement Programs", "Feed & Fodder Development", "Insurance Coverage", "Skill Development Training"],
        provider: "Central Government (DAHD)",
        launchYear: 2014,
        budgetAllocation: "₹2,800 Cr (2024-25)",
        beneficiariesCount: "15 Lakh+ Beneficiaries"
    },
    {
        id: "interest-subvention",
        category: "Credit & Loan",
        title: "Interest Subvention Scheme (ISS) for Agriculture",
        description: "Short-term crop loans up to ₹3 lakh at 7% interest with 2% subvention by GoI. Additional 3% incentive for prompt repayment, making effective rate just 4% per annum.",
        eligibility: {
            landSize: "Any",
            loanLimit: "Up to ₹3 Lakh",
            via: "Scheduled Commercial Banks, RRBs, Cooperative Banks"
        },
        benefits: ["Effective 4% Interest Rate", "2% Government Subvention", "3% Prompt Repayment Bonus", "Available at All Major Banks", "Post-Harvest Loans Included"],
        provider: "Central Government (RBI/NABARD)",
        launchYear: 2006,
        budgetAllocation: "₹22,000 Cr (2024-25)",
        beneficiariesCount: "Covers All Short-Term Crop Loans"
    }
];

// GET: Fetch all active schemes
router.get('/', (req, res) => {
    res.json({
        success: true,
        count: SCHEMES.length,
        data: SCHEMES
    });
});

// GET: Fetch single scheme by ID
router.get('/:id', (req, res) => {
    const scheme = SCHEMES.find(s => s.id === req.params.id);
    if (!scheme) {
        return res.status(404).json({ success: false, message: 'Scheme not found' });
    }
    res.json({ success: true, data: scheme });
});

// POST: Filter schemes based on farmer profile
router.post('/match', (req, res) => {
    const { landSize, cropType, region, category } = req.body;
    
    const recommendations = SCHEMES.filter(scheme => {
        if (category && scheme.category !== category) return false;
        if (landSize <= 2 && scheme.id === 'pm-kisan') return true;
        if (landSize <= 2 && scheme.id === 'pm-kisan-maandhan') return true;
        if (scheme.id === 'kcc') return true;
        if (scheme.id === 'pmfby') return true;
        if (scheme.id === 'interest-subvention') return true;
        if (scheme.id === 'soil-health-card') return true;
        if (scheme.id === 'enam') return true;
        return false;
    });

    res.json({
        success: true,
        matchCount: recommendations.length,
        recommendations
    });
});

export default router;

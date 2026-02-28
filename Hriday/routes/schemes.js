import express from 'express';
const router = express.Router();

// Mock data for schemes
const SCHEMES = [
    {
        id: "pm-kisan",
        category: "Direct Benefit",
        title: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        description: "Income support of ₹6,000 per year in three equal installments to all landholding farmer families.",
        eligibility: {
            landSize: "Small-Marginal",
            maxHectares: 2,
            type: ["General", "OBC", "SC", "ST"]
        },
        benefits: ["Direct Bank Transfer", "₹6,000 Annual Credit"],
        provider: "Central Government"
    },
    {
        id: "kcc",
        category: "Credit & Loan",
        title: "Kisan Credit Card (KCC) Scheme",
        description: "Provides farmers with timely access to credit for cultivation and other needs at low interest rates.",
        eligibility: {
            landSize: "Any",
            tenantFarmers: true,
            sharecroppers: true
        },
        benefits: ["Interest Subvention (2-3%)", "Flexible Repayment", "Insurance Cover"],
        provider: "Banking Sector"
    },
    {
        id: "pmfby",
        category: "Insurance",
        title: "PM Fasal Bima Yojana (Crop Insurance)",
        description: "Comprehensive insurance cover against failure of crops, helping in stabilizing the income of farmers.",
        eligibility: {
            landSize: "Any",
            notifiedCrops: true
        },
        benefits: ["Low Premium", "Full Sum Insured", "Tech-based Claims"],
        provider: "Central Government"
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
    const { landSize, cropType, region } = req.body;
    
    const recommendations = SCHEMES.filter(scheme => {
        if (landSize <= 2 && scheme.id === 'pm-kisan') return true;
        if (scheme.id === 'kcc') return true;
        return false;
    });

    res.json({
        success: true,
        matchCount: recommendations.length,
        recommendations
    });
});

export default router;

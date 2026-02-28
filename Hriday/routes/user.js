import express from 'express';
const router = express.Router();

let users = [
    {
        userId: "FARMER-8821",
        name: "Rajesh Kumar",
        email: "rajesh.kumar@example.com",
        phone: "+91 98765 43210",
        village: "Karnal",
        district: "Karnal",
        state: "Haryana",
        landSize: 1.5,
        crops: ["Wheat", "Mustard"],
        soilType: "Alluvial",
        irrigationSource: "Tubewell",
        documents: [
            { type: "Aadhar", status: "Verified", id: "XXXX-XXXX-1234" },
            { type: "Land Record", status: "Verified", id: "Khasra-772/4" },
            { type: "Bank Account", status: "Linked", id: "SBI-XXXXX5421" }
        ],
        kycStatus: "Completed",
        activeSchemes: ["pm-kisan", "kcc"],
        annualIncome: "₹3,20,000"
    },
    {
        userId: "FARMER-4412",
        name: "Sunita Devi",
        email: "sunita.devi@example.com",
        phone: "+91 94321 67890",
        village: "Barabanki",
        district: "Barabanki",
        state: "Uttar Pradesh",
        landSize: 0.8,
        crops: ["Rice", "Lentils", "Peas"],
        soilType: "Clay Loam",
        irrigationSource: "Canal",
        documents: [
            { type: "Aadhar", status: "Verified", id: "XXXX-XXXX-5678" },
            { type: "Land Record", status: "Verified", id: "Lot-223/B" },
            { type: "Bank Account", status: "Linked", id: "PNB-XXXXX9871" }
        ],
        kycStatus: "Completed",
        activeSchemes: ["pm-kisan", "pmfby", "pkvy"],
        annualIncome: "₹1,85,000"
    },
    {
        userId: "FARMER-7763",
        name: "Mahesh Patil",
        email: "mahesh.patil@example.com",
        phone: "+91 87654 12390",
        village: "Nashik Rural",
        district: "Nashik",
        state: "Maharashtra",
        landSize: 3.2,
        crops: ["Grapes", "Onion", "Sugarcane"],
        soilType: "Black Cotton",
        irrigationSource: "Drip Irrigation",
        documents: [
            { type: "Aadhar", status: "Verified", id: "XXXX-XXXX-9012" },
            { type: "Land Record", status: "Verified", id: "Survey-445/1A" },
            { type: "Bank Account", status: "Linked", id: "BOI-XXXXX3367" }
        ],
        kycStatus: "Completed",
        activeSchemes: ["kcc", "pmfby", "enam"],
        annualIncome: "₹7,45,000"
    },
    {
        userId: "FARMER-3318",
        name: "Gurpreet Singh",
        email: "gurpreet.singh@example.com",
        phone: "+91 99876 54321",
        village: "Ludhiana Rural",
        district: "Ludhiana",
        state: "Punjab",
        landSize: 5.0,
        crops: ["Wheat", "Rice", "Potato"],
        soilType: "Sandy Loam",
        irrigationSource: "Tubewell + Solar Pump",
        documents: [
            { type: "Aadhar", status: "Verified", id: "XXXX-XXXX-3456" },
            { type: "Land Record", status: "Verified", id: "Khasra-1102/7" },
            { type: "Bank Account", status: "Linked", id: "HDFC-XXXXX8812" }
        ],
        kycStatus: "Completed",
        activeSchemes: ["kcc", "pmfby", "smam", "pm-kusum"],
        annualIncome: "₹11,20,000"
    },
    {
        userId: "FARMER-5590",
        name: "Lakshmi Narasimhan",
        email: "lakshmi.nara@example.com",
        phone: "+91 80123 45678",
        village: "Thanjavur",
        district: "Thanjavur",
        state: "Tamil Nadu",
        landSize: 1.2,
        crops: ["Rice", "Banana", "Coconut"],
        soilType: "Red Laterite",
        irrigationSource: "Canal + Borewell",
        documents: [
            { type: "Aadhar", status: "Verified", id: "XXXX-XXXX-7890" },
            { type: "Land Record", status: "Verified", id: "Patta-338/2C" },
            { type: "Bank Account", status: "Linked", id: "IOB-XXXXX6643" }
        ],
        kycStatus: "Completed",
        activeSchemes: ["pm-kisan", "soil-health-card", "nfsm"],
        annualIncome: "₹2,56,000"
    },
    {
        userId: "FARMER-6674",
        name: "Ramesh Baria",
        email: "ramesh.baria@example.com",
        phone: "+91 76543 21098",
        village: "Dahod",
        district: "Dahod",
        state: "Gujarat",
        landSize: 0.5,
        crops: ["Maize", "Tur Dal", "Castor"],
        soilType: "Medium Black",
        irrigationSource: "Rainfed",
        documents: [
            { type: "Aadhar", status: "Verified", id: "XXXX-XXXX-2345" },
            { type: "Land Record", status: "Uploaded", id: "RoR-567/3" },
            { type: "Bank Account", status: "Linked", id: "BOB-XXXXX2290" }
        ],
        kycStatus: "Completed",
        activeSchemes: ["pm-kisan", "pm-kisan-maandhan", "pkvy"],
        annualIncome: "₹1,10,000"
    },
    {
        userId: "FARMER-2201",
        name: "Anita Kumari",
        email: "anita.kumari@example.com",
        phone: "+91 91234 56780",
        village: "Samastipur",
        district: "Samastipur",
        state: "Bihar",
        landSize: 0.3,
        crops: ["Rice", "Wheat", "Vegetables"],
        soilType: "Alluvial (Gangetic)",
        irrigationSource: "Tubewell (Shared)",
        documents: [
            { type: "Aadhar", status: "Verified", id: "XXXX-XXXX-6789" },
            { type: "Land Record", status: "Pending Digitization", id: "Khata-89/1" },
            { type: "Bank Account", status: "Linked", id: "CBI-XXXXX1187" }
        ],
        kycStatus: "Pending Land Verification",
        activeSchemes: ["pm-kisan"],
        annualIncome: "₹78,000"
    },
    {
        userId: "FARMER-9945",
        name: "Devendra Joshi",
        email: "devendra.joshi@example.com",
        phone: "+91 85432 10987",
        village: "Udaipur Rural",
        district: "Udaipur",
        state: "Rajasthan",
        landSize: 2.0,
        crops: ["Soybean", "Wheat", "Cumin", "Garlic"],
        soilType: "Arid Sandy",
        irrigationSource: "Drip + Rainwater Harvesting",
        documents: [
            { type: "Aadhar", status: "Verified", id: "XXXX-XXXX-0123" },
            { type: "Land Record", status: "Verified", id: "Girdawari-1045/A" },
            { type: "Bank Account", status: "Linked", id: "UCO-XXXXX7734" }
        ],
        kycStatus: "Completed",
        activeSchemes: ["kcc", "pm-kisan", "pm-kusum", "mif"],
        annualIncome: "₹4,80,000"
    }
];

router.get('/profile/:id', (req, res) => {
    const user = users.find(u => u.userId === req.params.id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
});

// GET: All farmers list
router.get('/all', (req, res) => {
    res.json({ success: true, count: users.length, data: users });
});

router.post('/profile', (req, res) => {
    const { userId, name, landSize, crops } = req.body;

    let userIndex = users.findIndex(u => u.userId === userId);

    if (userIndex === -1) {
        const newUser = {
            userId: userId || `FARMER-${Math.floor(Math.random() * 9000) + 1000}`,
            name,
            landSize,
            crops: crops || [],
            kycStatus: "Pending"
        };
        users.push(newUser);
        return res.status(201).json({ success: true, data: newUser });
    }

    users[userIndex] = { ...users[userIndex], ...req.body };
    res.json({ success: true, data: users[userIndex] });
});

export default router;

import express from 'express';
const router = express.Router();

let users = [
    {
        userId: "FARMER-8821",
        name: "Rajesh Kumar",
        email: "rajesh.kumar@example.com",
        phone: "+91 98765 43210",
        village: "Karnal",
        district: "Haryana",
        landSize: 1.5,
        crops: ["Wheat", "Mustard"],
        documents: [
            { type: "Aadhar", status: "Verified", id: "XXXX-XXXX-1234" },
            { type: "Land Record", status: "Uploaded", id: "Lot-772" }
        ],
        kycStatus: "Completed"
    }
];

router.get('/profile/:id', (req, res) => {
    const user = users.find(u => u.userId === req.params.id);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
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

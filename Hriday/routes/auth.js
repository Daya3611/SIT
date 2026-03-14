import express from 'express';
const router = express.Router();

// In-memory user store with pre-seeded farmers
let registeredUsers = [
    {
        userId: "FARMER-8821",
        name: "Rajesh Kumar",
        email: "rajesh@example.com",
        password: "farmer123",
        role: "farmer",
        phone: "+91 98765 43210",
        village: "Karnal",
        district: "Karnal",
        state: "Haryana",
        landSize: 1.5,
        crops: ["Wheat", "Mustard"],
        kycStatus: "Completed",
        createdAt: "2025-06-15T10:00:00.000Z"
    },
    {
        userId: "FARMER-4412",
        name: "Sunita Devi",
        email: "sunita@example.com",
        password: "farmer123",
        role: "farmer",
        phone: "+91 94321 67890",
        village: "Barabanki",
        district: "Barabanki",
        state: "Uttar Pradesh",
        landSize: 0.8,
        crops: ["Rice", "Lentils", "Peas"],
        kycStatus: "Completed",
        createdAt: "2025-08-20T09:30:00.000Z"
    },
    {
        userId: "BUYER-1001",
        name: "Vikram Traders",
        email: "vikram@example.com",
        password: "buyer123",
        role: "buyer",
        phone: "+91 99887 76655",
        businessName: "Vikram Agri Traders",
        businessType: "Wholesale Grain Dealer",
        district: "Azadpur Mandi",
        state: "Delhi",
        gstNumber: "07AABCU9603R1ZM",
        createdAt: "2025-09-10T11:00:00.000Z"
    },
    {
        userId: "BUYER-1002",
        name: "Priya Organics",
        email: "priya@example.com",
        password: "buyer123",
        role: "buyer",
        phone: "+91 88776 55443",
        businessName: "Priya Organic Foods Pvt. Ltd.",
        businessType: "Organic Food Retailer",
        district: "Pune",
        state: "Maharashtra",
        gstNumber: "27AADCP5678Q1Z5",
        createdAt: "2025-10-05T14:00:00.000Z"
    },
    {
        userId: "FARMER-9999",
        name: "Rajesh (Test)",
        email: "rajesh@gmail.com",
        password: "1234",
        role: "farmer",
        phone: "+91 00000 00000",
        village: "Test Village",
        district: "Test District",
        state: "Test State",
        landSize: 2.0,
        crops: ["Test Crop"],
        kycStatus: "Completed",
        createdAt: new Date().toISOString()
    }
];

// Simple token generation (base64 of userId — demo only)
function generateToken(userId) {
    return Buffer.from(`${userId}:${Date.now()}`).toString('base64');
}

// Token-to-user map for session tracking
const activeSessions = new Map();

// POST: Register
router.post('/register', (req, res) => {
    const { name, email, password, role, phone, village, district, state, businessName, businessType } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ success: false, message: 'Name, email, password, and role are required.' });
    }

    if (!['farmer', 'buyer'].includes(role)) {
        return res.status(400).json({ success: false, message: 'Role must be either "farmer" or "buyer".' });
    }

    const existingUser = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
        return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    const prefix = role === 'farmer' ? 'FARMER' : 'BUYER';
    const userId = `${prefix}-${Math.floor(Math.random() * 9000) + 1000}`;

    const newUser = {
        userId,
        name,
        email: email.toLowerCase(),
        password,
        role,
        phone: phone || "",
        ...(role === 'farmer' ? {
            village: village || "",
            district: district || "",
            state: state || "",
            landSize: 0,
            crops: [],
            kycStatus: "Pending"
        } : {
            businessName: businessName || "",
            businessType: businessType || "",
            district: district || "",
            state: state || "",
            gstNumber: ""
        }),
        createdAt: new Date().toISOString()
    };

    registeredUsers.push({
        userId: "FARMER-9999",
        name: "Rajesh (Test)",
        email: "rajesh@gmail.com",
        password: "1234",
        role: "farmer",
        phone: "+91 00000 00000",
        village: "Test Village",
        district: "Test District",
        state: "Test State",
        landSize: 2.0,
        crops: ["Test Crop"],
        kycStatus: "Completed",
        createdAt: new Date().toISOString()
    });

    registeredUsers.push(newUser);

    const token = generateToken(userId);
    activeSessions.set(token, userId);

    const { password: _, ...safeUser } = newUser;
    res.status(201).json({
        success: true,
        message: 'Registration successful!',
        data: { user: safeUser, token }
    });
});

// POST: Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const user = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = generateToken(user.userId);
    activeSessions.set(token, user.userId);

    const { password: _, ...safeUser } = user;
    res.json({
        success: true,
        message: 'Login successful!',
        data: { user: safeUser, token }
    });
});

// GET: Get current user from token
router.get('/me', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const userId = activeSessions.get(token);
    if (!userId) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token.' });
    }

    const user = registeredUsers.find(u => u.userId === userId);
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const { password: _, ...safeUser } = user;
    res.json({ success: true, data: safeUser });
});

// POST: Logout
router.post('/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        activeSessions.delete(token);
    }
    res.json({ success: true, message: 'Logged out successfully.' });
});

export default router;

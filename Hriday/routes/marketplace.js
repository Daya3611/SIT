import express from 'express';
const router = express.Router();

let products = [
    {
        id: "prod-1",
        name: "HD-2967 Premium Wheat Seeds",
        price: 1250,
        unit: "bag (40kg)",
        category: "Seeds",
        stock: 45,
        rating: 4.8,
        seller: "IARI Seed Division",
        origin: "Pusa, New Delhi",
        certifiedBy: "NSC",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: "prod-2",
        name: "Organic Neem-Based Fertilizer",
        price: 850,
        unit: "can (20L)",
        category: "Fertilizer",
        stock: 120,
        rating: 4.5,
        seller: "GreenGrow Organics Pvt. Ltd.",
        origin: "Indore, MP",
        certifiedBy: "FCO Certified",
        image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: "prod-3",
        name: "Pusa Basmati-1509 Rice Seeds",
        price: 2200,
        unit: "bag (25kg)",
        category: "Seeds",
        stock: 32,
        rating: 4.9,
        seller: "National Seeds Corporation",
        origin: "Karnal, Haryana",
        certifiedBy: "IARI",
        image: "https://images.unsplash.com/photo-1536304993881-460e4e0a0e9d?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: "prod-4",
        name: "DAP (Di-Ammonium Phosphate) 50kg",
        price: 1350,
        unit: "bag (50kg)",
        category: "Fertilizer",
        stock: 200,
        rating: 4.6,
        seller: "IFFCO",
        origin: "Phulpur, UP",
        certifiedBy: "Government Controlled Price",
        image: "https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: "prod-5",
        name: "Chlorpyrifos 20% EC Pesticide",
        price: 480,
        unit: "bottle (1L)",
        category: "Pesticide",
        stock: 75,
        rating: 4.3,
        seller: "Dhanuka Agritech",
        origin: "Gurugram, Haryana",
        certifiedBy: "CIB&RC Registered",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: "prod-6",
        name: "Hand-Operated Seed Drill",
        price: 3500,
        unit: "piece",
        category: "Tools",
        stock: 18,
        rating: 4.4,
        seller: "Jain Irrigation Systems",
        origin: "Jalgaon, Maharashtra",
        certifiedBy: "BIS Certified",
        image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: "prod-7",
        name: "16mm Inline Drip Lateral Pipe (500m)",
        price: 6200,
        unit: "roll (500m)",
        category: "Irrigation",
        stock: 25,
        rating: 4.7,
        seller: "Netafim India",
        origin: "Vadodara, Gujarat",
        certifiedBy: "ISO 9261",
        image: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: "prod-8",
        name: "Urea (Neem Coated) 45kg",
        price: 267,
        unit: "bag (45kg)",
        category: "Fertilizer",
        stock: 500,
        rating: 4.5,
        seller: "KRIBHCO",
        origin: "Surat, Gujarat",
        certifiedBy: "Government Controlled Price",
        image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: "prod-9",
        name: "Solar Water Pump 5HP DC Submersible",
        price: 185000,
        unit: "unit (with panels)",
        category: "Solar",
        stock: 8,
        rating: 4.8,
        seller: "Tata Power Solar",
        origin: "Bengaluru, Karnataka",
        certifiedBy: "MNRE Approved",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: "prod-10",
        name: "Multi-Crop Thresher (Tractor Mounted)",
        price: 95000,
        unit: "machine",
        category: "Machinery",
        stock: 5,
        rating: 4.6,
        seller: "Mahindra Farm Equipment",
        origin: "Nagpur, Maharashtra",
        certifiedBy: "CSIR-CMERI Tested",
        image: "https://images.unsplash.com/photo-1530836176759-510f58baebf4?auto=format&fit=crop&q=80&w=400"
    }
];

router.get('/products', (req, res) => {
    const { category } = req.query;
    let filtered = products;
    if (category) {
        filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    res.json({ success: true, count: filtered.length, data: filtered });
});

router.post('/order', (req, res) => {
    const { productId, quantity, buyerId } = req.body;

    if (!productId || !quantity) {
        return res.status(400).json({ success: false, message: 'Missing order details' });
    }

    const product = products.find(p => p.id === productId);
    if (!product || product.stock < quantity) {
        return res.status(400).json({ success: false, message: 'Product unavailable or out of stock' });
    }

    product.stock -= quantity;

    res.json({
        success: true,
        message: 'Order placed successfully',
        order: {
            orderId: `ORD-${Math.floor(Math.random() * 90000) + 10000}`,
            total: product.price * quantity,
            status: 'Pending Verification'
        }
    });
});

export default router;

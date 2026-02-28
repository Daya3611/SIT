import express from 'express';
const router = express.Router();

let products = [
    {
        id: "prod-1",
        name: "Premium Wheat Seeds",
        price: 1200,
        unit: "bag (50kg)",
        category: "Seeds",
        stock: 45,
        rating: 4.8,
        seller: "AgriSeed Corp",
        image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: "prod-2",
        name: "Organic Nitrogen Fertilizer",
        price: 850,
        unit: "can (20L)",
        category: "Fertilizer",
        stock: 120,
        rating: 4.5,
        seller: "GreenGrow Ltd",
        image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=400"
    }
];

router.get('/products', (req, res) => {
    res.json({ success: true, count: products.length, data: products });
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

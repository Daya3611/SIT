import express from 'express';
const router = express.Router();

// Mock data handler
router.get('/', (req, res) => {
    res.json({
        success: true,
        data: {
            message: "Land records endpoint"
        }
    });
});

export default router;

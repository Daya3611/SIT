const express = require('express');
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

module.exports = router;

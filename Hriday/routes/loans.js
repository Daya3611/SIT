import express from 'express';
const router = express.Router();

let applications = [
    {
        applicationId: "APP-KCC-102",
        farmerId: "FARMER-8821",
        schemeId: "kcc",
        status: "Submitted",
        dateApplied: new Date().toISOString(),
        bankName: "State Bank of India",
        documents: ["aadhar.pdf", "land_record.jpg"],
        timeline: [
            { step: "Applied", status: "Completed", date: "2026-02-28" },
            { step: "KYC Check", status: "Pending", date: null }
        ]
    }
];

router.get('/farmer/:farmerId', (req, res) => {
    const farmerApps = applications.filter(app => app.farmerId === req.params.farmerId);
    res.json({ success: true, count: farmerApps.length, data: farmerApps });
});

router.post('/apply', (req, res) => {
    const { farmerId, schemeId, bankName, documents } = req.body;

    if (!farmerId || !schemeId) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newApp = {
        applicationId: `APP-${Math.floor(Math.random() * 90000) + 10000}`,
        farmerId,
        schemeId,
        status: "Submitted",
        dateApplied: new Date().toISOString(),
        bankName: bankName || "Pending",
        documents: documents || [],
        timeline: [
            { step: "Applied", status: "Completed", date: new Date().toISOString().split('T')[0] },
            { step: "Review", status: "Pending", date: null }
        ]
    };

    applications.push(newApp);
    res.status(201).json({ success: true, message: 'Application submitted successfully', data: newApp });
});

router.patch('/:id/status', (req, res) => {
    const { status, stepUpdate } = req.body;
    const appIndex = applications.findIndex(app => app.applicationId === req.params.id);

    if (appIndex === -1) {
        return res.status(404).json({ success: false, message: 'Application not found' });
    }

    applications[appIndex].status = status;
    if (stepUpdate) {
        applications[appIndex].timeline.push(stepUpdate);
    }

    res.json({ success: true, data: applications[appIndex] });
});

export default router;

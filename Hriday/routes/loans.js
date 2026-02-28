import express from 'express';
const router = express.Router();

let applications = [
    {
        applicationId: "APP-KCC-102",
        farmerId: "FARMER-8821",
        farmerName: "Rajesh Kumar",
        schemeId: "kcc",
        schemeName: "Kisan Credit Card",
        status: "Approved",
        dateApplied: "2026-01-15T10:30:00.000Z",
        bankName: "State Bank of India",
        branchCode: "SBI-KRN-0041",
        loanAmount: "₹2,50,000",
        interestRate: "4%",
        documents: ["aadhar.pdf", "land_record.jpg", "bank_passbook.pdf"],
        timeline: [
            { step: "Applied", status: "Completed", date: "2026-01-15" },
            { step: "KYC Verification", status: "Completed", date: "2026-01-18" },
            { step: "Land Record Verification", status: "Completed", date: "2026-01-22" },
            { step: "Credit Assessment", status: "Completed", date: "2026-01-25" },
            { step: "Sanctioned", status: "Completed", date: "2026-01-28" },
            { step: "Disbursement", status: "Completed", date: "2026-02-01" }
        ]
    },
    {
        applicationId: "APP-PMKISAN-205",
        farmerId: "FARMER-4412",
        farmerName: "Sunita Devi",
        schemeId: "pm-kisan",
        schemeName: "PM-KISAN",
        status: "Disbursed",
        dateApplied: "2025-11-10T09:00:00.000Z",
        bankName: "Punjab National Bank",
        branchCode: "PNB-BBK-0112",
        loanAmount: "₹2,000 (16th Installment)",
        interestRate: "N/A",
        documents: ["aadhar.pdf", "land_record_mutation.pdf"],
        timeline: [
            { step: "Registered", status: "Completed", date: "2025-11-10" },
            { step: "Aadhaar e-KYC", status: "Completed", date: "2025-11-12" },
            { step: "State Verification", status: "Completed", date: "2025-12-01" },
            { step: "Installment Credited", status: "Completed", date: "2025-12-10" }
        ]
    },
    {
        applicationId: "APP-PMFBY-310",
        farmerId: "FARMER-7763",
        farmerName: "Mahesh Patil",
        schemeId: "pmfby",
        schemeName: "PM Fasal Bima Yojana",
        status: "Under Review",
        dateApplied: "2026-02-05T14:20:00.000Z",
        bankName: "Bank of India",
        branchCode: "BOI-NSK-0088",
        loanAmount: "₹1,80,000 (Claim)",
        interestRate: "Premium: 2%",
        documents: ["aadhar.pdf", "crop_sown_certificate.pdf", "land_record.jpg", "damage_photos.jpg"],
        timeline: [
            { step: "Claim Filed", status: "Completed", date: "2026-02-05" },
            { step: "Field Inspection", status: "Completed", date: "2026-02-10" },
            { step: "Insurance Company Review", status: "In Progress", date: "2026-02-15" },
            { step: "Claim Settlement", status: "Pending", date: null }
        ]
    },
    {
        applicationId: "APP-SMAM-415",
        farmerId: "FARMER-3318",
        farmerName: "Gurpreet Singh",
        schemeId: "smam",
        schemeName: "SMAM — Agricultural Mechanization",
        status: "Approved",
        dateApplied: "2026-01-20T11:45:00.000Z",
        bankName: "HDFC Bank",
        branchCode: "HDFC-LDH-0034",
        loanAmount: "₹3,20,000 (Subsidy: ₹1,60,000)",
        interestRate: "50% Subsidy",
        documents: ["aadhar.pdf", "land_record.jpg", "tractor_quotation.pdf", "dealer_certificate.pdf"],
        timeline: [
            { step: "Applied on Portal", status: "Completed", date: "2026-01-20" },
            { step: "Document Verification", status: "Completed", date: "2026-01-25" },
            { step: "District Committee Approval", status: "Completed", date: "2026-02-02" },
            { step: "Subsidy Credit to Dealer", status: "Completed", date: "2026-02-10" },
            { step: "Equipment Delivery", status: "Completed", date: "2026-02-15" }
        ]
    },
    {
        applicationId: "APP-KUSUM-520",
        farmerId: "FARMER-9945",
        farmerName: "Devendra Joshi",
        schemeId: "pm-kusum",
        schemeName: "PM-KUSUM Solar Pump",
        status: "Submitted",
        dateApplied: "2026-02-20T08:15:00.000Z",
        bankName: "UCO Bank",
        branchCode: "UCO-UDR-0021",
        loanAmount: "₹4,50,000 (Subsidy: ₹2,70,000)",
        interestRate: "60% Subsidy",
        documents: ["aadhar.pdf", "land_record.jpg", "electricity_bill.pdf", "solar_pump_quotation.pdf"],
        timeline: [
            { step: "Applied Online", status: "Completed", date: "2026-02-20" },
            { step: "Document Upload", status: "Completed", date: "2026-02-20" },
            { step: "DISCOM Verification", status: "Pending", date: null },
            { step: "Installation", status: "Pending", date: null }
        ]
    },
    {
        applicationId: "APP-KCC-630",
        farmerId: "FARMER-2201",
        farmerName: "Anita Kumari",
        schemeId: "kcc",
        schemeName: "Kisan Credit Card",
        status: "Rejected",
        dateApplied: "2026-01-05T10:00:00.000Z",
        bankName: "Central Bank of India",
        branchCode: "CBI-SMP-0067",
        loanAmount: "₹80,000",
        interestRate: "4%",
        documents: ["aadhar.pdf", "khata_record.pdf"],
        timeline: [
            { step: "Applied", status: "Completed", date: "2026-01-05" },
            { step: "KYC Verification", status: "Completed", date: "2026-01-08" },
            { step: "Land Record Verification", status: "Failed", date: "2026-01-12" },
            { step: "Rejected — Land record pending digitization. Re-apply after verification.", status: "Rejected", date: "2026-01-15" }
        ]
    }
];

router.get('/farmer/:farmerId', (req, res) => {
    const farmerApps = applications.filter(app => app.farmerId === req.params.farmerId);
    res.json({ success: true, count: farmerApps.length, data: farmerApps });
});

// GET: All loan applications
router.get('/all', (req, res) => {
    res.json({ success: true, count: applications.length, data: applications });
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

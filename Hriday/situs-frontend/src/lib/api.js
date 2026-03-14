const API_BASE_URL = "http://localhost:3001/api";

export const api = {
    // User Profile
    getProfile: (id) => fetch(`${API_BASE_URL}/user/profile/${id}`).then(res => res.json()),
    updateProfile: (data) => fetch(`${API_BASE_URL}/user/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()),

    // Schemes
    getSchemes: () => fetch(`${API_BASE_URL}/schemes`).then(res => res.json()),
    matchSchemes: (profile) => fetch(`${API_BASE_URL}/schemes/match`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
    }).then(res => res.json()),

    // Land Records
    getLandRecords: (farmerId) => fetch(`${API_BASE_URL}/land-records/farmer/${farmerId}`).then(res => res.json()),
    addLandRecord: (data) => fetch(`${API_BASE_URL}/land-records`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()),

    // Loans/Applications
    getApplications: (farmerId) => fetch(`${API_BASE_URL}/loans/farmer/${farmerId}`).then(res => res.json()),
    applyForScheme: (data) => fetch(`${API_BASE_URL}/loans/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()),

    // Marketplace
    getProducts: () => fetch(`${API_BASE_URL}/marketplace/products`).then(res => res.json()),
    placeOrder: (data) => fetch(`${API_BASE_URL}/marketplace/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(res => res.json()),
    createRazorpayOrder: (amount) => fetch(`${API_BASE_URL}/marketplace/create-razorpay-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount })
    }).then(res => res.json()),
};

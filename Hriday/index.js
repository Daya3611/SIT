const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Basic Health Check Route
app.get('/', (req, res) => {
    res.json({ status: 'success', message: 'AgriPayChain Backend is running!' });
});

const landRecordsRoute = require('./routes/landRecords');

app.use('/api/land-records', landRecordsRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

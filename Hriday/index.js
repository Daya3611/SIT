import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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

import landRecordsRoute from './routes/landRecords.js';
import schemesRoute from './routes/schemes.js';
import loansRoute from './routes/loans.js';
import marketplaceRoute from './routes/marketplace.js';
import userRoute from './routes/user.js';
import authRoute from './routes/auth.js';

app.use('/api/land-records', landRecordsRoute);
app.use('/api/schemes', schemesRoute);
app.use('/api/loans', loansRoute);
app.use('/api/marketplace', marketplaceRoute);
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

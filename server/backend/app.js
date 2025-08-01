const express = require('express');
const cors = require('cors');
const absensiRoutes = require('./routes/absensiRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/absensi', absensiRoutes);

// ... kode lainnya ... 
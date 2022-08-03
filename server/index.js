require('dotenv').config();

const express = require('express');
const connectDB = require('./utils/db');

const app = express();

const PORT = process.env.PORT || 3030;

// Middleware
connectDB();

app.listen(PORT, () => console.log(`Server up and running on port: ${PORT}`));

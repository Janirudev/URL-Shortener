require('dotenv').config();

const express = require('express');
const connectDB = require('./utils/db');

const app = express();

const PORT = process.env.PORT || 3030;

// Middleware
connectDB();

app.use(express.json({ extended: false }));

//Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

app.listen(PORT, () => console.log(`Server up and running on port: ${PORT}`));

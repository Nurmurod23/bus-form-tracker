const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const routeRoutes = require('./routes/routeRoutes');
const connectDb = require('./config/connectDb')

const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

connectDb();

app.use('/api/routes', routeRoutes);
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
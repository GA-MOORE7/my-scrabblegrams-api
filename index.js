require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const routes = require('./routes/routes');

const app = express();
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => console.error(error));
database.once('connected', () => console.log('Database Connected'));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to my scrabblegrams api!');
});

app.use('/api', routes); // all routes will be prefixed with /api

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});




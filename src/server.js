// require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/", { useNewUrlParser: true });
const db = mongoose.connection;

// Logs any errors on launch
db.on('error', (error) => console.error(error));
// Ensures connection to database is successful
db.once('open', () => console.log('Connected to Database'));

app.use(express.json());

const router = require('./services/routes');
app.use('/', router);

app.listen(3000, () => console.log('Server Started'));
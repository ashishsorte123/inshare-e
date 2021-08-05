const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

require('dotenv').config();

const mongoose = require('mongoose');

function connectDB() {
    // Database connection

    mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, 
    useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true }); 
    const connection = mongoose.connection;

    connection.once('open', () => {
        console.log('Database connected.');
    }).catch(err => {
        console.log('Connection Failed.');
    })
}

module.exports = connectDB;

// const connectDB = require('./config/db');
// connectDB.connectDB();
connectDB();

// Template engine

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// Routes

app.use('/api/files', require('./routes/files'));

app.use('/files', require('./routes/show'));

app.use('/files/download', require('./routes/download'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})
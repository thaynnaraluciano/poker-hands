const express = require('express');
const app = express();
const cardsRoutes = require('./api/routes/cards');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://' + process.env.MONGO_ATLAS_CONNECTION_STRING);


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/cards', cardsRoutes);

module.exports = app;
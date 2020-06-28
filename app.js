const express = require('express');
const app = express();
const cardsRoutes = require('./api/routes/cards');
const mongoose = require ('mongoose');
const bodyParser = require('body-parser');
const croupierRouter = require('./api/routes/croupier');

mongoose.connect('mongodb+srv://' + process.env.MONGO_ATLAS_CONNECTION_STRING);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/cards', cardsRoutes);
app.use('/croupier', croupierRouter);

module.exports = app;

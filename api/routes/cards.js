const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
const Card = require('../models/cards');

router.get('/', (req, res, next) => {
    Card.find()
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
});

router.post('/', (req, res, next) => {
    console.log(req);
    const card = new Card({
        _id: new mongoose.Types.ObjectId(),
        symbol: req.body.symbol,
        suit: req.body.suit
    });
    card.save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        createCard: card
    })
});

module.exports = router;
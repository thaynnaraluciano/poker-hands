const express = require('express');
const router = express.Router();
const Card = require('../models/cards');

router.get('/', (req, res, next) => {
    Card.find()
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
});

module.exports = router;

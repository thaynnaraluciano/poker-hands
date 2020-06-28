const express = require('express');
const router = express.Router();
const croupierController = require('../controllers/croupierController');

router.post('/', croupierController.compareHands);

module.exports = router;

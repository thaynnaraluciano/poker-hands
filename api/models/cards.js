const mongoose = require('mongoose');

const cardsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    symbol: {
        type: String,
        enum: ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"],
        uppercase: true,
    },
    suit: {
       type: String,
       enum: ["Ouros", "Copas", "Espadas", "Paus"]
    },
    sequential: Number
});

module.exports = mongoose.model('Cards', cardsSchema);

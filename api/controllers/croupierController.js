const Card = require('../models/cards');

const handClassification = hand => {
    var sortedHand = hand.sort((x, y) => {
        if(x.sequential < y.sequential){
            return -1
        }
        if(x.sequential > y.sequential){
            return 1
        }
        return 0;
    });
    var occurrences = calculateOccurrences(hand);

    if (isAStraightFlush(sortedHand)) { return 8 }
    if (isAFourOfAKind(sortedHand, occurrences)) { return 7 }
    if (isAFullHouse(sortedHand, occurrences)) { return 6 }
    if (isAFlush(sortedHand)) { return 5 }
    if (isAStraight(sortedHand)){ return 4 }
    if (isAThreeOfKind(sortedHand, occurrences)) { return 3 }
    if (isATwoPairs(sortedHand, occurrences)) {return 2}
    if (isAPair(sortedHand, occurrences)) { return 1 }
    return 0;
}

const isAStraightFlush = hand => {
    return isAStraight(hand) && isAFlush(hand);
}

const isAStraight = hand => {
    for (var i = 0; i < 4; i++){
        if (hand[i+1].sequential - hand[i].sequential != 1){
            if (i === 3 && hand[0].sequential === 2 && hand[4].sequential === 14){
                return true;
            }
            return false;
        }
    }
    return true;
}

const isAFlush = hand => {
    var suit = hand[0].suit;
    for(var i = 1; i < 5; i++){
        if(hand[i].suit != suit){
            return false
        }
    }
    return true;
}

const isAFourOfAKind = (hand, occurrences) => {
    return occurrences.find(occurrence => occurrence.amount === 4) != undefined;
}

const isAThreeOfKind = (hand, occurrences) => {
    return occurrences.find(occurrence => occurrence.amount === 3) != undefined;
}

var isAPair = (hand, occurrences) => {
    return occurrences.find(occurrence => occurrence.amount === 2) != undefined;
}

var isAFullHouse = (hand, occurrences) => {
    return isAPair(hand, occurrences) && isAThreeOfKind(hand, occurrences);
}

var isATwoPairs = (hand, occurrences) => {
    return occurrences.filter(occurrence => occurrence.amount === 2).length === 2;
}

const calculateOccurrences = hand => {
    var aux = [];
    hand.forEach(card => {
        var occurrence = aux.find(value => value.sequential === card.sequential);
        if (occurrence === undefined){
            aux.push({sequential: card.sequential, amount: 1});
        }
        else{
            occurrence.amount++;
        }
    });
    return aux;
}

exports.compareHands = async (req, res) => {
    Promise.all([
        Card.find().where('_id').in(req.body.hands[0]).exec(), 
        Card.find().where('_id').in(req.body.hands[1]).exec()
    ]).then((hands) => { 
        var handOne = hands[0];
        var handTwo = hands[1];
        
        if(handClassification(handOne) > handClassification(handTwo)){
            res.status(200).json(handOne);
        }
        else{
            res.status(200).json(handTwo);
        }
    }).catch(err => console.log(err));
}


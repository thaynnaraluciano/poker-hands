const Card = require('../models/cards');

const sortBySequential = hand => {
    return hand.sort((x, y) => {
        if(x.sequential < y.sequential){
            return -1
        }
        if(x.sequential > y.sequential){
            return 1
        }
        return 0;
    });
}

const handClassification = hand => {
    var sortedHand = sortBySequential(hand);
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

const tiebreaker = (handOne, handTwo, classification) => {
    var handOneCopy = JSON.parse(JSON.stringify(handOne));
    var handTwoCopy = JSON.parse(JSON.stringify(handTwo));
    var occurrencesHandOne = calculateOccurrences(handOneCopy);
    var occurrencesHandTwo = calculateOccurrences(handTwoCopy);

    if(classification === 1 || classification === 2){
        var sequentialHandOne = occurrencesHandOne.filter(value => value.amount === 2);
        var sequentiallHandTwo = occurrencesHandTwo.filter(value => value.amount === 2);
        var sortedSequentialHandOne = sortBySequential(sequentialHandOne).reverse();
        var sortedSequentialHandTwo = sortBySequential(sequentiallHandTwo).reverse();
        
        for(var i = 0; i< sortedSequentialHandOne.length; i++){
            if( sortedSequentialHandOne[i] > sortedSequentialHandTwo[i]){
                return handOne;
            }
            else if(sortedSequentialHandOne[i] < sortedSequentialHandTwo[i]){
                return handTwo;
            }
        }
    }   
    if(classification === 3 || classification === 4){
        var amount = classification === 3 ? 3 : 4;
        var sequentialHandOne = occurrencesHandOne.find(value => value.amount === amount).sequential;
        var sequentiallHandTwo = occurrencesHandTwo.find(value => value.amount === amount).sequential;
        if( sequentialHandOne > sequentiallHandTwo){
            return handOne;
        }
        else if(sequentialHandOne < sequentiallHandTwo){
            return handTwo;
        }
    }
    if(classification === 6){
        var sequentialThreeOfAKindHandOne = occurrencesHandOne.find(value => value.amount === 3).sequential;
        var sequentialThreeOfAKindHandTwo = occurrencesHandTwo.find(value => value.amount === 3).sequential;
        if(sequentialThreeOfAKindHandOne === sequentialThreeOfAKindHandTwo){
            var sequentialPairHandOne = occurrencesHandOne.find(value => value.amount === 2).sequential;
            var sequentialPairHandTwo = occurrencesHandTwo.find(value => value.amount === 2).sequential
            if( sequentialPairHandOne > sequentialPairHandTwo){
                return handOne;
            }
            else if(sequentialPairHandOne < sequentialPairHandTwo){
                return handTwo;
            }
        }
        else{
            if(sequentialThreeOfAKindHandOne > sequentialThreeOfAKindHandTwo){
                return handOne;
            }
            else if(sequentialThreeOfAKindHandOne < sequentialThreeOfAKindHandTwo){
                return handTwo;
            }
        }
    }

    for(var i = 0; i < 5; i++){
        var biggestCardHandOne = biggestCard(handOneCopy, classification);
        var biggestCardHandTwo = biggestCard(handTwoCopy, classification);
        if(biggestCardHandOne.sequential > biggestCardHandTwo.sequential){
            return handOne;
        }
        else if(biggestCardHandOne.sequential < biggestCardHandTwo.sequential){
            return handTwo;
        }
        else{
            handOneCopy.pop();
            handTwoCopy.pop();
        }
    }
    return null;
}

const biggestCard = (hand, classification) => {
    if(hand.length === 1) { return hand[0]}
    var biggest = hand[hand.length -1];
    if(biggest.sequential === 14 && (classification === 4 || classification === 8 )){
        if(hand[hand.length -2].sequential === hand.length){
            return hand[hand.length -2];
        }
    }
    return biggest;
}

exports.compareHands = async (req, res) => {
    Promise.all([
        Card.find().where('_id').in(req.body.hands[0]).exec(), 
        Card.find().where('_id').in(req.body.hands[1]).exec()
    ]).then((hands) => { 
        var handOne = hands[0];
        var handTwo = hands[1];
        var handOneClassification = handClassification(handOne);
        var handTwoClassification = handClassification(handTwo);  

        if(handOneClassification > handTwoClassification){
            res.status(200).json(handOne);
        }
        else if(handOneClassification < handTwoClassification){
            res.status(200).json(handTwo);
        }
        else{
            var winnerHand = tiebreaker(handOne, handTwo, handOneClassification);
            if(winnerHand != null){
                res.status(200).json(winnerHand);
            } 
            else{
                res.status(200).json({message: "empate"});
            }            
        }
    }).catch(err => console.log(err));
}

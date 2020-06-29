const Card = require('../models/cards');
const Hand = require('../models/hands');

const STRAIGHT_FLUSH_POINTS = 8;
const FOUR_OF_A_KIND_POINTS = 7;
const FULL_HOUSE_POINTS = 6;
const FLUSH_POINTS = 5;
const STRAIGHT_POINTS = 4;
const THREE_OF_A_KIND_POINTS = 3;
const TWO_PAIRS_POINTS = 2;
const PAIR_POINTS = 1;

const sortBySequential = sequentialHand => {
    return sequentialHand.sort((x, y) => {
        if(x.sequential < y.sequential){
            return -1
        }
        if(x.sequential > y.sequential){
            return 1
        }
        return 0;
    });
}

const tiebreaker = (handOne, handTwo, classification) => {
    var occurrencesHandOne = handOne.occurrences();
    var occurrencesHandTwo = handTwo.occurrences();

    if(classification === PAIR_POINTS || classification === TWO_PAIRS_POINTS){
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
    if(classification === THREE_OF_A_KIND_POINTS || classification === FOUR_OF_A_KIND_POINTS){
        var amount = classification === THREE_OF_A_KIND_POINTS ? 3 : 4;
        var sequentialHandOne = occurrencesHandOne.find(value => value.amount === amount).sequential;
        var sequentiallHandTwo = occurrencesHandTwo.find(value => value.amount === amount).sequential;
        if( sequentialHandOne > sequentiallHandTwo){
            return handOne;
        }
        else if(sequentialHandOne < sequentiallHandTwo){
            return handTwo;
        }
    }
    if(classification === FULL_HOUSE_POINTS){
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
    var handOneCopy = new Hand([...handOne.cards]);
    var handTwoCopy = new Hand([...handTwo.cards]);

    for(var i = 0; i < 5; i++){
        var biggestCardHandOne = handOneCopy.biggestCard();
        var biggestCardHandTwo = handTwoCopy.biggestCard();
        if(biggestCardHandOne.sequential > biggestCardHandTwo.sequential){
            return handOne;
        }
        else if(biggestCardHandOne.sequential < biggestCardHandTwo.sequential){
            return handTwo;
        }
        else{
            handOneCopy.cards.pop();
            handTwoCopy.cards.pop();
        }
    }
    return null;
}

exports.compareHands = async (req, res) => {
    Promise.all([
        Card.find().where('_id').in(req.body.hands[0]).exec(), 
        Card.find().where('_id').in(req.body.hands[1]).exec()
    ]).then((hands) => { 
        var handOne = new Hand(hands[0]);
        var handTwo = new Hand(hands[1]);
        var handOneClassification = handOne.classification;
        var handTwoClassification = handTwo.classification;  

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


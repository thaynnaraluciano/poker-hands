const STRAIGHT_FLUSH_POINTS = 8;
const FOUR_OF_A_KIND_POINTS = 7;
const FULL_HOUSE_POINTS = 6;
const FLUSH_POINTS = 5;
const STRAIGHT_POINTS = 4;
const THREE_OF_A_KIND_POINTS = 3;
const TWO_PAIRS_POINTS = 2;
const PAIR_POINTS = 1;

module.exports = class Hand {
    constructor(cards){
        this.cards = cards.sort((x, y) => {
            if(x.sequential < y.sequential){
                return -1
            }
            if(x.sequential > y.sequential){
                return 1
            }
            return 0;
        });
        this.classification = this.handClassification();
    }

    occurrences(){
        var aux = [];
        this.cards.forEach(card => {
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

    isAStraightFlush(){
        return this.isAStraight() && this.isAFlush();
    }
    
    isAStraight(){
        for (var i = 0; i < 4; i++){
            if (this.cards[i+1].sequential - this.cards[i].sequential != 1){
                if (i === 3 && this.cards[0].sequential === 2 && this.cards[4].sequential === 14){
                    return true;
                }
                return false;
            }
        }
        return true;
    }
    
    isAFlush(){
        var suit = this.cards[0].suit;
        for(var i = 1; i < 5; i++){
            if(this.cards[i].suit != suit){
                return false
            }
        }
        return true;
    }
    
    isAFourOfAKind() {
        return this.occurrences().find(occurrence => occurrence.amount === 4) != undefined;
    }
    
    isAThreeOfKind() {
        return this.occurrences().find(occurrence => occurrence.amount === 3) != undefined;
    }
    
    isAPair() {
        return this.occurrences().find(occurrence => occurrence.amount === 2) != undefined;
    }
    
    isAFullHouse() {
        return this.isAPair() && this.isAThreeOfKind();
    }
    
    isATwoPairs() {
        return this.occurrences().filter(occurrence => occurrence.amount === 2).length === 2;
    }
    
    handClassification() {
        if (this.isAStraightFlush()) { return STRAIGHT_FLUSH_POINTS }
        if (this.isAFourOfAKind()) { return FOUR_OF_A_KIND_POINTS }
        if (this.isAFullHouse()) { return FULL_HOUSE_POINTS }
        if (this.isAFlush()) { return FLUSH_POINTS }
        if (this.isAStraight()){ return STRAIGHT_POINTS }
        if (this.isAThreeOfKind()) { return THREE_OF_A_KIND_POINTS }
        if (this.isATwoPairs()) {return TWO_PAIRS_POINTS}
        if (this.isAPair()) { return PAIR_POINTS }
        return 0;
    }

    biggestCard() {
        if(this.cards.length === 1) { return this.cards[0]}
        var biggest = this.cards[this.cards.length -1];
        if(biggest.sequential === 14 && (this.classification === STRAIGHT_POINTS || this.classification === STRAIGHT_FLUSH_POINTS )){
            if(this.cards[this.cards.length -2].sequential === this.cards.length){
                return this.cards[this.cards.length -2];
            }
        }
        return biggest;
    }
}
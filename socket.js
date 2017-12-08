let app = require('http').createServer(); // create HTTP server
let io = require('socket.io')(app, { path: '/' }); // bind Socket to HTTP server
app.listen(3000); // listen on port 3000
console.log('Listening for connections on port 3000');
class Player {
    constructor(hand, sum_of_hand) {
        hand = null;
        sum_of_hand = 0;

    }
}
var user_id = [];
var cardStack = [];
var deletedTen = false;
var firstAce = false;
var dealerTotal = 0;
var dealerBust = false;
var num_of_players = 0;
//Borrowed from CoolAJ86 Fisher-Yates Shuffle. stackoverflow.com
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Fix this right now!!!!
//
//
//First do everything in arrays then send them back to emit them from server
function dealerAI() {
    var dealersHand = [];
    while (dealerTotal < 17) {
        let dealerCard = hit_me();
        dealersHand.push(dealerCard);
        console.log(dealerCard);
        let value_of_dealer_card = getValueOfCard(dealerCard);
        if (dealerTotal > 11 && value_of_dealer_card === 11){
            dealerTotal += 1;
            firstAce = true;
        }
        else if(dealerTotal <= 11 && value_of_dealer_card === 11){
            dealerTotal += 11;
        }
        else
            dealerTotal += value_of_dealer_card;
        if(dealerTotal > 21){
            if(firstAce === true && deletedTen === false){
                dealerTotal -= 10;
                firstAce = false;
                deletedTen = true;
            }
            else{
                dealerBust = true;
            }
        }
        console.log(dealerTotal);
        
    } 
    return dealersHand;
}

function checkIfBust(players_hands) {
    let hand_total = 0;
    players_hands.foreach(function (card) {
        hand_total += getValueOfCard(card);
    });
}
function getValueOfCard(playing_card) {
    if (playing_card.length === 3)
        return 10;
    else if (playing_card[0] === "J" || playing_card[0] === "Q" || playing_card[0] === "K")
        return 10;
    else if (playing_card[0] === "A")
        return 11;
    else
        return parseInt(playing_card[0]);
}
function hit_me() {
    return cardStack.shift();
}
function new_game() {
    var newCardStack = [
        "AC", "JH", "8S", "7D",
        "2C", "2H", "2S", "2D",
        "3C", "3H", "3S", "3D",
        "4C", "4H", "4S", "4D",
        "5C", "5H", "5S", "5D",
        "6C", "6H", "6S", "6D",
        "7C", "7H", "7S", "7D",
        "8C", "8H", "8S", "8D",
        "9C", "9H", "9S", "9D",
        "10C", "10H", "10S", "10D",
        "JC", "JH", "JS", "JD",
        "QC", "QH", "QS", "QD",
        "KC", "KH", "KS", "KD"
    ];
    return newCardStack;

}
function resetDealer(){
    deletedTen = false;
    firstAce = false;
    dealerTotal = 0;
    dealerBust = false;
}
io.on('connection', function (socket) {
    console.log('Player connected');
    user_id.push(socket.id);
    num_of_players += 1;
    console.log(num_of_players);
    socket.emit('fromServer', { id: socket.id });
    socket.on('fromClient', function (data) { // listen for fromClient message
        if (data.action === "new_game") {
            resetDealer();
            cardStack = new_game();
            cardStack = shuffle(cardStack);

        }
        else if (data.action === "hit") {
            let card_type = hit_me();
            let card_value = getValueOfCard(card_type);
            socket.emit('fromServer', { card: card_type, value: card_value });
        }
        else if (data.action === "s") {
            
            let dealersHand = dealerAI();
            dealersHand.forEach(function(element){
                
                io.local.emit('fromServer', {dealer_card: element});
            });
            io.local.emit('fromServer', {dealer_total: dealerTotal});
            if(dealerBust){
                io.local.emit('fromServer', {dealer_bust: "dealer_busted"});
            }
        }
        
    });
    socket.on('disconnect', function(){
        console.log("Player Disconnected");
        num_of_players -=1;
    });
});
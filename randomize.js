var cardStack = [
    "AC", "AH", "AS", "AD",
    "1C", "1H", "1S", "1D",
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
function popper(array) {
    
    return array.pop();
  }
  
  // Used like so
  

  console.log(popper(cardStack));
  console.log(popper(cardStack));
  console.log(cardStack);
  function new_game(){
    cardStack = [
      "AC", "AH", "AS", "AD",
      "1C", "1H", "1S", "1D",
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
  }
  new_game();
  console.log(cardStack);
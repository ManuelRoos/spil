let spil = "";

// blackjack variables:
let remainingNumberOfCardsInDeck = 52,
  nextPlayerCard = 1,
  nextHouseCard = 1,
  card = "",
  randomNumberBlackjack = 0,
  cardAndValue = [],
  cardValue = 0,
  cards = [],
  saldo = 300,
  cardPlace = "",
  playerPoints = 0,
  housePoints = 0,
  act = true,
  spillerVinder = false,
  bankenVinder = false,
  showSaldo = "",
  duFik = "",
  bankenFik = "",
  rundensResultat = "",
  resultatTilHTML = document.querySelector(".result"),
  minSaldo = document.querySelector(".saldo-visning"),
  resultatFelt = document.getElementById("resultat-felt");

// jackpot variables:
let firstIcon = 0,
  secondIcon = 0,
  thirdIcon = 0,
  winnings = 0,
  jpresult,
  jpresultatTilHTML = document.querySelector(".jp-gevinst-text"),
  jpWinningsResult = document.getElementById("jpresultat");

shuffleCards();
rydBord();

document.querySelector(".blackjackSpil").addEventListener("click", play);

function play() {
  if (saldo > 0) {

    act = false;
    stopButtonDisabled();
    // første 2 kort
    if (nextPlayerCard === 1) {
      saldo -= 5;
      minSaldo.innerHTML = saldo + " kr.";
      for (let i = 0; i < 2; i++) {
        playerCardDraw();
      }
      runHouseCards();
    }
    // Hvis 3 kort
    else {
      playerCardDraw();
    }
  } else {
    alert("Du har ikke nok penge på kontoen. Refresh siden for at starte forfra.");
  }
}

function playerCardDraw() {
  generateCard();
  cardPlace = "pkort-" + nextPlayerCard;
  playerPoints += cardValue;
  turnCard();
  calculatePlayerPoints();
  nextPlayerCard++;
}

function generateCard() {
  randomNumberBlackjack = Math.floor(Math.random() * remainingNumberOfCardsInDeck);
  cardAndValue = cards.splice(randomNumberBlackjack, 1);
  removeCard();
  card = cardAndValue[0][0];
  cardValue = parseInt(cardAndValue[0][1]);
}

function runHouseCards() {
  if (nextHouseCard === 2) {
    for (let i = 0; i < 4; i++) {
      houseCardDraw();
      if (bankenVinder === true) {
        rundensResultat = "Banken vinder.";
        resultatFelt.classList.add("result-color-red");
        givResultat();
        act = false;
        restartButtonDisabled(act);
        break;
      }
      if (spillerVinder === true) {
        rundensResultat = "Du vinder.";
        act = false;
        restartButtonDisabled(act);
        resultatFelt.classList.add("result-color-blue");
        spil = "blackjack";
        addToSaldo(spil);
        break;
      }
    }
  } else {
    houseCardDraw();
  }
}


function houseCardDraw() {
  generateCard();
  cardPlace = "dkort-" + nextHouseCard;
  housePoints += cardValue;
  turnCard();
  vinderSpiller = calculateHousePoints();
  nextHouseCard++;
}

function calculatePlayerPoints() {
  if (playerPoints === 21) {
    duFik = "Du fik 21.";
    act = true;
    spilButtonDisabled(act);
    stopButtonDisabled(act);
    runHouseCards();
  } else if (playerPoints > 21) {
    duFik = "Du fik for meget.";
    rundensResultat = "Du taber.";
    act = true;
    spilButtonDisabled(act);
    stopButtonDisabled(act);
    act = false;
    restartButtonDisabled(act);
    resultatFelt.classList.add("result-color-red");
    givResultat();
  } else if (nextPlayerCard === 5) {
    duFik = "Du fik 5 kort under.";
    act = true;
    spilButtonDisabled(act);
    stopButtonDisabled(act);
    runHouseCards();
  } else {
    duFik = "Du fik " + playerPoints + ".";
  }

}

document.querySelector(".blackjackStop").addEventListener("click", stop);

document.querySelector(".blackjackRestart").addEventListener("click", function() {
  rydBord();
  act = true;
  restartButtonDisabled(act);
});

function addToSaldo(spil) {
  if (spil === "blackjack") {
    if (playerPoints === 21) {
      saldo += 25;
    } else {
      saldo += 15;
    }
  }
  if (spil === "jackpot"){
    saldo += winnings;
  }
  showSaldo = saldo + " kr.";
  minSaldo.innerHTML = showSaldo;
  givResultat();
}

function givResultat() {
  resultatTilHTML.innerHTML = duFik + "<br/>" + bankenFik + "<br/>" + rundensResultat;
}

function calculateHousePoints() {
  if (nextHouseCard > 1) {
    if (housePoints > 21) {
      spillerVinder = true;
      bankenFik = "Banken fik for meget.";
    } else if (housePoints === 21 || housePoints >= playerPoints) {
      bankenFik = "Banken fik " + housePoints + ".";
      bankenVinder = true;
    } else if (nextHouseCard === 5) {
      bankenFik = "Banken fik 5 kort under.";
      bankenVinder = true;
    } else {
      //Ingenting
    }
  }
  return spillerVinder;
}

function removeCard() {
  remainingNumberOfCardsInDeck--;
}

function turnCard() {
  document.getElementsByClassName(cardPlace)[0].setAttribute("src", "images/cards/" + card + ".png");
}

function beregnSpillerPoint() {
  beregnetSpillerPoint = spillerKort1Vaerdi + spillerKort2Vaerdi + spillerKort3Vaerdi + spillerKort4Vaerdi + spillerKort5Vaerdi;
  return beregnetSpillerPoint;
}

function restartButtonDisabled(act) {
  document.querySelector(".blackjackRestart").disabled = act;
}

function spilButtonDisabled(act) {
  document.querySelector(".blackjackSpil").disabled = act;
}

function stopButtonDisabled(act) {
  document.querySelector(".blackjackStop").disabled = act;
}

function stop() {
  act = true;
  restartButtonDisabled(act);
  spilButtonDisabled(act);
  stopButtonDisabled(act);
  runHouseCards();
}

function rydBord() {
  for (let x = 0; x < 6; x++) {

    document.querySelectorAll(".ekstra-kort")[x].setAttribute("src", "images/cards/card-frame.png");
    if (x < 4) {
      document.querySelectorAll(".start-kort")[x].setAttribute("src", "images/cards/gray_back.png");
    }
  }
  if (cards.length < 10) {
    shuffleCards();
    alert("Kortene bliver blandet, da der er 10 eller færre kort tilbage i bunken.");
    remainingNumberOfCardsInDeck = 52;
  }
  nextPlayerCard = 1;
  nextHouseCard = 1;
  card = "";
  randomNumberBlackjack = 0;
  cardAndValue = [];
  cardValue = 0;
  cardPlace = "";
  playerPoints = 0;
  housePoints = 0;
  act = true;
  stopButtonDisabled(act);
  restartButtonDisabled();
  act = false;
  spilButtonDisabled(act);
  bankenVinder = false;
  spillerVinder = false;
  duFik = "";
  bankenFik = "";
  rundensResultat = "";
  resultatTilHTML.innerHTML = "";
  resultatFelt.classList.remove("result-color-red");
  resultatFelt.classList.remove("result-color-blue");
}

function shuffleCards() {
  cards = [];
  cards = [
    ["AH", 11],
    ['AC', 11],
    ['AS', 11],
    ['AD', 11],
    ['2H', 2],
    ['2C', 2],
    ['2S', 2],
    ['2D', 2],
    ['3H', 3],
    ['3C', 3],
    ['3S', 3],
    ['3D', 3],
    ['4H', 4],
    ['4C', 4],
    ['4S', 4],
    ['4D', 4],
    ['5H', 5],
    ['5C', 5],
    ['5S', 5],
    ['5D', 5],
    ['6H', 6],
    ['6C', 6],
    ['6S', 6],
    ['6D', 6],
    ['7H', 7],
    ['7C', 7],
    ['7S', 7],
    ['7D', 7],
    ['8H', 8],
    ['8C', 8],
    ['8S', 8],
    ['8D', 8],
    ['9H', 9],
    ['9C', 9],
    ['9S', 9],
    ['9D', 9],
    ['10H', 10],
    ['10C', 10],
    ['10S', 10],
    ['10D', 10],
    ['JH', 10],
    ['JC', 10],
    ['JS', 10],
    ['JD', 10],
    ['QH', 10],
    ['QC', 10],
    ['QS', 10],
    ['QD', 10],
    ['KH', 10],
    ['KC', 10],
    ['KS', 10],
    ['KD', 10]

  ];
}


document.querySelector(".jackpotStart").addEventListener("click", jackpotRoll);

function jackpotRoll() {
  saldo -= 5;
  minSaldo.innerHTML = saldo + " kr.";
  firstIcon = Math.floor((Math.random() * 17) + 1);
  secondIcon = Math.floor((Math.random() * 17) + 1);
  thirdIcon = Math.floor((Math.random() * 17) + 1);
  showIcons();
  jpresult = controlIfWinnings();
  calculatePrize();
}

function calculatePrize() {
  jpWinningsResult.classList.remove("jp-result-grey");
  jpWinningsResult.classList.add("jp-result-purple");
  if (jpresult === 0) {
    jpresultatTilHTML.innerHTML = "Du taber";
  } else {
    jpresultatTilHTML.innerHTML = "Du vinder " + jpresult + " kr.";
  }
  spil = "jackpot";
  addToSaldo(spil);
}


function controlIfWinnings() {
  winnings = 0;
  if (firstIcon === secondIcon && firstIcon === thirdIcon) {
    if (firstIcon === 3) {
      winnings = 500;
    } else {
      winnings = 200;
    }
  } else if (firstIcon === secondIcon || firstIcon === thirdIcon || secondIcon === thirdIcon) {
    winnings = 50;
  } else if (firstIcon === 3) {
    winnings = 40;
  } else {
    winnings = 0;
  }
  return winnings;
}


function showIcons() {
  document.getElementsByClassName("jp-1")[0].setAttribute("src", "images/jackpot/" + firstIcon + ".png");
  document.getElementsByClassName("jp-2")[0].setAttribute("src", "images/jackpot/" + secondIcon + ".png");
  document.getElementsByClassName("jp-3")[0].setAttribute("src", "images/jackpot/" + thirdIcon + ".png");
}

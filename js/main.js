let spil = "",
  saldo = 300;

// blackjack variables:
let remainingNumberOfCardsInDeck = 52,
  nextPlayerCard = 1,
  nextHouseCard = 1,
  card = "",
  randomNumberBlackjack = 0,
  cardAndValue = [],
  cardValue = 0,
  cards = [],
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

// Blander kort og sørger for, at Blackjackbordet er klar
shuffleCards();
rydBord();


// BLACKJACK OG JACKPOT - kode

// Ændrer saldo ift. spil og gevinst
function addToSaldo(spil) {
  if (spil === "blackjack") {
    if (playerPoints === 21) {
      saldo += 25;
    }
    else {
      saldo += 15;
    }
  }
  if (spil === "jackpot") {
    saldo += winnings;
  }
  showSaldo = saldo + " kr.";
  minSaldo.innerHTML = showSaldo;
  givResultat();
}



// BLACKJACK - BLACKJACK - BLACKJACK - kode

// Knapper til at spille
document.querySelector(".blackjackSpil").addEventListener("click", play);
document.querySelector(".blackjackStop").addEventListener("click", stop);
document.querySelector(".blackjackRestart").addEventListener("click", function() {
  rydBord();
  act = true;
  restartButtonDisabled(act);
});

// Starter spil
function play() {
  // Hvis der er penge på saldoen:
  if (saldo > 0) {

    act = false;
    stopButtonDisabled();
    // første 2 kort:
    if (nextPlayerCard === 1) {
      saldo -= 5;
      // Penge trækkes fra saldo med det samme:
      minSaldo.innerHTML = saldo + " kr.";
      // 2 kort trækkes
      for (let i = 0; i < 2; i++) {
        playerCardDraw();
      }
      // huset trækker 1 kort
      runHouseCards();
    }
    // Hvis ikke første 2 kort:
    else {
      // spiller trækker et kort mere
      playerCardDraw();
    }
  }
  //Hvis der ikke er penge på saldoen:
  else {
    alert("Du har ikke nok penge på kontoen. Refresh siden for at starte forfra.");
  }
}

// Trækker et kort for spiller
function playerCardDraw() {
  generateCard();
  cardPlace = "pkort-" + nextPlayerCard;
  playerPoints += cardValue;
  turnCard();
  calculatePlayerPoints();
  nextPlayerCard++;
}

//Her generes kort ud fra random num og smider dets værdier i variabler (kort + værdi)
function generateCard() {
  randomNumberBlackjack = Math.floor(Math.random() * remainingNumberOfCardsInDeck);
  cardAndValue = cards.splice(randomNumberBlackjack, 1);
  removeCard();
  card = cardAndValue[0][0];
  cardValue = parseInt(cardAndValue[0][1]);
}

// Her er det husets tur
function runHouseCards() {
  if (nextHouseCard === 2) {
    for (let i = 0; i < 4; i++) {
      // Huset trækker kort
      houseCardDraw();
      if (bankenVinder === true) {
        rundensResultat = "Banken vinder.";
        //Udfylder resultatfelt med rød farve
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
        //Udfylder resultatfelt med rød blå
        resultatFelt.classList.add("result-color-blue");
        spil = "blackjack";
        addToSaldo(spil);
        break;
      }
    }
  }
  else {
    // Hvis det er "bankens første kort":
    houseCardDraw();
  }
}

// Trækker et kort for "banken"
function houseCardDraw() {
  generateCard();
  cardPlace = "dkort-" + nextHouseCard;
  housePoints += cardValue;
  turnCard();
  vinderSpiller = calculateHousePoints();
  nextHouseCard++;
}

// Beregner spiller point
function calculatePlayerPoints() {
  if (playerPoints === 21) {
    duFik = "Du fik 21.";
    act = true;
    spilButtonDisabled(act);
    stopButtonDisabled(act);
    // Starter automatisk bankens tur:
    runHouseCards();
  } else if (playerPoints > 21) {
    duFik = "Du fik for meget.";
    rundensResultat = "Du taber.";
    act = true;
    spilButtonDisabled(act);
    stopButtonDisabled(act);
    act = false;
    restartButtonDisabled(act);
    //Udfylder resultatfelt med rød farve
    resultatFelt.classList.add("result-color-red");
    givResultat();
  } else if (nextPlayerCard === 5) {
    duFik = "Du fik 5 kort under.";
    act = true;
    spilButtonDisabled(act);
    stopButtonDisabled(act);
    // Starter automatisk bankens tur:
    runHouseCards();
  }
  else {
    duFik = "Du fik " + playerPoints + ".";
  }

}

// Udfylder resultatfelt med resultatet
function givResultat() {
  resultatTilHTML.innerHTML = duFik + "<br/>" + bankenFik + "<br/>" + rundensResultat;
}

// Beregner "bankens" point
function calculateHousePoints() {
  if (nextHouseCard > 1) {
    if (housePoints > 21) {
      spillerVinder = true;
      bankenFik = "Banken fik for meget.";
    }
    else if (housePoints === 21 || housePoints >= playerPoints) {
      bankenFik = "Banken fik " + housePoints + ".";
      bankenVinder = true;
    }
    else if (nextHouseCard === 5) {
      bankenFik = "Banken fik 5 kort under.";
      bankenVinder = true;
    }
    else {
      //Ingenting
    }
  }
  return spillerVinder;
}

// Fjerner et kort fra "bunken"
function removeCard() {
  remainingNumberOfCardsInDeck--;
}

// Vender kortet på bordet
function turnCard() {
  document.getElementsByClassName(cardPlace)[0].setAttribute("src", "images/cards/" + card + ".png");
}

//Beregner, hvor mange point spiller har
function beregnSpillerPoint() {
  beregnetSpillerPoint = spillerKort1Vaerdi + spillerKort2Vaerdi + spillerKort3Vaerdi + spillerKort4Vaerdi + spillerKort5Vaerdi;
  return beregnetSpillerPoint;
}

// aktiverer/deaktiverer "Nyt spil" knap
function restartButtonDisabled(act) {
  document.querySelector(".blackjackRestart").disabled = act;
}

// aktiverer/deaktiverer "Spil" knap
function spilButtonDisabled(act) {
  document.querySelector(".blackjackSpil").disabled = act;
}

// aktiverer/deaktiverer "Stop" knap
function stopButtonDisabled(act) {
  document.querySelector(".blackjackStop").disabled = act;
}

//Spiller vælger at stoppe og lader "banken" få sin "tur"
function stop() {
  act = true;
  restartButtonDisabled(act);
  spilButtonDisabled(act);
  stopButtonDisabled(act);
  runHouseCards();
}

//Ryder bordet og sætter det til "standard"
function rydBord() {
  for (let x = 0; x < 6; x++) {

    document.querySelectorAll(".ekstra-kort")[x].setAttribute("src", "images/cards/card-frame.png");
    if (x < 4) {
      document.querySelectorAll(".start-kort")[x].setAttribute("src", "images/cards/gray_back.png");
    }
  }
  // Er der 10 kort eller færre, så "blandes" kort igen ved at udfylde array med alle 52 kort
  if (cards.length < 10) {
    shuffleCards();
    alert("Kortene bliver blandet, da der er 10 eller færre kort tilbage i bunken.");
    remainingNumberOfCardsInDeck = 52;
  }
  // Alle værdier til brug for spil "nulstilles"
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

// Fylder array med alle 52 kort
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








// JACKPOT - JACKPOT - JACKPOT - kode

// Startknap til Jackpot
document.querySelector(".jackpotStart").addEventListener("click", jackpotRoll);

// Genererer 3 random numre
function jackpotRoll() {
  if (saldo > 0) {
    saldo -= 5;
    minSaldo.innerHTML = saldo + " kr.";
    firstIcon = Math.floor((Math.random() * 17) + 1);
    secondIcon = Math.floor((Math.random() * 17) + 1);
    thirdIcon = Math.floor((Math.random() * 17) + 1);
    showIcons();
    jpresult = controlIfWinnings();
    calculatePrize();
  }
  else {
    alert("Du har ikke nok penge på kontoen. Refresh siden for at starte forfra.");
  }
}

// Beregner gevinst
function calculatePrize() {
  jpWinningsResult.classList.remove("jp-result-grey");
  jpWinningsResult.classList.add("jp-result-purple");
  if (jpresult === 0) {
    jpresultatTilHTML.innerHTML = "Du taber";
  }
  else {
    jpresultatTilHTML.innerHTML = "Du vinder " + jpresult + " kr.";
  }
  spil = "jackpot";
  addToSaldo(spil);
}

// Kontrollerer om der er gevinst
function controlIfWinnings() {
  winnings = 0;
  if (firstIcon === secondIcon && firstIcon === thirdIcon) {
    if (firstIcon === 3) {
      winnings = 500;
    }
    else {
      winnings = 200;
    }
  }
  else if (firstIcon === secondIcon || firstIcon === thirdIcon || secondIcon === thirdIcon) {
    winnings = 50;
  }
  else if (firstIcon === 3) {
    winnings = 40;
  }
  else {
    winnings = 0;
  }
  return winnings;
}

// Ændrer ikonerne ift. random numre
function showIcons() {
  document.getElementsByClassName("jp-1")[0].setAttribute("src", "images/jackpot/" + firstIcon + ".png");
  document.getElementsByClassName("jp-2")[0].setAttribute("src", "images/jackpot/" + secondIcon + ".png");
  document.getElementsByClassName("jp-3")[0].setAttribute("src", "images/jackpot/" + thirdIcon + ".png");
}

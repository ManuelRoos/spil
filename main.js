let p1 = [], p2 = [], p3 = [], p4 = [], p5 = [],
  d1 = [], d2 = [], d3 = [], d4 = [], d5 = [],
  alleKort = [],
  spilletKortIRundenForDealer = 0, spilletKortIRundenForSpiller = 0,
  spillerKort1 = 0, spillerKort2 = 0, spillerKort3 = 0, spillerKort4 = 0, spillerKort5 = 0,
  spillerKort1Vaerdi = 0, spillerKort2Vaerdi = 0, spillerKort3Vaerdi = 0, spillerKort4Vaerdi = 0, spillerKort5Vaerdi = 0,
  dealerKort1 = 0; dealerKort2 = 0; dealerKort3 = 0; dealerKort4 = 0; dealerKort5 = 0,
  dealerKort1Vaerdi = 0, dealerKort2Vaerdi = 0, dealerKort3Vaerdi = 0, dealerKort4Vaerdi = 0, dealerKort5Vaerdi = 0,
  antalKort = 52,
  randomNum = 0;
  act = false;
blandKort();
rydBord();


document.querySelector(".blackjackSpil").addEventListener("click", spil);

document.querySelector(".blackjackStop").addEventListener("click", stop);

function spil() {
   if (spilletKortIRundenForSpiller < 2) {
    randomNum = Math.floor(Math.random() * antalKort);
    p1 = alleKort.splice(randomNum, 1);
    spillerKort1Vaerdi = parseInt(p1[0][1]);
    spillerKort1 = p1[0][0];
    antalKort--;
    spilletKortIRundenForSpiller++;
    let cardPlace = "pkort-1";
    alert(cardPlace + " " + spillerKort1);
    turnCard(cardPlace, spillerKort1);


    randomNum = Math.floor(Math.random() * antalKort);
    p2 = alleKort.splice(randomNum, 1);
    spillerKort2Vaerdi = parseInt(p2[0][1]);
    spillerKort2 = p2[0][0];
    antalKort--;
    spilletKortIRundenForSpiller++;
    
    randomNum = Math.floor(Math.random() * antalKort);
    d1 = alleKort.splice(randomNum, 1);
    dealerKort1Vaerdi = parseInt(d1[0][1]);
    dealerKort1 = d1[0][0];
    antalKort--;
    spilletKortIRundenForDealer++;
    
    randomNum = Math.floor(Math.random() * antalKort);
    d2 = alleKort.splice(randomNum, 1);
    dealerKort2Vaerdi = parseInt(d2[0][1]);
    dealerKort2 = d1[0][0];
    antalKort--;
    spilletKortIRundenForDealer++;
    spillerPoint = beregnSpillerPoint();

  }
  else if (spilletKortIRundenForSpiller === 2) {
    p++;
  }
  else if (spilletKortIRundenForSpiller === 3) {
    p++;
  }
  else if (spilletKortIRundenForSpiller === 4) {
    act = true;
    buttonActivasion(act);

  }

}

function turnCard(place, turnedCard){
  console.log(place);
  document.getElementsByClassName(place)[0].setAttribute("src", "images/cards/" + turnedCard + ".png");
  }


function beregnSpillerPoint() {
  beregnetSpillerPoint = spillerKort1Vaerdi + spillerKort2Vaerdi + spillerKort3Vaerdi + spillerKort4Vaerdi + spillerKort5Vaerdi;
  return beregnetSpillerPoint;
}









function buttonActivasion(act) {
  document.querySelector(".blackjackSpil").disabled = act;
}



function stop() {
  act = false;
  buttonActivasion(act);
}







function rydBord() {
  for (let i = 0; i < 6; i++) {

    document.querySelectorAll(".ekstra-kort")[i].setAttribute("src", "images/cards/card-frame.png");
  }
}

function blandKort() {
  alleKort = [];
  alleKort = [
    ["AH", 1],
    ['AC', 1],
    ['AS', 1],
    ['AD', 1],
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

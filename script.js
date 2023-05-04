let order = [];
let playerOrder = [];
let flash;
let good;
let compTurn;
let turn;
let on = false;
let intervalId;
let strict = false;
let noise = false;
let win;

const turnCounter = document.getElementById("turn");
const topLeft = document.getElementById("top-left");
const topRight = document.getElementById("top-right");
const bottomRight = document.getElementById("bottom-right");
const bottomLeft = document.getElementById("bottom-left");
const buttonOn = document.getElementById("on");
const strictButton = document.getElementById("strict");
const startButton = document.getElementById("start");

strictButton.addEventListener("click", () => {
  if (strict.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

buttonOn.addEventListener("click", () => {
  if (buttonOn.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearcolor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener("click", () => {
  if (on || win) {
    play();
  }
});

function play() {
  win = false;
  order = [];
  playerOrder = [];
  flash = 0;
  good = true;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  for (let i = 0; i < 20; i++) {
    order.push(Math.floor(Math.random() * 4) + 1);
  }

  compTurn = true;
  intervalId = setInterval(gameturn, 800);
}

function gameturn() {
  on = false;
  if (flash == turn) {
    compTurn = false;
    on = true;
    clearInterval(intervalId);
    clearcolor();
  }

  if (compTurn) {
    clearcolor();
    setTimeout(() => {
      if (order[flash] === 1) one();
      if (order[flash] === 2) two();
      if (order[flash] === 3) three();
      if (order[flash] === 4) four();
      flash++;
    }, 200);
  }
}

function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play();
  }
  noise = true;
  topLeft.style.backgroundColor = "lightgreen";
}

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play();
  }
  noise = true;
  topRight.style.backgroundColor = "tomato";
}
function three() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play();
  }
  noise = true;
  bottomRight.style.backgroundColor = "lightskyblue";
}
function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play();
  }
  noise = true;
  bottomLeft.style.backgroundColor = "yellow";
}

function clearcolor() {
  topLeft.style.backgroundColor = "darkgreen";
  topRight.style.backgroundColor = "darkred";
  bottomRight.style.backgroundColor = "darkblue";
  bottomLeft.style.backgroundColor = "goldenrod";
}

topLeft.addEventListener("click", () => {
  if (on) {
    playerOrder.push(1);
    // check();
    one();
    if (!win) {
      setTimeout(() => {
        clearcolor();
      }, 300);
    }
  }
});

topRight.addEventListener("click", () => {
  if (on) {
    playerOrder.push(2);
    // check();
    two();
    if (!win) {
      setTimeout(() => {
        clearcolor();
      }, 300);
    }
  }
});
bottomRight.addEventListener("click", () => {
  if (on) {
    playerOrder.push(3);
    // check();
    three();
    if (!win) {
      setTimeout(() => {
        clearcolor();
      }, 300);
    }
  }
});
bottomLeft.addEventListener("click", () => {
  if (on) {
    playerOrder.push(4);
    // check();
    four();
    if (!win) {
      setTimeout(() => {
        clearcolor();
      }, 300);
    }
  }
});

function check() {
  if (
    playerOrder[playerOrder.length - 1] !== playerOrder[playerOrder.length - 1]
  ) {
    good = false;
    if (playerOrder.length == 20 && good) {
      winGame();
    }
    if (good == false) {
      flashcolor();
      turnCounter.innerHTML = "NO";
      setTimeout(() => {
        turnCounter.innerHTML = turn;
        clearcolor();

        if (strict) {
          play();
        } else {
          clearcolor();
          compTurn = 0;
          flash = 0;
          playerOrder = [];
          good = true;
          intervalId = setInterval(gameturn, 800);
        }
      }, 300);
      noise = false;
    }
  }
}

const container = document.querySelector(".div-container");
const solvedStatusText = document.querySelector(".solved-status");
const clickAmountText = document.querySelector(".click-amount");

const horses = [0, 6, 13];
const horsesPath = [-4, 4];

const kettles = [1, 5, 11];
const kettlesPath = [1, -1];

const snakes = [4, 10, 12];
const snakesPath = [-3, 3];

const bugs = [2, 9, 15];
const bugsPath = [3, 4, 5, -3, -4, -5, 1, -1];

const evilMasks = [3, 7, 8, 14];
const evilMasksPath = [4, -4, 1, -1];

let puzzleSolved = false,
  settingUpPuzzle = true;
let clickAmount = 0;

for (let i = 0; i < 16; i++) {
  const cont = document.createElement("div");
  cont.className = "cont";
  cont.style.backgroundColor = "green";
  cont.addEventListener("click", changeColor);

  const p = document.createElement("p");
  p.textContent = i + 1;

  if (horses.includes(i)) {
    cont.addEventListener("click", () => pathChange(i, horsesPath));
    p.innerHTML += "<br>-<br>Horse";
  } else if (kettles.includes(i)) {
    cont.addEventListener("click", () => pathChange(i, kettlesPath));
    p.innerHTML += "<br>-<br>Kettle";
  } else if (snakes.includes(i)) {
    cont.addEventListener("click", () => pathChange(i, snakesPath));
    p.innerHTML += "<br>-<br>Snake";
  } else if (bugs.includes(i)) {
    cont.addEventListener("click", () => pathChange(i, bugsPath));
    p.innerHTML += "<br>-<br>Bug";
  } else if (evilMasks.includes(i)) {
    cont.addEventListener("click", () => pathChange(i, evilMasksPath));
    p.innerHTML += "<br>-<br>Mask";
  }

  p.style.color = "orange";
  p.style.fontSize = "2rem";
  cont.append(p);

  container.append(cont);
}

for (let i = 0; i < 5; i++) {
  const randomIndex = Math.floor(Math.random() * container.children.length);

  changeColor(container.children[randomIndex]);
  if (horses.includes(randomIndex)) {
    pathChange(randomIndex, horsesPath);
  } else if (kettles.includes(randomIndex)) {
    pathChange(randomIndex, kettlesPath);
  } else if (snakes.includes(randomIndex)) {
    pathChange(randomIndex, snakesPath);
  } else if (bugs.includes(randomIndex)) {
    pathChange(randomIndex, bugsPath);
  } else if (evilMasks.includes(randomIndex)) {
    pathChange(randomIndex, evilMasksPath);
  }
  // console.log(randomIndex + 1);
}

settingUpPuzzle = false;

function changeColor(e) {
  if (puzzleSolved) return;
  const div = e.currentTarget || e;
  if (div.style.backgroundColor === "green") {
    div.style.backgroundColor = "red";
  } else {
    div.style.backgroundColor = "green";
  }
}

function isPuzzleSolved() {
  for (let i = 0; i < container.children.length; i++) {
    if (container.children[i].style.backgroundColor === "red") return false;
  }

  return true;
}

function pathChange(index, arr) {
  if (puzzleSolved) return;
  arr.forEach((value) => {
    if (container.children[index + value]) {
      const positionIndex = index % 4;
      if (
        (positionIndex === 3 && value === 1) ||
        (positionIndex === 0 && value === -1) ||
        (positionIndex === 3 && value === -3) ||
        (positionIndex === 0 && value === 3)
      ) {
        return;
      }
      changeColor(container.children[index + value]);
    }
  });
  if (settingUpPuzzle) return;
  clickAmount++;
  clickAmountText.textContent = clickAmount;
  if (isPuzzleSolved()) {
    solvedStatusText.textContent = "Solved!";
    puzzleSolved = true;
  }
}

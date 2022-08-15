let dragindex = 0;
let dropindex = 0;
let clone = "";
let pickedUpLetter = "";

let topWord = "";
let middleWord = "";
let bottomWord = "";
let leftWord = "";
let rightWord = "";
let verticleMidWord = "";
let correctWordArray = [];


createWaffle();
mapWaffle();

function drag(e) {
  e.dataTransfer.setData("text", e.target.id);
  console.log(e.target.id + ' picked up')
  pickedUpLetter = e.target.innerHTML;
}

function drop(e) {
  e.preventDefault();
  clone = e.target.cloneNode(true);
  console.log(e.target.id + ' replaced')
  let data = e.dataTransfer.getData("text");
  let tileTarget;

  if (clone.id !== data) {
    let nodelist = document.getElementById("grid").childNodes;
    for (let i = 0; i < nodelist.length; i++) {
      if (nodelist[i].id == data) {
        dragindex = i;
        tileTarget = e.target;
      }
    }
    currentTile = Array.from(tileTarget.parentNode.children).indexOf(tileTarget);
    document.getElementById("grid").replaceChild(document.getElementById(data), e.target);
    document.getElementById("grid").insertBefore(clone, document.getElementById("grid").childNodes[dragindex]);

    checkLetter(pickedUpLetter, currentTile);
  }
}

function allowDrop(e) {
  e.preventDefault();
}

function checkLetter(letter, index) {
  const grid = document.getElementById("grid").children;
    let currentTile = grid[index];
    console.log(currentTile)
    if(letter == correctWordArray[index])
    {
      currentTile.classList.remove("wrong");
      currentTile.classList.add("right");
      console.log(letter + " is in the correct place!")
    }
    else {
      currentTile.classList.remove("right");
      currentTile.classList.add("wrong");
      console.log(letter + " is not in the correct place!")
    }
  }

function createWaffle() {
  verticleMidWord = getRandomWord();
  let counter = 0;
  while(middleWord[2] != verticleMidWord[2]) {
    middleWord = getRandomWord();
    counter++;
    if(counter > 150) createWaffle();
  }

  counter = 0;
  while(leftWord[2] != middleWord[0]) {
    leftWord = getRandomWord();
    counter++;
    if(counter > 150) createWaffle();
  }

  counter = 0;
  while(rightWord[2] != middleWord[4]) {
    rightWord = getRandomWord();
    counter++;
    if(counter > 150) createWaffle();
  }

  counter = 0;
  while(leftWord[0] != topWord[0] || rightWord[0] != topWord[4] || verticleMidWord[0] != topWord[2])
  {
    topWord = getRandomWord();
    counter++;
    if(counter > 500) createWaffle();
  }

  counter = 0;
  while(leftWord[4] != bottomWord[0] || verticleMidWord[4] != bottomWord[2] || rightWord[4] != bottomWord[4]) {
    bottomWord = getRandomWord();
    counter++;
    if(counter > 500) createWaffle();
  }
}

function mapWaffle() {
  const grid = document.getElementById("grid").children;
  let currentTile;
  for (let index = 0; index < grid.length; index++) {
    if(index != 6 || index != 8 || index != 16 || index != 18)
    {
      currentTile = grid[index];
      currentTile.innerHTML = mapContent(index);
    }
  }
  setCorrectWordArray();
  console.log(correctWordArray)
  console.log(topWord)
  console.log(rightWord)
  console.log(leftWord)
  console.log(middleWord)
  console.log(verticleMidWord)
  console.log(bottomWord)
  }

function mapContent(index) {
  scrambledWordArray = [
    topWord[1],
    topWord[0],
    topWord[3],
    topWord[2],
    leftWord[1],
    middleWord[4],
    "",
    topWord[4],
    "",
    middleWord[0],
    rightWord[1],
    middleWord[2],
    bottomWord[2],
    bottomWord[3],
    verticleMidWord[1],
    leftWord[3],
    "",
    rightWord[3],
    "",
    verticleMidWord[3],
    bottomWord[0],
    middleWord[3],
    bottomWord[1],
    middleWord[1],
  bottomWord[4]
];
  return scrambledWordArray[index];
}

function getRandomWord() {
  const randomNumber = Math.floor(Math.random() * words.length);
  return words[randomNumber];
}

function setCorrectWordArray() {
  correctWordArray = [
    topWord[0],
    topWord[1],
    topWord[2],
    topWord[3],
    topWord[4],
    leftWord[1],
    "",
    verticleMidWord[1],
    "",
    rightWord[1],
    middleWord[0],
    middleWord[1],
    middleWord[2],
    middleWord[3],
    middleWord[4],
    leftWord[3],
    "",
    verticleMidWord[3],
  "",
  rightWord[3],
  bottomWord[0],
  bottomWord[1],
  bottomWord[2],
  bottomWord[3],
  bottomWord[4]
];
}
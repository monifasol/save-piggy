
let game,
    counterKnives = 1,
    splashScreen = null,
    gameBoard = null,
    gameOverScreen = null,
    firstLayerBg = document.querySelector('.first-layer-bg'),
    secondLayerBg = document.querySelector('.second-layer-bg'),
    fruits = document.querySelectorAll('.fruits'),
    butcher = document.querySelector('.butcher'),
    pig = document.getElementById('pig'),
    frameGame = document.querySelector('.frame-game'),
    checkPainID = null,                                     // setInterval that checks pain
    deleteKnivesID = null,                                  // setInterval that deletes lost knives
    throwKnivesID = null,                                   // setInterval that throws knives
    audioPig = new Audio('img/audio-pig.mp3');



// Load all Game elements

const loadGameElements = () => {

  // elements in SPLASH screen
  splashScreen = document.getElementById('splash-screen')
  let startButton = document.getElementById("start-game")

  startButton.addEventListener("click",()=> {
    createNewGame()
    showGameScreen()
  })


  // elements in GAME screen
  gameBoard = document.getElementById('game-board')
  let endButton = document.getElementById("stop-game")

  endButton.addEventListener("click", ()=> {
    game.callGameFinished()
    showGameOver()
  })


  // elements in GAME OVER screen
  gameOverScreen = document.getElementById('game-over')
  let restartButton = document.getElementById("restart-game")

  restartButton.addEventListener("click",()=> {
    game.callGameFinished()
    createNewGame()
    showGameScreen()
  })
  

  // elements in WIN screen
  playerWonScreen = document.getElementById('player-won')
  let playAgainButton = document.getElementById("play-again")

  playAgainButton.addEventListener("click", ()=> {
    game.callGameFinished()
    showSplashScreen()
    playerWonScreen.className = 'hide'
  })

  // set initial classes
  splashScreen.className = 'show'
  gameBoard.className = 'hide'
  gameOverScreen.className = 'hide'
  playerWonScreen.className = 'hide'

};

// Game Over Screen
const showSplashScreen = () => {
  splashScreen.className = 'show'
  gameOverScreen.className = 'hide'
  gameBoard.className = 'hide'
};


// Game Screen
const showGameScreen = () => {
  gameBoard.className = 'show'
  splashScreen.className = 'hide'
  gameOverScreen.className = 'hide'
};

// Game Over Screen
const showGameOver = () => {
  gameOverScreen.className = 'show'
  splashScreen.className = 'hide'
  gameBoard.className = 'hide'
};

function createNewGame() {

  if (game != null && game != undefined) {     // Delete the Old Game Instance (if exists) by setting it to null
    game = null 
  } 

  firstLayerBg.style.transform = 'translateX(0px)'
  secondLayerBg.style.transform = 'translateX(0px)'

  game = new Game()
  counterKnives = 1
  game.start()
}

const isVisible = (element) => {

  let rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right + 100 <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const areTouching = (el1, el2) => {

  let rect1 = el1.getBoundingClientRect()
  let rect2 = el2.getBoundingClientRect()
  
  let collisionX = Math.abs(rect1.x - rect2.x) < (rect1.x < rect2.x ? rect2.width : rect1.width);
  let collisionY = Math.abs(rect1.y - rect2.y) < (rect1.y < rect2.y ? rect2.height : rect1.height);
  
  return collisionX && collisionY;

}

window.addEventListener("load", loadGameElements)

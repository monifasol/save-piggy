
let game,
    counterKnives = 1,
    splashScreen = null,
    gameBoard = null,
    gameOverScreen = null,
    firstLayerBg = document.querySelector('.first-layer-bg'),
    secondLayerBg = document.querySelector('.second-layer-bg'),
    fruits = document.querySelectorAll('.fruits'),
    butcher = document.querySelector('.butcher'),
    butcherHand = document.querySelector('.hand'),
    pig = document.getElementById('pig'),
    frameGame = document.querySelector('.frame-game'),
    checkPainID = null,                                     // setInterval that checks pain
    deleteKnivesID = null,                                  // setInterval that deletes lost knives
    throwKnivesID = null,                                   // setInterval that throws knives
    audioPig = new Audio('img/audio-pig.mp3');


// Cross browser requestAnimationFrame:
window.requestAnimationFrame = window.requestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.msRequestAnimationFrame
|| function(f){setTimeout(f, 1000/60)}

// Load all Game elements

const loadGameElements = () => {
  
  // elements in Splash screen
  splashScreen = document.getElementById('splash-screen')
  let startButton = document.getElementById("start-game")
  startButton.addEventListener("click", showGameScreen)

  // elements in Game screen
  gameBoard = document.getElementById('game-board')
  let endButton = document.getElementById("stop-game")
  endButton.addEventListener("click", showGameOver)

  // elements in Game over screen
  gameOverScreen = document.getElementById('game-over')
  let restartButton = document.getElementById("restart-game")
  restartButton.addEventListener("click", showGameScreen)

  // elements in Game over screen
  playerWonScreen = document.getElementById('player-won')
  let playAgainButton = document.getElementById("play-again")
  playAgainButton.addEventListener("click", showGameScreen)

  // set initial classes
  splashScreen.className = 'show'
  gameBoard.className = 'hide'
  gameOverScreen.className = 'hide'
  playerWonScreen.className = 'hide'
};

// Game Screen
const showGameScreen = () => {

  if (game != null && game != undefined) {
    // game object already exists (we are restarting the game)
    // So let's DELETE THE OLD GAME INSTANCE by setting it to null
    game = null 
  } 

  gameBoard.className = 'show'
  splashScreen.className = 'hide'
  gameOverScreen.className = 'hide'

  game = new Game()
  game.initScenario()
  counterKnives = 1
  game.start()
};

// Game Over Screen
const showGameOver = () => {

  gameOverScreen.className = 'show'
  splashScreen.className = 'hide'
  gameBoard.className = 'hide'

};

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

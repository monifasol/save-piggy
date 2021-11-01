
let splashScreen = null,
      gameBoard = null,
      gameOverScreen = null,
      butcher = document.querySelector('.butcher'),
      butcherHand = document.querySelector('.hand'),
      frameGame = document.querySelector('.frame-game');


// Create cross browser requestAnimationFrame method:
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

  // set initial classes
  splashScreen.className = 'show'
  gameBoard.className = 'hide'
  gameOverScreen.className = 'hide'
};

// Game Screen
const showGameScreen = () => {

  console.log("I clicked")
  console.log(gameBoard)

  gameBoard.className = 'show'
  splashScreen.className = 'hide'
  gameOverScreen.className = 'hide'

  const game = new Game()
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

window.addEventListener("load", loadGameElements)

class Game {
  constructor() {
    this.player = null
    this.knives = []
    this.gameOver = false
  }

  start() {
    // Show game board, create a Player, and start throwing knives

    this.boardGame = document.getElementById("game-board");
    this.player = new Player(5);

    // Enemy starts moving "following" Pig
    this.startEnemyMovement();

    this.handleKeyDown = (event) => {
      if (event.defaultPrevented) return; 

      console.log("event.code", event.code)

      if (event.code === "Right" || event.code === "ArrowRight") {
        this.player.direction = 1
      } else if (event.code === "Left" || event.code === "ArrowLeft") {
        this.player.direction = -1
      } else if (event.code === "Space") {
        this.player.jump() 
      } else {
        return
      }

      // Multiple key detection! for the jump Forward!
      // https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript
      
      // Move scenario as pig walks
      this.player.moveScenario();

      event.preventDefault();
    };

    document.body.addEventListener("keydown", this.handleKeyDown);

    // if I don't use the this.handleKeyDown, then inside my function 
    // this.player does not exist!!!! Like here:
    /*
    document.body.addEventListener("keydown", function (event) {

      switch (event.key) {
        case "Space":           // Support for IE/Edge
        case "Space":           // Pig JUMPS   
          this.player.setDirection("jump");
          break;
      }
      this.player.moveScenario()
      event.preventDefault();
    }, true);
    */

    // Start requestAnimationFrame loop for throwing knives
    //this.startThrowingKnives();
  }

  startEnemyMovement() {
    console.log('lets move enemy!!!')
    butcher.classList.add("moving")

    // Stop butcher's move if Game is Over
    if (this.gameOver) {
      butcher.classList.remove("moving")
    } 
  }

  startThrowingKnives() {
    const loop = () => {

      // We create the knives at a random speed
      let boardTop = gameBoard.getBoundingClientRect().top;
      console.log("boardTop", boardTop);

      let butcherHandPosition = butcherHand.getBoundingClientRect().right;
      console.log("butcherHandPosition", butcherHandPosition);

      if (Math.random() > 0.99) {         // slow % to throw a knive
        let y = boardTop;                 // top of the board 
        let x = butcherHandPosition;     //where the butcher hand is
        this.knives.push(new Knive(x, y, 1));
      }

      // 1. Update the player's 
      //this.player.update();

      // Throw knives
      this.knives.forEach((k) => {
        k.throwKnife();
      });

      this.checkPain();

      // 4. Stop throwing knives and butcher moving if Game is Over
      if (!this.gameOver) {
        window.requestAnimationFrame(loop);
      } else {
        showGameOver();
      }
    };

    // We keep calling requestAnimationFrame (with our loop) until the game is over
    window.requestAnimationFrame(loop);
  }

  restart() {
  }

  isGameOver(player) {
    return player.lives === 0 ? true : false
  }

  checkPain() {
    this.knives.forEach((knive) => {
      if (this.player.gotHurt(knive)) {
        console.log("ARRGHHH!!! I GOT HUT!");
        this.gameOver = true;
      }
    });
  }
}

// Required for testing:
if (typeof module !== 'undefined') module.exports = Game;

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
    this.startThrowingKnives();

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
    let counterKnives = 1;

    const loopKnives = () => {
      let boardTop = gameBoard.getBoundingClientRect().top;
      let butcherHandPosition = butcherHand.getBoundingClientRect().right;
      //console.log("butcherHandPosition", butcherHandPosition);
      
      // We create the knives at a random speed
      if (Math.random() * 2 > 1.99) {                     // slow probability of throwing a knive        
        let y = boardTop;                                 // top of the board 
        let x = `${parseInt(butcherHandPosition)}px`;     // where the butcher hand is
        let newKnife =  new Knive(x, y, counterKnives);          
        newKnife.throwKnife();
        this.knives.push(newKnife);
        counterKnives++;

        // We check pain every time a new knive is created
        this.checkPain();
      }

      // Stop throwing knives and butcher moving if Game is Over
      if (!this.gameOver) {
        window.requestAnimationFrame(loopKnives);
      } else {
        showGameOver();
      }
    };

    // We keep calling requestAnimationFrame (with our loop of knives) until the game is over
    window.requestAnimationFrame(loopKnives);
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

  deleteLostKnives() {
    // here I'll go through all knives and delete from the DOM and from the array of kinves 
    // the ones that are not visible anymore. 

    this.knives.forEach((knife) => {
      let knifeDOMElement = document.getElementById(`knife${knife.id}`)

      if (knifeDOMElement && !isVisible(knifeDOMElement)) {
        
        knifeDOMElement.remove();                              // remove from DOM
        let positionKnife = this.knives.indexOf(knife)        // remove from this.knives
        this.knives.splice(positionKnife, 1)
        
        console.log("I delete this knife", knife);
      }
    });
  }
}

// Required for testing:
if (typeof module !== 'undefined') module.exports = Game;

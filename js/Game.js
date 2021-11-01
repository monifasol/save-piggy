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
      this.knives.forEach( (k) => k.moveKnive(this.player.direction))
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
    butcher.classList.add("moving")

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
      if (Math.random() * 1 > 0.99) {                     // slow probability of throwing a knive        
        let y = parseInt(boardTop);                       // top of the board 
        let x = parseInt(butcherHandPosition);            // where the butcher hand is
        let newKnife =  new Knife(x, y, counterKnives);          
        newKnife.throwKnife();
        this.knives.push(newKnife);

        console.log('I just created a new knife: ', newKnife)
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

  isGameOver() {
    return this.player.lives === 0 ? true : false
  }

  deleteKnife(knife) {
    // delete knife from DOM
    let knifeDOM = document.getElementById(`knife${knife.id}`)
    knifeDOM.remove();                
    
    // delete knife from game.knives
    let positionKnife = this.knives.indexOf(knife)        
    this.knives.splice(positionKnife, 1)

    console.log("I delete this knife", knife);

  }

  checkPain() {
    // Check if any Knife touched Piggy
    this.knives.every((knife) => {
      
      let knifeDOM = document.getElementById(`knife${knife.id}`)
      let pigDOM =  document.getElementById('pig')
      let dialogDOM = document.querySelector('.dialog-lives')
      
      if ( areTouching(knifeDOM, pigDOM) ) {
        dialogDOM.classList.add('visible')
        setTimeout(() => {
          dialogDOM.classList.remove('visible')
        }, 1000);

        this.deleteKnife(knife);
        this.player.lives -= 1;
        return false
      }
      return true
    });

  }

  deleteLostKnives() {
    // here I'll go through all knives and delete from the DOM and from the array of kinves 
    // the ones that are not visible anymore. 

    this.knives.forEach((knife) => {
      let knifeDOMElement = document.getElementById(`knife${knife.id}`)

      if (knifeDOMElement && !isVisible(knifeDOMElement)) {
        this.deleteKnife(knife);
      }
    });
  }
}

// Required for testing:
if (typeof module !== 'undefined') module.exports = Game;

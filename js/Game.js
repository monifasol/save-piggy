class Game {
  constructor() {
    this.player = null
    this.knives = []
    this.xBg1 = 0
    this.xBg2 = 0
    this.xFruits = 0
  }

  start() {
    // Show game board, create a Player, and start throwing knives

    this.boardGame = document.getElementById("game-board")
    this.player = new Player()
    this.startEnemyMovement()

    this.handleKeyDown = (event) => {
      if (event.defaultPrevented) return; 

      if (event.code === "Right" || event.code === "ArrowRight") {
        this.player.direction = 1  
        pig.classList.add("walk")

      } else if (event.code === "Left" || event.code === "ArrowLeft") {
        this.player.direction = -1
        pig.classList.add("walk")

      } else if (event.code === "Space") {
        this.player.direction = 0
        this.player.jump() 
        pig.classList.add("jump")
        this.player.didEatFruit()

      } else {
        return
      }

      // add walking class to pig only 1 second
      if (this.player.direction == 1 || this.player.direction == -1) {
        setTimeout( () => pig.classList.remove("walk"), 400)
      }

      // Multiple key detection! for the jump Forward!
      // https://stackoverflow.com/questions/5203407/how-to-detect-if-multiple-keys-are-pressed-at-once-using-javascript
      
      // Move scenario as pig walks
      this.moveScenario()
      event.preventDefault()
    };

    document.body.addEventListener("keydown", this.handleKeyDown);

    throwKnivesID = setInterval( () => { this.throwKnives() }, 2000)
    checkPainID = setInterval(() => { if (!this.isGameOver()) this.checkPain() }, 100)
    deleteKnivesID = setInterval( ()=> { this.deleteLostKnives() }, 1500)

    // if I don't use the this.handleKeyDown, then inside my function 
    // this.moveScenario does not exist!!!! Like here:
    /* document.body.addEventListener("keydown", function (event) {
        // BLA BLA BLA 
        this.moveScenario()
        event.preventDefault();
      }, true);  */
  }

  initScenario() {
    firstLayerBg.style.transform = 'translateX(0px)'
    secondLayerBg.style.transform = 'translateX(0px)'
    fruits.forEach( (divFruits) => { divFruits.style.transform = 'translateX(0px)' })
  }

  moveScenario() {
    // The player doesn NOT move; it's the background that moves

    if (this.player.direction === 1 && !this.player.didReachTheEnd()) {
      // goes RIGHT and scenario moves if RIGHT limit is not reached
      this.xFruits -= 20
      this.xBg1 -= 10
      this.xBg2 -= 5
      this.knives.forEach( (k) => k.move(this.player.direction))        // because pig moves forwards

    } else if (this.player.direction === -1 && this.xBg2 < 0) {
      // goes left and scenario moves if LEFT limit is not reached
      this.xFruits += 20
      this.xBg1 += 10
      this.xBg2 += 5
      this.knives.forEach( (k) => k.move(this.player.direction))       // because pig moves backwards

    } else if (this.player.direction === 0) {                          // then make sure he does not move
      return
    }

    // If We reached the end but Piggy wants to continue, then is Piggy who moves.
    if (this.player.direction === 1 && this.player.didReachTheEnd()) {
      pig.style
    }

    firstLayerBg.style.transform = `translateX(${this.xBg1}px)`
    secondLayerBg.style.transform = `translateX(${this.xBg2}px)`
    fruits.forEach( (divFruits) => { divFruits.style.transform = `translateX(${this.xFruits}px)` })
  }

  startEnemyMovement() {
    butcher.classList.add("moving")
  }

  throwKnives() {
          
    let boardTop = gameBoard.getBoundingClientRect().top
    let butcherHandPosition = butcherHand.getBoundingClientRect().right
    let y = parseInt(boardTop)                            // top of the board 
    let x = parseInt(butcherHandPosition)                 // where the butcher hand is
    let newKnife =  new Knife(x, y, counterKnives)         
    
    newKnife.throwKnife()
    this.knives.push(newKnife)
    counterKnives++

    console.log('I just created a new knife: ', newKnife)
  }

  isGameOver() {
    return this.player.lives === 0 ? true : false
  }

  deleteKnife(knife) {
    // delete knife from DOM
    let knifeDOM = document.getElementById(`knife${knife.id}`)
    knifeDOM.remove()                
    
    // delete knife from game.knives
    let positionKnife = this.knives.indexOf(knife)        
    this.knives.splice(positionKnife, 1)

    //console.log("This knife is deleted:", knife);
  }

  checkPain() {
    // Check if any Knife touched Piggy
    this.knives.every( (knife) => {
      
      let knifeDOM = document.getElementById(`knife${knife.id}`)
      let pigDOM =  document.getElementById('pig')
      
      if ( areTouching(knifeDOM, pigDOM) ) {

        let dialog = document.querySelector('.dialog-lives')
        let ouch = document.querySelector('#pig .ouch')
  
        pigDOM.classList.add('touched')
        dialog.classList.add('visible')
        ouch.classList.add('visible')

        setTimeout(() => {
          pigDOM.classList.remove('touched')
          dialog.classList.remove('visible')
          ouch.classList.remove('visible')
        }, 800)

        this.deleteKnife(knife)
        this.player.removeLive()

        if (this.isGameOver() ) this.callGameOver()
        return false
      }
      return true
    });
  }

  deleteLostKnives() {
    // Delete the knives that are not visible anymore. (both from DOM and from object)
    this.knives.forEach((knife) => {
      let knifeDOMElement = document.getElementById(`knife${knife.id}`)

      if (knifeDOMElement && !isVisible(knifeDOMElement)) {
        this.deleteKnife(knife)
      }
    });
  }

  callGameOver() {
    // Game is finished

    clearInterval(checkPainID)
    clearInterval(deleteKnivesID)
    clearInterval(throwKnivesID)

    showGameOver()

    //Butcher stops moving
    butcher.classList.remove("moving")

    // Remove remaining flying knives from the DOM 
    let knives = document.querySelectorAll('.knife')
    knives.forEach( (el) => el.remove())

    // Set all lives active
    let lives = document.querySelectorAll('.live')
    lives.forEach( (el) => el.classList.remove('lost'))

    // Set fruits collected to 0
    let fruitsCollectedDOM = document.querySelector('.fruits-collected span')
    fruitsCollectedDOM.textContent = "0"

  }

}

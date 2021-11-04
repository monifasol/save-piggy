class Game {
  constructor() {
    this.player = null
    this.knives = new Array()
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

    // I delay 1 second to start throwing knives
    setTimeout( () => {
      throwKnivesID = setInterval( () => { this.throwKnives() }, 2000)
      checkPainID = setInterval(() => { if (!this.isGameOver()) this.checkPain() }, 100)
      deleteKnivesID = setInterval( ()=> { this.deleteLostKnives() }, 2000)
    }, 2000)
    
  
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
    playerWonScreen.className = 'hide'

    // Set Pig at initial position
    pig.style.left = '40%';
    pig.style.transform = 'none'

    // Remove any remaining flying knife from the DOM 
    let knives = document.querySelectorAll('.knife')
    knives.forEach( (el) => el.remove())

    // Reset state of all fruits
    fruits.forEach( (divFruits) => { 
      divFruits.style.transform = 'translateX(0px)' 
      let fruitSpans = divFruits.querySelectorAll('span.fruit')

      fruitSpans.forEach( (fruit) => { fruit.classList.remove("eaten") })
    })

  }

  moveScenario() {
    // The player doesn NOT move; it's the background that moves

    let knivesDOM = document.querySelectorAll('.knife')     // only take knives in DOM

    if (this.player.direction === 1 && !this.player.didReachTheEnd()) {
      // goes RIGHT and scenario moves if RIGHT limit is not reached
      this.xFruits -= 22
      this.xBg1 -= 15
      this.xBg2 -= 5
      knivesDOM.forEach( (k) => this.moveKnife(k) )        

    } else if (this.player.direction === -1 && this.xBg2 < 0) {
      // goes left and scenario moves if LEFT limit is not reached
      this.xFruits += 22
      this.xBg1 += 15
      this.xBg2 += 5
      knivesDOM.forEach( (k) => this.moveKnife(k) )        

    } else if (this.player.direction === 0) {      
      // then make sure he does not move                  
      return
    }

    firstLayerBg.style.transform = `translateX(${this.xBg1}px)`
    secondLayerBg.style.transform = `translateX(${this.xBg2}px)`
    fruits.forEach( (divFruits) => { divFruits.style.transform = `translateX(${this.xFruits}px)` })

    // If Piggy reached the end and picked up all fruits, then Piggy moves directly to The End.
    if (this.player.direction === 1 && this.player.didReachTheEnd() && this.player.fruitsCollected >= 10) {
      
      // Piggy WON!!!!!!
      this.playerWon()
    }

  }

  playerWon() {

    let frameGameRight = frameGame.getBoundingClientRect().right
    pig.style.left = `${frameGameRight - 250 }px`
    pig.style.transform = 'scale(1.3) translateY(-20px)'
    pig.style.transition = 'all 2s'

    // Game is finished
    clearInterval(checkPainID)
    clearInterval(deleteKnivesID)
    clearInterval(throwKnivesID)

    // Remove any remaining flying knife from the DOM 
    let knives = document.querySelectorAll('.knife')
    knives.forEach( (el) => el.remove())

    // SHOW WIN SCREEN
    setTimeout( () => { playerWonScreen.className = 'show' }, 1500 )
  }

  moveKnife(element) {

    // X didn't change (x is where Butcher is); only Y changed when knife falls.
    // Need to extract the Number of the previous "transform translate", to accumulate on it.
    let prevTranslate = element.style.transform
    let newValue = ""

    if (this.player.direction === 1) newValue = this.moveKnifeBackwards(prevTranslate)
    if (this.player.direction === -1) newValue = this.moveKnifeForwards(prevTranslate)
  
    element.style.transform = `translateX(${newValue}px)`
  }

  moveKnifeBackwards(prevTranslate) {

    let newValue = 0;

    if (prevTranslate == "" || prevTranslate == undefined) {   // then it's the first fime we apply "transform translate"
      newValue = -25
    } else {
      let positionPx = prevTranslate.indexOf('px')
      let prevValue = prevTranslate.slice(11, positionPx)      // position 11 because starts by "translateX("
      newValue = parseInt(prevValue) - 25
    }

    return newValue
  }

  moveKnifeForwards(prevTranslate) {

    let newValue = 0;

    if (prevTranslate == "" || prevTranslate == undefined) {    // then it's the first fime we apply "transform translate"
      newValue = 25
    } else {

      let positionPx = prevTranslate.indexOf('px')
      let prevValue = prevTranslate.slice(11, positionPx)       // position 11 because starts by "translateX("
      newValue = parseInt(prevValue) + 25
    }

    return newValue
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

    // Set all lives active
    let lives = document.querySelectorAll('.live')
    lives.forEach( (el) => el.classList.remove('lost'))

    // Remove any remaining flying knife from the DOM 
    let knives = document.querySelectorAll('.knife')
    knives.forEach( (el) => el.remove())
  }

}

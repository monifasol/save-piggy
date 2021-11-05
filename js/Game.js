class Game {    
  
  constructor() {
    this.player = null
    this.knives = new Array()
    this.xBg1 = 0
    this.xBg2 = 0
    this.xFruits = 0
    this.speedKnives = 15
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

      }

      // add walking class to pig only 1 second
      if (this.player.direction == 1 || this.player.direction == -1) {
        setTimeout( () => pig.classList.remove("walk"), 400)
      }

      // Move scenario as pig walks
      this.moveScenario()
    };

    document.body.addEventListener("keydown", this.handleKeyDown);

    // I delay 1 second to start throwing knives
    setTimeout( () => {
      throwKnivesID = setInterval( () => { this.throwKnives() }, 2000)
      checkPainID = setInterval(() => { if (!this.isGameOver()) this.checkPain() }, 100)
      deleteKnivesID = setInterval( ()=> { this.deleteLostKnives() }, 2000)
    }, 2000)

  }

  moveScenario() {
    // The player doesn NOT move; it's the background that moves

    if (this.player.direction === 1 && !this.player.didReachTheEnd()) {
      // goes RIGHT and scenario moves if RIGHT limit is not reached
      this.moveBgsBackwards()

    } else if (this.player.direction === -1 && this.xBg2 < 0) {
      // goes left and scenario moves if LEFT limit is not reached
      this.moveBgsForwards()

    } 

    // if Piggy didn't reach any of the limits, thne we move the knives
    if ((this.player.direction === 1 && !this.player.didReachTheEnd()) || ((this.player.direction === -1 && this.xBg2 < 0))) {
      window.requestAnimationFrame(this.moveKnifes.bind(this))  
      //window.requestAnimationFrame(this.moveKnife.bind(this, k))  
    }

    window.requestAnimationFrame(this.moveElements.bind(this))

    // If Piggy reached the end and picked up all fruits, then Piggy moves directly to The End.
    if (this.player.direction === 1 && this.player.didReachTheEnd() && this.player.fruitsCollected >= 10) {
      
      // Piggy WON!!!!!!
      this.playerWon()
    }
  }

  moveBgsBackwards() {
    this.xFruits -= 22
    this.xBg1 -= 15
    this.xBg2 -= 5      
  }

  moveBgsForwards() {
    this.xFruits += 22
    this.xBg1 += 15
    this.xBg2 += 5 
  }

  moveElements() {
    firstLayerBg.style.transform = `translateX(${this.xBg1}px)`
    secondLayerBg.style.transform = `translateX(${this.xBg2}px)`
    fruits.forEach( (divFruits) => { divFruits.style.transform = `translateX(${this.xFruits}px)` })

  }

  moveKnifes() {

    // X didn't change (x is where Butcher is); only Y changed when knife falls.
    // Need to extract the Number of the previous "transform translate", to accumulate on it.

    let knivesDOM = document.querySelectorAll('.knife')     // only take knives in DOM

    knivesDOM.forEach( (element) =>  {
      let newValue = this.moveSingleKnife(element, this.player.direction)
      element.style.transform = `translateX(${newValue}px)`
    }) 
  }

  moveSingleKnife(element, direction) {
    let newValue = 0
    let prevValue = 0
    let prevTranslate = element.style.transform

    if (prevTranslate == "" || prevTranslate == undefined) {   // then it's the first fime we apply "transform translate"
      newValue = `${this.speedKnives}`

    } else {

      prevValue = this.getPreviousKnifeTransformValue(prevTranslate)

      if (direction === 1) {
        newValue = parseInt(prevValue) - this.speedKnives
        if (prevValue > 0) newValue = `-${newValue}`        // otherwise I will have two "--"

      } else if (direction === -1) {
        newValue = parseInt(prevValue) + this.speedKnives
      }
    }
    return newValue
  }

  getPreviousKnifeTransformValue(prevTranslate) {
    let positionPx = prevTranslate.indexOf('px')
    return prevTranslate.slice(11, positionPx)      // position 11 because starts by "translateX("
  }

  playerWon() {

    let frameGameRight = frameGame.getBoundingClientRect().right
    pig.style.left = `${frameGameRight - 250 }px`
    pig.style.transform = 'scale(1.3) translateY(-20px)'
    pig.style.transition = 'all 2s'

    audioPigWins.play()

    // Stop checking Pain and throwing knives!!
    clearInterval(checkPainID)
    clearInterval(deleteKnivesID)
    clearInterval(throwKnivesID)

    let knives = document.querySelectorAll('.knife')
    knives.forEach( (el) => el.remove())

    // SHOW WIN SCREEN
    setTimeout( () => { playerWonScreen.className = 'show' }, 1500 )
  }

  startEnemyMovement() {
    butcher.classList.add("moving")
  }

  throwKnives() {
          
    let butcherPosition = butcher.getBoundingClientRect().right
    let x = parseInt(butcherPosition) - 70        // butche position minus a bit of his width
    let newKnife =  new Knife(x, counterKnives)         
    
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

        if (this.isGameOver() ) this.callGameFinished()
        return false
      }
      return true
    });
  }

  deleteLostKnives() {
    // Delete the knives that are not visible anymore. (both from DOM and from object)
    this.knives.forEach((knife, i) => {
      let knifeDOMElement = document.getElementById(`knife${knife.id}`)

      if (knifeDOMElement && !isVisible(knifeDOMElement)) {
        this.deleteKnife(knife)
      }
    });
  }

  callGameFinished() {

    // Game is finished

    clearInterval(checkPainID)
    clearInterval(deleteKnivesID)
    clearInterval(throwKnivesID)
    
    //Butcher stops moving
    butcher.classList.remove("moving")

    // Set all lives active
    let lives = document.querySelectorAll('.live')
    lives.forEach( (el) => el.classList.remove('lost'))

    // Remove any remaining flying knife from the DOM 
    let knives = document.querySelectorAll('.knife')
    knives.forEach( (el) => el.remove())

    firstLayerBg.style.transform = 'translateX(0px)'
    secondLayerBg.style.transform = 'translateX(0px)'
    playerWonScreen.className = 'hide'

    // Set Pig at initial position
    pig.style.left = '40%';
    pig.style.transform = 'translateX(0px)'

    // Reset state of all fruits
    document.getElementById('dialog-the-end-sentence').textContent = "Piggy, you need to collect 10 fruits!"

    fruits.forEach( (divFruits) => { 
      divFruits.style.transform = 'translateX(0px)' 
      let fruitSpans = divFruits.querySelectorAll('span.fruit')

      fruitSpans.forEach( (fruit) => { fruit.classList.remove("eaten") })
    })
  }

}

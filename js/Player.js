class Player {

  constructor() {
    this.lives = 5
    this.fruitsCollected = 0
    this.direction = 0
  }  

  didReachTheEnd() {
    let theEnd = document.querySelector('.the-end')
    return isVisible(theEnd) ? true : false
  }

  jump() {
    const pig = document.getElementById('pig')
    pig.className = 'jump'

    // remove jump effect after the animation is done (1 second)
    setTimeout( () => {
      pig.classList.remove('jump')
    } , 1000)
  }

  didEatFruit() {
    // Check if any Knife touched Piggy

    console.log(`I'm checking if I ate fruits`)
    // We got 50 fruits

    let allFruits = document.querySelectorAll('.fruit')

    allFruits.forEach( (fruit) => {
      
      console.log('Im checking this fruit', fruit, 'and this pig', pig)

      // Check if fruit is on the range of my jump
      // So, we only check if there is a fruit in between x1 and x2 (left and right of my pig) 
      
      // Pig does not move. It only moves the BG. 
      // Therefore, position pig is the scroll of the BG --> game.xBg1

      let leftPig = pig.getBoundingClientRect().left
      let rightPig = pig.getBoundingClientRect().right
      let leftFruit = fruit.getBoundingClientRect().left
      let rightFruit = fruit.getBoundingClientRect().right

      //console.log("leftPig", leftPig, "rightPig", rightPig, "leftFruit", leftFruit, "rightFruit", rightFruit)

      if (leftPig < leftFruit && rightPig > rightFruit) {
        
        // With a little delay, because pig takes 1 second to jump
        setTimeout(() => {
          let yummy = document.querySelector('#pig .yummy')
          yummy.classList.add('visible')
          yummy.classList.remove('visible')
        }, 1000)

        // After another second, we removed the Yummy div
        setTimeout(() => { 
          yummy.classList.remove('visible')
        }, 2000)

        this.fruitsCollected += 1
        let fruitsCollectedDOM = document.querySelector('.fruits-collected span')
        fruitsCollectedDOM.textContent = `${this.fruitsCollected}`
      }

    });
  }
  
  removeLive() {
    // remove life from the DOM
    let liveDOM = document.getElementById(`live${this.lives}`)
    liveDOM.classList.add('lost')
    // remove life from the Player
    this.lives -= 1
  }

  //resetLives() {
  //  this.lives = 5
  //}
}

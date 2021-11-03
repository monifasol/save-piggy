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

    //console.log(`I'm checking if Piggy ate a fruit`)

    let allFruits = document.querySelectorAll('.fruit')

    allFruits.forEach( (fruit) => {
      
      // Check if fruit is on the range of my jump (if there is a fruit in between x1 and x2 (left and right of my pig))
      // But I take less area!!! because the hand takes less space. (If we'd take into account the limits of his body, Piggy would eat all at once.) 

      let leftPig = pig.getBoundingClientRect().left + 20
      let rightPig = pig.getBoundingClientRect().right - 10
      let leftFruit = fruit.getBoundingClientRect().left
      let rightFruit = fruit.getBoundingClientRect().right

      let yummy = document.querySelector('#pig .yummy')

      // I really don't understand Why this works:
      //console.log('Im checking this fruit', fruit)
      //console.log("leftPig", leftPig, "rightPig", rightPig, "leftFruit", leftFruit, "rightFruit", rightFruit)

      if (leftPig < leftFruit && rightPig > rightFruit) {
        
        // With a little delay, because pig takes 1 second to jump
        setTimeout(() => {
          yummy.classList.add('visible')
        }, 800)

        // After 1,5 seconds, we removed the Yummy div
        setTimeout(() => { 
          yummy.classList.remove('visible')
        }, 1500)

        this.fruitsCollected += 1
        let fruitsCollectedDOM = document.querySelector('.fruits-collected span')
        fruitsCollectedDOM.textContent = `${this.fruitsCollected}`

        // Fruit animation to hide from DOM
        fruit.classList.add('eaten')

        // Update message for Piggy
        let messageTheEndDOM = document.getElementById('dialog-the-end-sentence')
        let messageTheEnd = ""

        if (this.fruitsCollected < 10) {
          messageTheEnd = `Piggy, you need to pick ${10 - this.fruitsCollected} more fruits!!`
        } else {
          messageTheEnd = "Nice, Piggy!! You collected all fruits!! 🍑🥑"
        }
        messageTheEndDOM.textContent = messageTheEnd
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
}

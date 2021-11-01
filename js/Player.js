class Player {

  constructor(lives) {
    this.xBg1 = 0;
    this.xBg2 = 0;
    this.lives = lives;
    this.direction = 0;
  }  

  moveScenario() {
    // the truth is, the player doesn NOT move. 
    // what it moves, it's the background

    const firstLayerBg = document.querySelector('.first-layer-bg')
    const secondLayerBg = document.querySelector('.second-layer-bg')
    const theEnd = document.querySelector('.the-end')
    const fruits = document.querySelectorAll('.fruits')

    if (this.direction === 1 && !isVisible(theEnd)) {
      // goes RIGHT and scenario moves if RIGHT limit is not reached
      this.xBg1 -= 40
      this.xBg2 -= 20
    } else if (this.direction === -1 && this.xBg2 < 0) {
      // goes left and scenario moves if LEFT limit is not reached
      this.xBg1 += 40
      this.xBg2 += 20
    }

    firstLayerBg.style.transform = `translateX(${this.xBg1}px)`
    secondLayerBg.style.transform = `translateX(${this.xBg2}px)`
    
    fruits.forEach( (divFruits) => {
      divFruits.style.transform = `translateX(${this.xBg1}px)`
    })

    //console.log("xBg1 after: ", this.xBg1)
    //console.log("xBg2 after: ", this.xBg2)
  }

  jump() {
    const pig = document.getElementById('pig')
    pig.className = 'jump'

    // remove jump effect after the animation is done (1 second)
    setTimeout( () => {
      pig.classList.remove('jump')
    } , 1000);

  }


  gotHurt(item) {
    // this works it it's a "rectangle", 
    // if it's another shape, it's not perfectly calculated.   
    if (
      this.x + this.size >= item.x &&
      this.y + this.size > item.y &&
      this.y < item.y + item.size &&
      this.x <= item.x + item.size &&
      this.y + this.size > item.y &&
      this.y < item.y + item.size
    ) {
      return true;
    } else {
      return false;
    }
  }

  isDead() {
    return this.lives === 0 ? true : false
  }

  removeLive() {
    this.lives -= 1
  }

  resertLives() {
    this.lives = 5
  }

}

// required for testing:
if (typeof module !== 'undefined') module.exports = Player;

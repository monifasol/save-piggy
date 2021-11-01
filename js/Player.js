class Player {

  constructor(lives) {
    this.xBg1 = 0;
    this.xBg2 = 0;
    this.lives = lives;
    this.direction = 0;
  }  

  moveScenario(knives) {
    // The player doesn NOT move; it's the background that moves.

    let firstLayerBg = document.querySelector('.first-layer-bg'),
        secondLayerBg = document.querySelector('.second-layer-bg'),
        fruits = document.querySelectorAll('.fruits');

    if (this.direction === 1 && !this.didReachTheEnd()) {
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
  }

  didReachTheEnd() {
    let theEnd = document.querySelector('.the-end');
    return isVisible(theEnd) ? true : false
  }

  jump() {
    const pig = document.getElementById('pig')
    pig.className = 'jump'

    // remove jump effect after the animation is done (1 second)
    setTimeout( () => {
      pig.classList.remove('jump')
    } , 1000);
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

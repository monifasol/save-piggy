class Knive {
  constructor(x, y, speed) {
    this.x = x;     // X is where the butcher hand is
    this.y = y;     // Y is always the same: top of the board
    this.speed = speed;
  }
 
  throwKnife() {
    this.y += this.speed * -2;
  }

}


// required for testing:
if (typeof module !== 'undefined') module.exports = Knive;

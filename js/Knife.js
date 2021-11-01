class Knive {
  constructor(x, y, id) {
    this.id = id;
    this.x = x;     // X is where the butcher hand is
    this.y = y;     // Y is always the same: top of the board
  }
 
  throwKnife() {
    console.log('Im in throw knife')

    // create the knife in DOM (with a span as a wrapper of the img)
    let knifeElement = document.createElement('span')
    knifeElement.setAttribute('class', 'knife')
    knifeElement.setAttribute('id', `knife${this.id}`)

    let knifeImg =  document.createElement('img')
    knifeImg.setAttribute('src', 'img/knife.png')

    knifeElement.appendChild(knifeImg)
    frameGame.appendChild(knifeElement)

    // give properties
    knifeElement.style.position = 'absolute';
    knifeElement.style.top = this.y;
    knifeElement.style.left = this.x;

    // move knife!
    knifeElement.classList.add('falling')
  }
}


// required for testing:
if (typeof module !== 'undefined') module.exports = Knive;

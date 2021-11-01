class Knive {
  constructor(x, y, id) {
    this.id = id;
    this.x = x;     // Initial X is where the butcher hand is
    this.y = y;     // Initial Y is the top of the board
    this.direction = 0;
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
    knifeElement.style.top = `${this.y}px`;
    knifeElement.style.left = `${this.x}px`;

    // move knife!
    knifeElement.classList.add('falling')
  }

  moveKnive(direction) {

    // X didn't change (it was created where Hand's Butcher is) - only changed Y, by falling.

    let knifeDOMElement = document.getElementById(`knife${this.id}`)
    let newValue = 0;
    let prevTranslate = knifeDOMElement.style.transform

    if (prevTranslate == "") {

      // first fime we apply a transform: translate
      if (direction === 1) newValue = -40
      else if (direction === -1) newValue = 40

    } else {

      let positionPx = prevTranslate.indexOf('px')
      let prevValue = prevTranslate.slice(11, positionPx)     // position 11 because starts by "translateX("

      if (direction === 1) newValue = parseInt(prevValue) - 40
      else if (direction === -1) newValue = parseInt(prevValue) + 40

    }
  
    knifeDOMElement.style.transform = `translateX(${newValue}px)`
  }
}


// required for testing:
if (typeof module !== 'undefined') module.exports = Knive;

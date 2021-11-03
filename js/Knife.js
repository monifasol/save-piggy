class Knife {
  constructor(x, y, id) {
    this.id = id;
    this.x = x;             // Initial X is where the butcher hand is
    this.y = y;             // Initial Y is the top of the board
  }

  move(direction) {

    // X didn't change (it was created where Hand's Butcher is) - only changed Y, by falling.
    // Need to extract the Number of the previous "transform translate", to accumulate on it.

    try {

      let knifeDOMElement = document.getElementById(`knife${this.id}`)
      let prevTranslate = knifeDOMElement.style.transform
      
      console.log('*************************************')
      console.log('Does it exists?', knifeDOMElement, 'Id Knife', this.id)
      console.log("prevTranslate", prevTranslate)

      let newValue = ""

      if (direction === 1) newValue = this.moveBackwards(prevTranslate)
      if (direction === -1) newValue = this.moveForwards(prevTranslate)
    
      knifeDOMElement.style.transform = `translateX(${newValue}px)`

      console.log("Added value to style transform: ", knifeDOMElement.style.transform)
      console.log('*************************************')
      
    } catch(err) {
      console.log(`Hey Moni, you got an error! ${err}`, err)
    }

  }

  moveBackwards(prevTranslate) {

    let newValue = 0;

    if (prevTranslate == "" || prevTranslate == undefined) {   // then it's the first fime we apply "transform translate"
      newValue = -40
    } else {
      let positionPx = prevTranslate.indexOf('px')
      let prevValue = prevTranslate.slice(11, positionPx)      // position 11 because starts by "translateX("
      newValue = parseInt(prevValue) - 40
    }

    return newValue
  }

  moveForwards(prevTranslate) {

    let newValue = 0;

    if (prevTranslate == "" || prevTranslate == undefined) {    // then it's the first fime we apply "transform translate"
      newValue = 40
    } else {

      let positionPx = prevTranslate.indexOf('px')
      let prevValue = prevTranslate.slice(11, positionPx)       // position 11 because starts by "translateX("
      newValue = parseInt(prevValue) + 40
    }

    return newValue
  }

  throwKnife() {
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

}

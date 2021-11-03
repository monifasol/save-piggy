class Knife {
  constructor(x, y, id) {
    this.id = id;
    this.x = x;             // Initial X is where the butcher hand is
    this.y = y;             // Initial Y is the top of the board
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

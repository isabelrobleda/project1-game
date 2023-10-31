class Player {
    constructor(){
        this.width = 6;
        this.height = 12;
        this.positionX = 0
        this.positionY = 320

        this.playerElem = document.getElementById("player")
        this.playerElem.style.width = this.width + "vw"
        this.playerElem.style.height = this.height + "vh"
        this.playerElem.style.left = this.positionX + "px"
        this.playerElem.style.bottom = this.positionY + "px"
        
    } 

    updatePosition() {
        this.playerElem.style.bottom = this.positionY + "px"
    }
    moveUp(){
        this.positionY += 10
    }

    moveDown(){
        this.positionY -= 10
    }


}

class Target {
    constructor(){
        this.width = 3.5;
        this.height = 9;
        this.positionX = Math.floor(Math.random() * (100 - this.width + 1) + (this.width * 2))
        this.positionY = Math.floor(Math.random() * (100 - this.height + 1))
        this.targetElm = null;
        
        this.createElement()
    }

    createElement(){
        this.targetElm = document.createElement("div")
        this.targetElm.classList.add("target")
        this.targetElm.style.width = this.width + "vw"
        this.targetElm.style.height = this.height + "vh"
        this.targetElm.style.left = this.positionX + "vw"
        this.targetElm.style.bottom = this.positionY + "vh"

        const parentElem = document.getElementById("board")
        parentElem.appendChild(this.targetElm)
    }
}

class Bullet  {
    constructor(positionX, positionY){
        this.width = 1
        this.height = 0.9
        this.positionX = positionX + 40
        this.positionY = positionY + 60
        this.newBullet()

    }

    newBullet(){
        this.bulletElm = document.createElement("div")
        this.bulletElm.classList.add("bullet")
        this.bulletElm.style.width = this.width + "1px"
        this.bulletElm.style.height = this.height + "1px"
        this.bulletElm.style.left = this.positionX + "px"
        this.bulletElm.style.bottom = this.positionY + "px"

        const parentElem = document.getElementById("board")
        parentElem.appendChild(this.bulletElm)
    }

    updatePosition(){
        this.bulletElm.style.left = this.positionX + "px"
    }

    moveRight(){
        this.positionX++
    }
}

const player = new Player();
const targetArr = []
const bulletArr = []


setInterval(() => {
    const newTarget = new Target();
    targetArr.push(newTarget);

    if(newTarget.positionY < 0 - newTarget.height && newTarget.positionX > 100 - newTarget.width){
        newTarget.targetElm.remove()
        targetArr.shift()
    }
    setTimeout(() => {
        newTarget.targetElm.remove()
        targetArr.shift();
    }, 3000) 

}, 1000);

setInterval(() => {
    const newBullet = new Bullet(player.positionX, player.positionY)
    bulletArr.push(newBullet); 
}, 1000)


let counter = 0;
setInterval(() => {
    player.updatePosition();
    bulletArr.forEach((newBullet) => {
        newBullet.moveRight();
        newBullet.updatePosition();

        targetArr.forEach((target) => {
            const bulletInstance = newBullet.bulletElm.getBoundingClientRect();
            const targetInstance = target.targetElm.getBoundingClientRect();
            
            document.getElementById('counter-value').innerHTML = counter
            
            if (
                bulletInstance.left < targetInstance.right &&
                bulletInstance.right > targetInstance.left &&
                bulletInstance.top < targetInstance.bottom &&
                bulletInstance.bottom > targetInstance.top 
            ) {
                newBullet.bulletElm.remove();
                target.targetElm.remove();
                bulletArr.shift();
                targetArr.shift();
                counter++
            }

            if(counter === 5){
                location.href = "./win.html"
            }
        });
    });
}, 5);

document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "ArrowUp":
            player.moveUp()
            break;
        case "ArrowDown":
            player.moveDown()
            break;
    }
})
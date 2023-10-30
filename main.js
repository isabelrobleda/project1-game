class Player {
    constructor(){
        this.width = 5;
        this.height = 5;
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
        this.width = 5;
        this.height = 5;
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
    appearingTarget() {    
        this.targetElm.style.left = this.positionX + "vw";
        this.targetElm.style.bottom = this.positionY + "vh";
    }
}

class Bullet  {
    constructor(positionX, positionY){
       
        this.width = 1
        this.height = 1
        this.positionX = positionX 
        this.positionY = positionY + 14
        this.newBullet()

    }

    newBullet(){
        this.bulletElm = document.createElement("div")
        this.bulletElm.classList.add("bullet")
        this.bulletElm.style.width = this.width + "vw"
        this.bulletElm.style.height = this.height + "vh"
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
    targetArr.forEach((target) => {
        target.appearingTarget();
    });
}, 3000); 

setInterval(() => {
    const newTarget = new Target();
    targetArr.push(newTarget);
    
    setTimeout(() => {
        newTarget.targetElm.remove()
        targetArr.shift();
    }, 2000) 

}, 1000);

setInterval(() => {
    const newBullet = new Bullet(player.positionX, player.positionY)
    bulletArr.push(newBullet); 
}, 1000)

setInterval(() => {
    player.updatePosition()
    bulletArr.forEach((newBullet) => {
        newBullet.moveRight()
        newBullet.updatePosition()

        targetArr.forEach((target) => {
            if (
                target.positionX < newBullet.positionX + newBullet.width &&
                target.positionX + target.width > newBullet.positionX &&
                target.positionY < newBullet.positionY + newBullet.height &&
                target.positionY + target.height > newBullet.positionY
            ) {
                location.href = "./win.html"
            }
        })
    })
}, 5)


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
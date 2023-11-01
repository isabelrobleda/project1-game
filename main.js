class Player {
    constructor(){
        this.width = 100
        this.height = 200
        this.positionX = 0
        this.positionY = 300

        this.playerElem = document.getElementById("player")
        this.playerElem.style.width = this.width + "px"
        this.playerElem.style.height = this.height + "px"
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
    constructor() {
        this.width = 40
        this.height = 50
        const playerWidth = 100;
        const boardWidth = 1600;
        this.positionX = Math.floor(Math.random() * (boardWidth - this.width - playerWidth + 1)) + playerWidth; 
        this.positionY = Math.floor(Math.random() * (boardWidth - this.height - playerWidth + 1)) + playerWidth; 
       
        
        this.targetElm = null;
        
        this.createElement()
        
    }

    
        createElement(){
            this.targetElm = document.createElement("div")
            this.targetElm.classList.add("target")
            this.targetElm.style.width = this.width + "px"
            this.targetElm.style.height = this.height + "px"
            this.targetElm.style.left = this.positionX + "px"
            this.targetElm.style.bottom = this.positionY + "px"

            const parentElem = document.getElementById("board")
            parentElem.appendChild(this.targetElm)
        }
    
}

class Bullet  {
    constructor(positionX, positionY){
        this.width = 8
        this.height = 8
        this.positionX = positionX + 60
        this.positionY = positionY + 100
        
        this.newBullet()

    }

    newBullet(){
        this.bulletElm = document.createElement("div")
        this.bulletElm.classList.add("bullet")
        this.bulletElm.style.width = this.width + "px"
        this.bulletElm.style.height = this.height + "px"
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
            document.getElementById('counter-value').innerHTML = counter

            if (
                newBullet.positionX < target.positionX + target.width &&
                newBullet.positionX + newBullet.width > target.positionX &&
                newBullet.positionY < target.positionY + target.height &&
                newBullet.positionY + newBullet.height > target.positionY
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
}, 10);

document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "ArrowUp":
            if (player.positionY !== 750){player.moveUp()}
            break;
        case "ArrowDown":
            if (player.positionY !== 0){player.moveDown()}
            break;
    }
})
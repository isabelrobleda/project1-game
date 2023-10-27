class Player {
    constructor(){
        this.width = 5;
        this.height = 10;
        this.positionX = 0
        this.positionY = 40 - (this.height / 2)

        this.playerElem = document.getElementById("player")
        this.playerElem.style.width = this.width + "vw"
        this.playerElem.style.height = this.height + "vh"
        this.playerElem.style.left = this.positionX + "vw"
        this.playerElem.style.bottom = this.positionY + "vh"
        
    } 

    moveUp(){
        this.positionY++
        this.playerElem.style.bottom = this.positionY + "vh"
    }

    moveDown(){
        this.positionY--
        this.playerElem.style.bottom = this.positionY + "vh"
    }

    shoot(){
        console.log("i am shooting")
    }
}

class Target {
    constructor(){
        this.width = 5;
        this.height = 5;
        this.positionX = 50 //// generate random number between 0 and 100 - this.width. original formula Math.floor(Math.random() * (max - min + 1)) + min;
        this.positionY = 100;
        this.targetElm = null;

        this.createDomElement()
    }

    createDomElement(){
        this.targetElm = document.createElement("div")
        this.targetElm.classList.add("target")
        this.targetElm.style.width = this.width + "vw"
        this.targetElm.style.height = this.height + "vh"
        this.targetElm.style.left = this.positionX + "vw"
        this.targetElm.style.bottom = this.positionY + "vh"

        const parentElem = document.getElementById("board")
        parentElem.appendChild(this.targetElm)
    }
    moveDown() {    
        this.positionY--
        this.targetElm.style.bottom = this.positionY + "vh"
    }
}


const player = new Player();
const targetArr = []

setInterval(() => {
    const newTarget = new Target();
    targetArr.push(newTarget);
}, 2000);

setInterval(() => {
    targetArr.forEach((targetItem) => {
        targetItem.moveDown()

        //// remove obstacles if outside
        if (targetItem.positionY < 0 - targetItem.height) {
            ///remove dom element
            targetItem.targetElm.remove()

            ///remove from array
            targetArr.shift()
        }

    })
}, 20) 

document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "ArrowUp":
            player.moveUp()
            break;
        case "ArrowDown":
            player.moveDown()
            break;
        case "Space":
            player.shoot()
            break;
    }
})
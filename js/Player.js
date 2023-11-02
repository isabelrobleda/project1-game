class Player {
    constructor() {
        this.width = 70;
        this.height = 70;
        this.positionX = 0;
        this.positionY = 300;

        this.playerElem = document.getElementById("player");
        this.playerElem.style.width = this.width + "px";
        this.playerElem.style.height = this.height + "px";
        this.playerElem.style.left = this.positionX + "px";
        this.playerElem.style.bottom = this.positionY + "px";

    }

    updatePosition() {
        this.playerElem.style.bottom = this.positionY + "px";
    }

    moveUp() {
        this.positionY += 10;
    }

    moveDown() {
        this.positionY -= 10;
    }


}

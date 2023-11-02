class Bullet {
    constructor(positionX, positionY) {
        this.width = 8;
        this.height = 8;
        this.positionX = positionX + 50;
        this.positionY = positionY + 40;

        this.newBullet();

    }

    newBullet() {
        this.bulletElm = document.createElement("div");
        this.bulletElm.classList.add("bullet");
        this.bulletElm.style.width = this.width + "px";
        this.bulletElm.style.height = this.height + "px";
        this.bulletElm.style.left = this.positionX + "px";
        this.bulletElm.style.bottom = this.positionY + "px";

        const parentElem = document.getElementById("board");
        parentElem.appendChild(this.bulletElm);
    }

    updatePosition() {
        this.bulletElm.style.left = this.positionX + "px";
    }

    moveRight() {
        this.positionX++;
    }
}

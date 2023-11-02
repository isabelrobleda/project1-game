class Target {
    constructor() {
        this.width = 40;
        this.height = 50;
        this.positionX = Math.floor(Math.random() * (boardWidth - this.width) + playerWidth); 
        this.positionY = Math.floor(Math.random() * (boardHeight - this.height));
        this.targetElm = null;

        this.createElement();

    }

    createElement() {
        this.targetElm = document.createElement("div");
        this.targetElm.classList.add("target");
        this.targetElm.style.width = this.width + "px";
        this.targetElm.style.height = this.height + "px";
        this.targetElm.style.left = this.positionX + "px";
        this.targetElm.style.bottom = this.positionY + "px";

        const parentElem = document.getElementById("board");
        parentElem.appendChild(this.targetElm);
    }

}

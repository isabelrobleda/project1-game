const playerWidth = 70;
const boardWidth = 1280;
const boardHeight = 650;
const player = new Player();
const targetArr = []
const bulletArr = []


setInterval(() => {
    const newBullet = new Bullet(player.positionX, player.positionY)
    bulletArr.push(newBullet);

    if (newBullet.positionX > boardWidth) {
        bulletArr.shift()
    }
}, 1000)


let counter = 0;

setInterval(() => {
    player.updatePosition();

    bulletArr.forEach((newBullet, bulletIndex) => {
        newBullet.updatePosition();

        targetArr.forEach((target, targetIndex) => {
            if (
                newBullet.positionX < target.positionX + target.width &&
                newBullet.positionX + newBullet.width > target.positionX &&
                newBullet.positionY < target.positionY + target.height &&
                newBullet.positionY + newBullet.height > target.positionY
            ) {
                counter++
                newBullet.bulletElm.remove();
                target.targetElm.remove();
                targetArr.splice(targetIndex, 1)
                bulletArr.splice(bulletIndex, 1)
            }
        });

        document.getElementById('counter-value').innerHTML = counter
        
        if (counter === 3) {
            location.href = "../project1-game/win.html" 
        } 
    })
}, 10)

setInterval(() => {
    const newTarget = new Target();
    targetArr.push(newTarget);

    setTimeout(() => {
        newTarget.targetElm.remove()
        targetArr.shift();
    }, 4000)
}, 1000);


document.addEventListener("keydown", (e) => {
    switch (e.code) {
        case "ArrowUp":
            if (player.positionY !== 580) { player.moveUp() }
            break;
        case "ArrowDown":
            if (player.positionY !== 0) { player.moveDown() }
            break;
    }
})
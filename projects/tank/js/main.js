'use strict';

let gameStart = false;

let start = document.createElement('div');
start.id = 'start';
start.innerHTML = 'START';
start.style = 'width: 136px; padding: 12px; color: white; text-align: center; font-size: 32px;' 
    + 'border: 2px solid white; border-radius: 36px; opacity: 1; transition: opacity 1s liner;';
start.onclick = function () {
    start.classList.add('hide');
    setTimeout(startGame, 1000);
}
document.body.appendChild(start);

//////////////////////////////////////////////////////////////////

var canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const C_WIDTH = canvas.width = 1200;
const C_HEIGHT = canvas.height = 840;
const C_STEP = 30; // 30 -> 4 ceil for 1 object !!!!
const lines = C_HEIGHT / C_STEP;
const ceils = C_WIDTH / C_STEP;
/*
[0] - empty for all
[1] - closet for move
*/
const area = [];
for (let l = 0; l < lines; l++) {
    area.push([]);
    for (let c = 0; c < ceils; c++) {
        area[l].push(0);
    }
}

const tank = new Image();
tank.src = './src/img/tank2.png';

class Tank {
    
    width = 60;
    height = 60;
    frames = 4;
    isGo = false;
    speed = 3;
    frameSpeed = 2;
    currentFrame = 0;

    constructor (direction, line, ceil) {
        this.direction = direction;
        this.turnTo = direction;
        this.line = line;
        this.ceil = ceil;
        this.y = this.line * C_STEP;
        this.x = this.ceil * C_STEP;

        area[this.line][this.ceil] = 1;
        area[this.line + 1][this.ceil] = 1;
        area[this.line][this.ceil + 1] = 1;
        area[this.line + 1][this.ceil + 1] = 1;
    }

    animate(frame) {

        ctx.drawImage(
            tank,
            this.currentFrame * this.width, this.height * this.direction, this.width, this.height,
            this.x, this.y, this.width, this.height
        );
        
        if (frame % this.frameSpeed === 0) {

            if (this.x % C_STEP !== 0 || this.y % C_STEP !== 0) {
                this.move();
            } else {
                this.direction = this.turnTo;
                if (this.isGo) this.move();
            }
        }
        
    }

    move() {

        switch (this.direction) {
            case 0 : this.y -= this.speed; break;
            case 1 : this.x += this.speed; break;
            case 2 : this.y += this.speed; break;
            case 3 : this.x -= this.speed; break;
            default : console.log('ERROR: moveTo get wrong direction:', this.direction);
        }

        // if (this.x % C_STEP === 0 && this.y % C_STEP === 0) this.isGo = false;

        if (this.currentFrame < this.frames) this.currentFrame++;
        else this.currentFrame = 0;
    }
}

let tank_p1 = new Tank(0, 16, 18);

let tank_p2 = new Tank(0, 16, 22);

/*******************
    ANIMATION 
*/
let frame = 0;

function animate() {
    ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

    tank_p1.animate(frame);

    frame++;
    window.requestAnimationFrame(animate);
}

/*******************
    EVENTS 
*/
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {

    switch(e.code) {
        case 'KeyW' : tank_p1.turnTo = 0; tank_p1.isGo = tank_p1.turnTo === tank_p1.direction; break;
        case 'KeyD' : tank_p1.turnTo = 1; tank_p1.isGo = tank_p1.turnTo === tank_p1.direction; break;
        case 'KeyS' : tank_p1.turnTo = 2; tank_p1.isGo = tank_p1.turnTo === tank_p1.direction; break;
        case 'KeyA' : tank_p1.turnTo = 3; tank_p1.isGo = tank_p1.turnTo === tank_p1.direction; break;
    }

}


function keyUpHandler(e) {
    if (tank_p1.isGo) {
        switch(e.code) {
            case 'KeyW' : if (tank_p1.turnTo === 0) tank_p1.isGo = false; break;
            case 'KeyD' : if (tank_p1.turnTo === 1) tank_p1.isGo = false; break;
            case 'KeyS' : if (tank_p1.turnTo === 2) tank_p1.isGo = false; break;
            case 'KeyA' : if (tank_p1.turnTo === 3) tank_p1.isGo = false; break;
        }
    }
}

function startGame () {
    start.remove();
    // if (!document.fullscreenElement) document.documentElement.requestFullscreen();
    document.body.appendChild(canvas);
    //document.body.classList.add('hide-cursor');
    gameStart = true;
    animate();
}
'use strict';

/*
let supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
alert((supportsTouch) ? 'USE YOUR TOUCH' : 'USE YOUR KEYBOARD');
*/

let onLendScapeOrientation = testLendScapeOrientation();

//screen.orientation.lock('landscape'); console.log(screen.orientation);

function testLendScapeOrientation() {
    return document.documentElement.clientWidth > document.documentElement.clientHeight;
}

/*******************
    SHELl
*/



/*******************
    CANVAS
*/

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.style.opacity = 0;
const ctx = canvas.getContext("2d");

let convasOpacity = 0.001;
function setConvasOpacity() {
    convasOpacity *= 1.1;
    canvas.style.opacity = convasOpacity;
    if (convasOpacity < 1) setTimeout(setConvasOpacity, 30);
    else canvas.style.opacity = 1;
}
setConvasOpacity();

let VIEW_W, VIEW_H;
function windowResized () {
    onLendScapeOrientation = testLendScapeOrientation();
    VIEW_W = document.documentElement.clientWidth;
    VIEW_H = document.documentElement.clientHeight;
    canvas.width = VIEW_W;
    canvas.height = VIEW_H;
}
windowResized();
window.addEventListener("resize", windowResized);

/*******************
    PLAYER 
*/

const ship = new Image();
ship.src = './src/images/sprites/ship.png';

class Ship {
    width = 246;
    height = 98;

    scale_k = VIEW_W / 1920;
    scale = (this.scale_k > 1) ? 1 : this.scale_k;
    
    wScaled = this.width * this.scale;
    hScaled = this.height * this.scale;
    actionFrame = 2;
    speed = 6;
    biasX = this.width / 2 * this.scale;
    biasRangeY = this.hScaled / 5;
    biasY = (Math.floor(Math.random() * 2)) ? -this.scale : this.scale;

    constructor () {
        this.cx = VIEW_W / 2;
        this.cy = VIEW_H - this.hScaled * 2;
        this.x = this.cx - this.wScaled / 2;
        this.y = this.cy - this.hScaled / 2;
        this.biasMax = this.y + this.biasRangeY;
        this.biasMin = this.y - this.biasRangeY;
    }

    animate(frame) {

        ctx.drawImage(
            ship, 0, 0, this.width, this.height,
            this.x, this.y, this.wScaled, this.hScaled
        );
        
        if (frame % this.actionFrame === 0) {
            if (mouseX > (this.x + this.biasX)) this.x += (mouseX - (this.x + this.biasX) > this.speed) ? this.speed : 1;
            if (mouseX < (this.x + this.biasX)) this.x -= ((this.x + this.biasX) - mouseX > this.speed) ? this.speed : 1;

            if (this.biasY > 0) this.biasY = (this.y < this.biasMax) ? this.scale : -this.scale;
            else this.biasY = (this.y > this.biasMin) ? -this.scale : this.scale;
            this.y += this.biasY;
        }
    }
}

let playerShip = new Ship();

/*******************
    AREA POINTS 
*/

let area = new Object();

area.biasStepsX = 15;
area.biasStepsY = 9;
area.biasX = VIEW_W / area.biasStepsX; // [[#,#,#,#,#],[#,#,(#),#,#],[#,#,#,#,#]]
area.biasY = VIEW_H / area.biasStepsY;
area.biasStartPointX = ((area.biasStepsX - 5) / 2) * area.biasX;
area.biasStartPointY = ((area.biasStepsY - 3) / 2) * area.biasY;
area.speedK = 0.1;
area.startBiasAreas = [
    // line 1 of 3
    {
        startX : Math.ceil(area.biasStartPointX),
        startY : Math.ceil(area.biasStartPointY),
        speedX : -1 * area.speedK,
        speedY : -0.7 * area.speedK
    },
    {
        startX : Math.ceil(area.biasStartPointX + area.biasX),
        startY : Math.ceil(area.biasStartPointY),
        speedX : -0.7 * area.speedK,
        speedY : -0.7 * area.speedK
    },
    {
        startX : Math.ceil(area.biasStartPointX + area.biasX * 2),
        startY : Math.ceil(area.biasStartPointY),
        speedX : 0,
        speedY : -0.7 * area.speedK
    },
    {
        startX : Math.ceil(area.biasStartPointX + area.biasX * 3),
        startY : Math.ceil(area.biasStartPointY),
        speedX : 0.7 * area.speedK,
        speedY : -0.7 * area.speedK
    },
    {
        startX : Math.ceil(area.biasStartPointX + area.biasX * 4),
        startY : Math.ceil(area.biasStartPointY),
        speedX : 1 * area.speedK,
        speedY : -0.7 * area.speedK
    },
    // line 2 of 3
    {
        startX : Math.ceil(area.biasStartPointX),
        startY : Math.ceil(area.biasStartPointY + area.biasY),
        speedX : -1 * area.speedK,
        speedY : 0
    },
    {
        startX : Math.ceil(area.biasStartPointX + area.biasX),
        startY : Math.ceil(area.biasStartPointY + area.biasY),
        speedX : -0.7 * area.speedK,
        speedY : 0
    },
    /* { // CENTER CENTER
        startX : Math.ceil(area.biasStartPointX + area.biasX * 2),
        startY : Math.ceil(area.biasStartPointY + area.biasY * 2),
        speedX : -0.7 * area.speedK,
        speedY : -0.7 * area.speedK
    }, */
    {
        startX : Math.ceil(area.biasStartPointX + area.biasX * 3),
        startY : Math.ceil(area.biasStartPointY + area.biasY),
        speedX : 0.7 * area.speedK,
        speedY : 0
    },
    {
        startX : Math.ceil(area.biasStartPointX + area.biasX * 4),
        startY : Math.ceil(area.biasStartPointY + area.biasY),
        speedX : 1 * area.speedK,
        speedY : 0
    },
    // line 3 of 3
    {
        startX : Math.ceil(area.biasStartPointX),
        startY : Math.ceil(area.biasStartPointY + area.biasY * 2),
        speedX : -1 * area.speedK,
        speedY : 0.7 * area.speedK
    },
    {
        startX : Math.ceil(area.biasStartPointX + area.biasX),
        startY : Math.ceil(area.biasStartPointY + area.biasY * 2),
        speedX : -0.7 * area.speedK,
        speedY : 0.7 * area.speedK
    },
    {
        startX : Math.ceil(area.biasStartPointX + area.biasX * 2),
        startY : Math.ceil(area.biasStartPointY + area.biasY * 2),
        speedX : 0,
        speedY : 0.7 * area.speedK
    },
    {
        startX : Math.ceil(area.biasStartPointX + area.biasX * 3),
        startY : Math.ceil(area.biasStartPointY + area.biasY * 2),
        speedX : 0.7 * area.speedK,
        speedY : 0.7 * area.speedK
    },
    {
        startX : Math.ceil(area.biasStartPointX + area.biasX * 4),
        startY : Math.ceil(area.biasStartPointY + area.biasY * 2),
        speedX : 1 * area.speedK,
        speedY : 0.7 * area.speedK
    }
];
area.startBiasAreasSize = area.startBiasAreas.length;

/*******************
    STARS 
*/

const stars = new Image();
stars.src = './src/images/sprites/stars_323x300px_5x5fr.png';
stars.w = 323;
stars.h = 300;
stars.minPointX = 0 - stars.w;
stars.minPointY = 0 - stars.h;

stars.types = [0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 3, 4];  // * + x # @
stars.colors = [0, 0, 1, 2, 3, 3, 3, 3, 3, 3, 4, 4]; // B G R W E

class Star {
    
    scale = 0.02; // CONST 
    kss_arr = [
        {sc: 1.001, sp: 1.005},
        {sc: 1.002, sp: 1.005},
        {sc: 1.002, sp: 1.01},
        {sc: 1.003, sp: 1.01},
        {sc: 1.003, sp: 1.015},
        {sc: 1.004, sp: 1.015},
        {sc: 1.004, sp: 1.02},
        {sc: 1.005, sp: 1.02},
        {sc: 1.005, sp: 1.025},
        {sc: 1.006, sp: 1.025},
        {sc: 1.006, sp: 1.03},
        {sc: 1.007, sp: 1.03}
    ];
    kss_rr = Math.floor(Math.random() * 12);
    scale_k = this.kss_arr[this.kss_rr].sc;
    speed_k = this.kss_arr[this.kss_rr].sp;
    startArea = Math.floor(Math.random() * area.startBiasAreasSize);

    constructor () {
        this.cx = area.startBiasAreas[this.startArea].startX + Math.floor(Math.random() * area.biasX);
        this.cy = area.startBiasAreas[this.startArea].startY + Math.floor(Math.random() * area.biasY);

        this.x = this.cx - (stars.w / 2) * this.scale;
        this.y = this.cy - (stars.h / 2) * this.scale;
        this.xSpeed = area.startBiasAreas[this.startArea].speedX;
        this.ySpeed = area.startBiasAreas[this.startArea].speedY;

        this.color = stars.colors[Math.floor(Math.random() * 12)];
        this.type = stars.types[Math.floor(Math.random() * 12)];
    }

    animate(frame) {

        ctx.drawImage(
            stars, stars.w * this.type, stars.h * this.color, stars.w, stars.h,
            this.x, this.y, stars.w * this.scale, stars.h * this.scale
        );
        
        this.cx += this.xSpeed;
        this.cy += this.ySpeed;
        this.getXY();

        this.scale *= this.scale_k;
        this.xSpeed *= this.speed_k;
        this.ySpeed *= this.speed_k;

        if (this.x < stars.minPointX || this.x > VIEW_W || this.y < stars.minPointY || this.y > VIEW_H) removeStar(this);
    }

    getXY () {
        this.x = this.cx - (stars.w / 2) * this.scale;
        this.y = this.cy - (stars.h / 2) * this.scale;
    }
}

let starsArr = [];

function removeStar(star) {
    let index = starsArr.indexOf(star);
    if (~index) starsArr.splice(index, 1);
    delete star.__prototype__;
}

function addNewStar() {
    starsArr.push( new Star() );
    setTimeout(addNewStar, 30 + Math.floor(Math.random() * 90));
}

addNewStar();

/*******************
    SPACE CLOUDS 
*/

const spaceCloud = new Image();
spaceCloud.src = './src/images/sprites/clouds_1280x560px_4x4fr.png';
spaceCloud.w = 1280;
spaceCloud.h = 560;
spaceCloud.minPointX = 0 - spaceCloud.w;
spaceCloud.minPointY = 0 - spaceCloud.h;

class SpaceCloud {
    
    scale = 0.001; // CONST 
    kss_arr = [
        {sc: 1.002, sp: 1.0003},
        {sc: 1.003, sp: 1.0005},
        {sc: 1.004, sp: 1.0007}
    ];
    kss_rr = Math.floor(Math.random() * 3);
    scale_k = this.kss_arr[this.kss_rr].sc;
    speed_k = this.kss_arr[this.kss_rr].sp;
    startArea = Math.floor(Math.random() * (area.startBiasAreasSize + 2));

    constructor () {
        this.cx = (this.startArea < area.startBiasAreasSize)
                ? area.startBiasAreas[this.startArea].startX + Math.floor(Math.random() * area.biasX)
                : Math.ceil(area.biasStartPointX + area.biasX * 2) + Math.floor(Math.random() * area.biasX);
        this.cy = (this.startArea < area.startBiasAreasSize)
                ? area.startBiasAreas[this.startArea].startY + Math.floor(Math.random() * area.biasY)
                : Math.ceil(area.biasStartPointY + area.biasY * 2) + Math.floor(Math.random() * area.biasY);

        this.x = this.cx - (spaceCloud.w / 2) * this.scale;
        this.y = this.cy - (spaceCloud.h / 2) * this.scale;
        this.xSpeed = (this.startArea < area.startBiasAreasSize) ? area.startBiasAreas[this.startArea].speedX : 0;
        this.ySpeed = (this.startArea < area.startBiasAreasSize) ? area.startBiasAreas[this.startArea].speedY : 0;

        this.color = Math.floor(Math.random() * 4);
        this.type = Math.floor(Math.random() * 4);
    }

    animate(frame) {

        if (this.scale > 1) ctx.globalAlpha = 2 - this.scale / 2;

        ctx.drawImage(
            spaceCloud, spaceCloud.w * this.color, spaceCloud.h * this.type, spaceCloud.w, spaceCloud.h,
            this.x, this.y, spaceCloud.w * this.scale, spaceCloud.h * this.scale
        );

        if (this.scale > 1) ctx.globalAlpha = 1;
        
        this.cx += this.xSpeed;
        this.cy += this.ySpeed;
        this.getXY();

        this.scale *= this.scale_k;
        this.xSpeed *= this.speed_k;
        this.ySpeed *= this.speed_k;

        if (this.scale > 4) removeSpaceCloud(this);
    }

    getXY () {
        this.x = this.cx - (spaceCloud.w / 2) * this.scale;
        this.y = this.cy - (spaceCloud.h / 2) * this.scale;
    }
}

let spaceCloudsArr = [];

function removeSpaceCloud(cloud) {
    let index = spaceCloudsArr.indexOf(cloud);
    if (~index) spaceCloudsArr.splice(index, 1);
    delete cloud.__prototype__;
}

function addNewSpaceCloud() {
    spaceCloudsArr.push( new SpaceCloud() );
    setTimeout(addNewSpaceCloud, 1200 + Math.floor(Math.random() * 3600));
}

addNewSpaceCloud();

/*******************
    BLACK HOLE 
*/

const blackHole = new Image();
blackHole.src = './src/images/sprites/black-hole_760x760px.png';
blackHole.w = 760;
blackHole.h = 760;
blackHole.minPointX = 0 - blackHole.w;
blackHole.minPointY = 0 - blackHole.h;

blackHole.types = [0, 0, 0, 0, 0, 0, 1, 1, 2, 3, 3, 4];  // * + x # @
blackHole.colors = [0, 0, 1, 2, 3, 3, 3, 3, 3, 3, 4, 4]; // B G R W E

class BlackHole {
    
    scale = 0.001; // CONST 
    kss_arr = [
        {sc: 1.001, sp: 1.0005},
        {sc: 1.0015, sp: 1.0006},
        {sc: 1.002, sp: 1.0007},
        {sc: 1.0025, sp: 1.0008},
        {sc: 1.003, sp: 1.0009}
    ];
    kss_rr = Math.floor(Math.random() * 5);
    scale_k = this.kss_arr[this.kss_rr].sc;
    speed_k = this.kss_arr[this.kss_rr].sp;
    startArea = Math.floor(Math.random() * area.startBiasAreasSize);
    spin_sp = 30 + Math.floor(Math.random() * 71);

    constructor () {
        this.cx = area.startBiasAreas[this.startArea].startX + Math.floor(Math.random() * area.biasX);
        this.cy = area.startBiasAreas[this.startArea].startY + Math.floor(Math.random() * area.biasY);

        this.x = this.cx - (blackHole.w / 2) * this.scale;
        this.y = this.cy - (blackHole.h / 2) * this.scale;
        this.xSpeed = area.startBiasAreas[this.startArea].speedX;
        this.ySpeed = area.startBiasAreas[this.startArea].speedY;
    }

    animate(frame) {

        if (this.scale > 1) ctx.globalAlpha = 2 - this.scale / 2;

        ctx.setTransform(this.scale, 0, 0, this.scale, this.cx, this.cy); // sets scale and origin
        ctx.rotate((frame % 36000) / this.spin_sp);
        ctx.drawImage(blackHole, -380, -380);
        ctx.setTransform(1,0,0,1,0,0);

        if (this.scale > 1) ctx.globalAlpha = 1;
        
        this.cx += this.xSpeed;
        this.cy += this.ySpeed;
        this.getXY();

        this.scale *= this.scale_k;
        this.xSpeed *= this.speed_k;
        this.ySpeed *= this.speed_k;

        if (this.scale > 4) removeBlackHole(this);
    }

    getXY () {
        this.x = this.cx - (stars.w / 2) * this.scale;
        this.y = this.cy - (stars.h / 2) * this.scale;
    }
}

let blackHolesArr = [];

function removeBlackHole(id) {
    let index = blackHolesArr.indexOf(id);
    if (~index) blackHolesArr.splice(index, 1);
    delete id.__prototype__;
}

function addNewBlackHole() {
    blackHolesArr.push( new BlackHole() );
    setTimeout(addNewBlackHole, 12000 + Math.floor(Math.random() * 36000));
}

addNewBlackHole();

/*******************
    PLANETS 
*/

const planets = new Image();
planets.src = './src/images/sprites/planets_620x620px_4x3fr.png';
planets.w = 620;
planets.h = 620;
planets.minPointX = 0 - planets.w;
planets.minPointY = 0 - planets.h;

class Planet {
    
    scale = 0.002; // CONST 
    kss_arr = [
        {sc: 1.0010, sp: 1.001},
        {sc: 1.0015, sp: 1.001},
        {sc: 1.0020, sp: 1.001},
        {sc: 1.0015, sp: 1.002},
        {sc: 1.0020, sp: 1.002},
        {sc: 1.0025, sp: 1.002},
        {sc: 1.0030, sp: 1.002},
        {sc: 1.0035, sp: 1.002}
    ];
    kss_rr = Math.floor(Math.random() * 8);
    scale_k = this.kss_arr[this.kss_rr].sc;
    speed_k = this.kss_arr[this.kss_rr].sp;
    startArea = Math.floor(Math.random() * area.startBiasAreasSize);

    constructor () {
        this.cx = area.startBiasAreas[this.startArea].startX + Math.floor(Math.random() * area.biasX);
        this.cy = area.startBiasAreas[this.startArea].startY + Math.floor(Math.random() * area.biasY);

        this.x = this.cx - (planets.w / 2) * this.scale;
        this.y = this.cy - (planets.h / 2) * this.scale;
        this.xSpeed = area.startBiasAreas[this.startArea].speedX;
        this.ySpeed = area.startBiasAreas[this.startArea].speedY;

        this.imgX = Math.floor(Math.random() * 4);
        this.imgY = Math.floor(Math.random() * 3);
    }

    animate(frame) {

        ctx.drawImage(
            planets, planets.w * this.imgX, planets.h * this.imgY, planets.w, planets.h,
            this.x, this.y, planets.w * this.scale, planets.h * this.scale
        );
        
        this.cx += this.xSpeed;
        this.cy += this.ySpeed;
        this.getXY();

        this.scale *= this.scale_k;
        this.xSpeed *= this.speed_k;
        this.ySpeed *= this.speed_k;

        if (this.x < planets.minPointX || this.x > VIEW_W || this.y < planets.minPointY || this.y > VIEW_H) removePlanet(this);
    }

    getXY () {
        this.x = this.cx - (planets.w / 2) * this.scale;
        this.y = this.cy - (planets.h / 2) * this.scale;
    }
}

let planetsArr = [];

function removePlanet(id) {
    let index = planetsArr.indexOf(id);
    if (~index) planetsArr.splice(index, 1);
    delete id.__prototype__;
}

function addNewPlanet() {
    planetsArr.push( new Planet() );
    setTimeout(addNewPlanet, 6000 + Math.floor(Math.random() * 18000));
}

addNewPlanet();

/*******************
    BIG PLANETS 
*/

const bigPlanets = new Image();
bigPlanets.src = './src/images/sprites/planets_1280x1280px_3x2fr.png';
bigPlanets.w = 1280;
bigPlanets.h = 1280;
bigPlanets.minPointX = 0 - bigPlanets.w;
bigPlanets.minPointY = 0 - bigPlanets.h;

class BigPlanet {
    
    scale = 0.001; // CONST 
    kss_arr = [
        {sc: 1.0026, sp: 1.0012},
        {sc: 1.0032, sp: 1.0015},
        {sc: 1.0038, sp: 1.0018}
    ];
    kss_rr = Math.floor(Math.random() * 3);
    scale_k = this.kss_arr[this.kss_rr].sc;
    speed_k = this.kss_arr[this.kss_rr].sp;
    startArea = Math.floor(Math.random() * area.startBiasAreasSize);

    constructor () {
        this.cx = area.startBiasAreas[this.startArea].startX + Math.floor(Math.random() * area.biasX);
        this.cy = area.startBiasAreas[this.startArea].startY + Math.floor(Math.random() * area.biasY);

        this.x = this.cx - (bigPlanets.w / 2) * this.scale;
        this.y = this.cy - (bigPlanets.h / 2) * this.scale;
        this.xSpeed = area.startBiasAreas[this.startArea].speedX;
        this.ySpeed = area.startBiasAreas[this.startArea].speedY;

        this.imgX = Math.floor(Math.random() * 3);
        this.imgY = Math.floor(Math.random() * 2);
    }

    animate(frame) {

        ctx.drawImage(
            bigPlanets, bigPlanets.w * this.imgX, bigPlanets.h * this.imgY, bigPlanets.w, bigPlanets.h,
            this.x, this.y, bigPlanets.w * this.scale, bigPlanets.h * this.scale
        );
        
        this.cx += this.xSpeed;
        this.cy += this.ySpeed;
        this.getXY();

        this.scale *= this.scale_k;
        this.xSpeed *= this.speed_k;
        this.ySpeed *= this.speed_k;

        if (this.x < bigPlanets.minPointX || this.x > VIEW_W || this.y < bigPlanets.minPointY || this.y > VIEW_H) removeBigPlanet(this);
    }

    getXY () {
        this.x = this.cx - (bigPlanets.w / 2) * this.scale;
        this.y = this.cy - (bigPlanets.h / 2) * this.scale;
    }
}

let bigPlanetsArr = [];

function removeBigPlanet(id) {
    let index = bigPlanetsArr.indexOf(id);
    if (~index) bigPlanetsArr.splice(index, 1);
    delete id.__prototype__;
}

function addNewBigPlanet() {
    bigPlanetsArr.push( new BigPlanet() );
    setTimeout(addNewBigPlanet, 18000 + Math.floor(Math.random() * 54000));
}

addNewBigPlanet();

/*******************
    ENEMIES 
*/

const enemyShip1 = new Image();
enemyShip1.src = './src/images/sprites/shipEnemyType1.png';
enemyShip1.w = 360;
enemyShip1.h = 180;
enemyShip1.minPointX = 0 - enemyShip1.w;
enemyShip1.minPointY = 0 - enemyShip1.h;

const enemyShip2 = new Image();
enemyShip2.src = './src/images/sprites/shipEnemyType2.png';
enemyShip2.w = 480;
enemyShip2.h = 400;
enemyShip2.minPointX = 0 - enemyShip2.w;
enemyShip2.minPointY = 0 - enemyShip2.h;

class EnemyShip {
    
    scale = 0.005; // CONST 

    type = Math.floor(Math.random() * 2);
    scale_k = (this.type === 0) ? 1.005 : 1.007;
    speed_k = (this.type === 0) ? 1.002 : 1.003;
    startArea = 9 + Math.floor(Math.random() * (area.startBiasAreasSize - 9));

    img = (this.type === 0) ? enemyShip1 : enemyShip2;

    constructor () {
        this.cx = area.startBiasAreas[this.startArea].startX + area.biasX / 2;
        this.cy = area.startBiasAreas[this.startArea].startY - area.biasY / 2;

        this.x = this.cx - (stars.w / 2) * this.scale;
        this.y = this.cy - (stars.h / 2) * this.scale;
        this.xSpeed = area.startBiasAreas[this.startArea].speedX;
        this.ySpeed = area.startBiasAreas[this.startArea].speedY;
    }

    animate(frame) {

        if (this.scale > 0.6) ctx.globalAlpha = 1.6 - this.scale;
        
        ctx.drawImage(
            this.img, 0, 0, this.img.w, this.img.h,
            this.x, this.y, this.img.w * this.scale, this.img.h * this.scale
        );
        
        if (this.scale > 0.6) ctx.globalAlpha = 1;
        
        this.cx += this.xSpeed;
        this.cy += this.ySpeed;
        this.getXY();

        this.scale *= this.scale_k;
        this.xSpeed *= this.speed_k;
        this.ySpeed *= this.speed_k;

        if (this.scale > 1.6) removeEnemy(this);
    }

    getXY () {
        this.x = this.cx - (this.img.w / 2) * this.scale;
        this.y = this.cy - (this.img.h / 2) * this.scale;
    }
}

let enemiesArr = [];

function removeEnemy(id) {
    let index = enemiesArr.indexOf(id);
    if (~index) enemiesArr.splice(index, 1);
    delete id.__prototype__;
}

function addNewEnemy() {
    enemiesArr.push( new EnemyShip() );
    setTimeout(addNewEnemy, 3600 + Math.floor(Math.random() * 10800));
}

addNewEnemy();


/***************
    MOUSE LISTENER
*/

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

canvas.addEventListener('mousemove', function(evt) {
    let mouse = getMousePos(canvas, evt);
    mouseX = mouse.x;
    mouseY = mouse.y;
}, false);

canvas.addEventListener('click', function() {
    console.log('SHOOT');
}, false);

/*******************
    ANIMATION 
*/
let frame = 0;

function animate() {
    ctx.clearRect(0, 0, VIEW_W, VIEW_H);

    blackHolesArr.forEach(el => el.animate(frame));
    spaceCloudsArr.forEach(el => el.animate(frame));

    starsArr.forEach(el => el.animate(frame));

    bigPlanetsArr.forEach(el => el.animate(frame));
    planetsArr.forEach(el => el.animate(frame));
    
    enemiesArr.forEach(el => el.animate(frame));
    playerShip.animate(frame);
    
    frame++;
    window.requestAnimationFrame(animate);
}
animate();
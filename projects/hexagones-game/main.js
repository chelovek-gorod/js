/*********
 *
 *   JS
 * 
 ********/

'use strict';

/*************************
 *   TEST START GAME
 */

let START_PUSHED = false;
let SVG_LOADED = false;
let ON_GAME = false;
let NEW_POINT = 0;

let FILLER = [1, 1, 1];

function animateTopHexAwait(hex, board) {
    let nextBoard = 0;
    let nextHex = 0;

    switch (hex) {
        case 0 :
            nextBoard = (board === 0) ? 4 : (board === 5) ? 0 : board + 1;
            nextHex = (board === 0) ? 1 : 0;
            break;
        case 1 :
            nextBoard = (board === 2) ? 4 : (board === 5) ? 1 : (board === 0) ? 5 : board - 1;
            nextHex = (board === 2) ? 2 : (board === 5) ? 0 : 1;
            break;
        case 2 :
            nextBoard = (board === 3) ? 1 : (board === 5) ? 0 : board + 1;
            nextHex = (board === 3) ? 1 : 2;
            break;
    }

    if (!NEW_POINT) topHexArr[nextHex]['b' + nextBoard].setAttribute('fill', C_GREEN);
    setTimeout(() => topHexArr[hex]['b' + board].setAttribute('fill', C_DARK), 900);

    if (NEW_POINT) animateTopHexNewPoint(NEW_POINT - 1);
    else setTimeout(animateTopHexAwait, 150, nextHex, nextBoard);
}

function animateTopHexNewPoint (id) {
    let delay = 150;
    let timeOut = 0;
    for (let i = 0; i < 6; i++) {
        setTimeout(() => topHexArr[id]['b' + i].setAttribute('fill', C_GREEN), timeOut += delay);
        setTimeout(() => topHexArr[id]['b' + i].setAttribute('fill', C_DARK), timeOut + delay * 3);
    }
    if (NEW_POINT) setTimeout(animateTopHexNewPoint, timeOut, NEW_POINT - 1);
    else setTimeout(animateTopHexAwait, timeOut + delay * 3, 0, 4);
}

function animateTopHexMain(id) {
    topHexArr[id].main.setAttribute('fill', C_DARK);
    setTimeout(() => topHexArr[id].main.setAttribute('fill', C_GREEN), 600);
    setTimeout(() => { if (NEW_POINT) animateTopHexMain(NEW_POINT - 1); }, 1200);
}

function testGameStarted() {
    if (START_PUSHED && SVG_LOADED) {
        setTimeout(setTopHexFill, 600);
        setTimeout(setMainHexesFills, 600);
    }
}

let e_loaded = 3 + 1; // 4 top-bar hexes + 1 main hex
function testAllLoaded() {
    if (! --e_loaded) {
        SVG_LOADED = true;
        
        testGameStarted();
    }
}

/*************************
 *   GET SOUND OPTIONS FROM LOCAL STORAGE
 */

let sound = true;
const soundImg = document.getElementById('soundImg');
if (localStorage.getItem('sound') !== null && localStorage.getItem('sound') === 'false') {
    soundImg.src = './images/sound-off.svg';
    sound = false;
}

/*************************
 *   MUSIC AND SOUNDS
 */

const musicBG = new Audio();
const se = new Audio();

function changeSoundPlay() {
    if (sound) {
        soundImg.src = './images/sound-off.svg';
        sound = false;
        musicBG.pause();
    } else {
        soundImg.src = './images/sound-on.svg';
        sound = true;
        musicBG.play();
    }
    localStorage.setItem('sound', sound);
}

function playSound(sound) {
    se.src = './music/se-'+ sound +'.mp3';
    se.play();
}

const musicArr = ['bg-music', 'bg-music'];
let nowPlayMusic = 0;

function playMusic() {
    musicBG.src = './music/' + musicArr[nowPlayMusic] + '.mp3';
    nowPlayMusic++;
    if (nowPlayMusic === musicArr.length) nowPlayMusic = 0;
    musicBG.addEventListener('ended', playMusic);
}

playMusic();

/*************************
 *   SHALL
 */
 
function start() {
    document.getElementById('shell').style.opacity = 0;
    setTimeout(() => document.getElementById('shell').remove(), 600);
    setTimeout(() => { if(sound) musicBG.play(); }, 7200);
    setTimeout(() => { if(sound) playSound('start');}, 900);
    START_PUSHED = true;
    
    testGameStarted();
}

/*************************
 *   START HEX INIT AND SETTINGS
 */

const C_BLACK = '#000000';
const C_DARK = '#222222';
const C_GREEN = '#00FF00';
const C_WHITE = '#FFFFFF';

const hexesSize = 37;

const connectedArr = [];

/*
         [ 0][ 1][ 2][ 3]
      [ 4][ 5][ 6][ 7][ 8]
    [ 9][10][11][12][13][14]
  [15][16][17][18][19][20][21]
    [22][23][24][25][26][27]
      [28][29][30][31][32]
        [33][34][35][36]
*/
let nearestArr = [
    /*  0 */ [null, 1, 5, 4, null, null],
    /*  1 */ [null, 2, 6, 5, 0, null],
    /*  2 */ [null, 3, 7, 6, 1, null],
    /*  3 */ [null, null, 8, 7, 2, null],
    /*  4 */ [0, 5, 10, 9, null, null],
    /*  5 */ [1, 6, 11, 10, 4, 0],
    /*  6 */ [2, 7, 12, 11, 5, 1],
    /*  7 */ [3, 8, 13, 12, 6, 2],
    /*  8 */ [null, null, 14, 13, 7, 3],
    /*  9 */ [4, 10, 16, 15, null, null],
    /* 10 */ [5, 11, 17, 16, 9, 4],
    /* 11 */ [6, 12, 18, 17, 10, 5],
    /* 12 */ [7, 13, 19, 18, 11, 6],
    /* 13 */ [8, 14, 20, 19, 12, 7],
    /* 14 */ [null, null, 21, 20, 13, 8],
    /* 15 */ [9, 16, 22, null, null, null],
    /* 16 */ [10, 17, 23, 22, 15, 9],
    /* 17 */ [11, 18, 24, 23, 16, 10],
    /* 18 */ [12, 19, 25, 24, 17, 11],
    /* 19 */ [13, 20, 26, 25, 18, 12],
    /* 20 */ [14, 21, 27, 26, 19, 13],
    /* 21 */ [null, null, null, 27, 20, 14],
    /* 22 */ [16, 23, 28, null, null, 15],
    /* 23 */ [17, 24, 29, 28, 22, 16],
    /* 24 */ [18, 25, 30, 29, 23,17],
    /* 25 */ [19, 26, 31, 30, 24, 18],
    /* 26 */ [20, 27, 32, 31, 25, 19],
    /* 27 */ [21, null, null, 32, 26, 20],
    /* 28 */ [23, 29, 33, null, null, 22],
    /* 29 */ [24, 30, 34, 33, 28, 23],
    /* 30 */ [25, 31, 35, 34, 29, 24],
    /* 31 */ [26, 32, 36, 35, 30, 25],
    /* 32 */ [27, null, null, 36, 31, 26],
    /* 33 */ [29, 34, null, null, null, 28],
    /* 34 */ [30, 35, null, null, 33, 29],
    /* 35 */ [31, 36, null, null, 34, 30],
    /* 36 */ [32, null, null, null, 35, 31]
];

const topHexArr = new Array(e_loaded - 1);
const mainHexes = [];
function hexLoaded(id) {
    if (id) topBoardHexAdd(id);
    else mainHexesAdd();
    testAllLoaded();
}

function topBoardHexAdd(id) {
    let el = document.getElementById('hex' + id);
    let SVG = el.getSVGDocument();
    SVG.onclick = () => {
        if (ON_GAME && FILLER[id - 1]) {
            NEW_POINT = (NEW_POINT === id) ? 0 : id;
            if (NEW_POINT) {
                animateTopHexMain(NEW_POINT - 1);
                playSound('on-new');
            } else playSound('off-new');
        }
    };
    let elements = {
        base: SVG.getElementsByClassName('base')[0],
        main: SVG.getElementsByClassName('main')[0],
        b0: SVG.getElementsByClassName('board-0')[0],
        b1: SVG.getElementsByClassName('board-1')[0],
        b2: SVG.getElementsByClassName('board-2')[0],
        b3: SVG.getElementsByClassName('board-3')[0],
        b4: SVG.getElementsByClassName('board-4')[0],
        b5: SVG.getElementsByClassName('board-5')[0]
    };
    topHexArr[id - 1] = elements;
}

function mainHexesAdd() {
    let SVG = document.getElementById('hexes').getSVGDocument();
    for (let i = 0; i < hexesSize; i++) {
        let hex = SVG.getElementById('hex-' + i);
        hex.onclick = () => {
            if (ON_GAME && mainHexes[i].main.getAttribute('fill') !== C_GREEN) {
                ON_GAME = false;
                if (!NEW_POINT) clickHex(i);
                else  setNewPoint(i);
            }
        };
        mainHexes.push({
            base: hex.getElementsByClassName('base')[0],
            main: hex.getElementsByClassName('main')[0],
            b0: hex.getElementsByClassName('board-0')[0],
            b1: hex.getElementsByClassName('board-1')[0],
            b2: hex.getElementsByClassName('board-2')[0],
            b3: hex.getElementsByClassName('board-3')[0],
            b4: hex.getElementsByClassName('board-4')[0],
            b5: hex.getElementsByClassName('board-5')[0]
        });
    }
}

function setTopHexFill() {
    let delay = 300;
    let timeOut = 0;
    let iSize = topHexArr.length;
    
    for (let i = 0; i < iSize; i++) {
        setTimeout(() => topHexArr[i].main.setAttribute('fill', C_GREEN), timeOut += delay);
        setTimeout(() => topHexArr[i].main.setAttribute('fill', C_DARK), timeOut += delay);
    }
    timeOut += delay;
    for (let i = 0; i < iSize; i++) {
        for (let b = 0; b < 6; b++) {
            setTimeout(() => topHexArr[i]['b' + b].setAttribute('fill', C_GREEN), timeOut += 200);
            setTimeout(() => topHexArr[i]['b' + b].setAttribute('fill', C_DARK), timeOut + delay);
        }
    }
    for (let i = 0; i < iSize; i++) {
        setTimeout(() => topHexArr[i].main.setAttribute('fill', C_GREEN), timeOut += delay);
    }
    setTimeout(animateTopHexAwait, timeOut, 0, 4);
}

function setMainHexesFills() {
    let delay = 30;
    let timeOut = 0;
    
    let arr = [];
    for (let i = 0; i < hexesSize; i++) arr.push(i);
    arr.sort(() => Math.random() - 0.5);
    
    let pArr = [
        [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
        [0, 2], [1, 3], [2, 4], [3, 5], [4, 0], [5, 1],
        [0, 3], [1, 4], [2, 5], [3, 0], [4, 1], [5, 2]
    ];
    pArr.sort(() => Math.random() - 0.5);
    let pArrSize = pArr.length;
    
    for (let i = 0; i < hexesSize; i++) {
        let hex = arr[i];
        let pIndex = (i < pArrSize) ? i : i % pArrSize;
        let p1 = pArr[pIndex][0];
        let p2 = pArr[pIndex][1];
        mainHexes[hex].points = [p1, p2];
        for (let b = 0; b < 6; b++) {
            setTimeout(() => mainHexes[hex]['b' + b]
                .setAttribute('fill', (b === p1 || b === p2) ? C_DARK : C_GREEN), timeOut += delay);
        }
    }
    
    setTimeout(() => {
        ON_GAME = true;
        console.log('GAME START');
    }, timeOut + 300);
}

function setNewPoint(hex) {
    mainHexes[hex].main.setAttribute('fill', C_GREEN);
    connectedArr.push(hex);
    checkConnection();
    let id= NEW_POINT - 1;
    setTimeout(() => {
        testOpenBorders(hex);
        topHexArr[id].main.setAttribute('fill', C_DARK);
    }, 900);
    FILLER[id] = NEW_POINT = 0;
    playSound('new-open');
}

function testLastBorders(hex) {
    nearestArr[hex].forEach((e, i) => {
        if (!e) mainHexes[hex]['b' + i].setAttribute('fill', C_GREEN);
    });
}

function testOpenBorders(hex) {
    nearestArr[hex].forEach((e, i) => {
        if (!e) mainHexes[hex]['b' + i].setAttribute('fill', C_GREEN);
    });
    mainHexes[hex].points.forEach(e => {
        if (~connectedArr.indexOf(nearestArr[hex][e])) mainHexes[hex]['b' + e].setAttribute('fill', C_GREEN);
    });
}

/*************************
 *   ACTIONS
 */

function clickHex(hex) {
    playSound('click');
    mainHexes[hex].main.setAttribute('fill', C_GREEN);
    
    let [p1, p2] = mainHexes[hex].points;
    let np1 = (p1 === 5) ? 0 : p1 + 1;
    let np2 = (p2 === 5) ? 0 : p2 + 1;
    
    mainHexes[hex]['b' + p1].setAttribute('fill', C_GREEN);
    mainHexes[hex]['b' + p2].setAttribute('fill', C_GREEN);
    
    mainHexes[hex]['b' + np1].setAttribute('fill', C_DARK);
    mainHexes[hex]['b' + np2].setAttribute('fill', C_DARK);

    mainHexes[hex].points = [np1, np2];
    
    setTimeout(() => {
        checkConnection();
        mainHexes[hex].main.setAttribute('fill', C_BLACK);
    }, 300);
}

function checkConnection() {
    //connectedArr
    //nearestArr
    let index = 0;
    while (index < connectedArr.length) { // console.log('index =', index); console.log(connectedArr);
        let hex = connectedArr[index];
        mainHexes[hex].points.forEach((point, i) => {
            let nearestHex = nearestArr[hex][point];
            if (nearestHex !== null && !~connectedArr.indexOf(nearestHex)) testNearestPoint(hex, point, i, nearestHex);
        });
        index++;
    }
    ON_GAME = true;
}

function testNearestPoint(hex, point, i, nearestHex) {
    let nearestP = (point + 3 > 5) ? point - 3 : point + 3; // console.log('point =', point, '; nearestPoint =', nearestP);
    let [np1, np2] = mainHexes[nearestHex].points; // console.log('np1 =', np1, '; np2 =', np2);
    
    if (np1 === nearestP || np2 === nearestP) {
        mainHexes[hex]['b' + mainHexes[hex].points[i]].setAttribute('fill', C_GREEN);
        let [nb, tb] = (np1 === nearestP) ? [np1, np2] : [np2, np1];
        setTimeout(() => mainHexes[nearestHex]['b' + nb].setAttribute('fill', C_GREEN), 150);
        setTimeout(() => mainHexes[nearestHex].main.setAttribute('fill', C_GREEN), 300);
        setTimeout( testOpenBorders, 600, nearestHex);
        connectedArr.push(nearestHex);
    }
}
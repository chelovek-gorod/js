/*********
 *
 *   JS
 * 
 ********/

'use strict';

let ON_GAME = false;
let e_loaded = 6; // 5 colbs + 1 taps
// when e_loaded === 0 -> ON_GAME = true;
function testAllLoaded() {
    if (! --e_loaded) ON_GAME = true;
}

let sound = true;
const soundImg = document.getElementById('soundImg');
if (localStorage.getItem('sound') !== null && localStorage.getItem('sound') === 'false') {
    soundImg.src = './images/sound-off.svg';
    sound = false;
}

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

// SHELL
function start() {
    document.getElementById('shell').style.opacity = 0;
    setTimeout(() => document.getElementById('shell').remove(), 600);
    setTimeout(() => { if(sound) musicBG.play(); }, 1800);
    setTimeout(() => { if(sound) playSound('game-start');}, 300);
}

////////////////////////////////////////////////////////

const COMBO_SIZE = 5;

let scores = 0;
let combo_k = 1;
let fires = 5;
const scoresDiv = document.getElementById('scores');
const firesDiv = document.getElementById('fires');
function addScores(sc) {
    scores += sc * combo_k;
    scoresDiv.innerHTML = scores;
    fires++;
    combo_k++;
    updateFires();
}
function updateFires() {
    firesDiv.innerHTML = fires;
}
updateFires();

let fireFrame = 0;
let fireFrames = [
    './images/fire0.svg',
    './images/fire1.svg',
    './images/fire2.svg',
    './images/fire3.svg',
    './images/fire4.svg',
    './images/fire5.svg'
    ];

// SET COLORS IN GAME
const fils = ['nocolor', 'color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7'];

let fillStack = [];
addFilsInStack();
function addFilsInStack() {
    let colors = fils.slice(1);
    let colorsSize = colors.length;
    for (let i = 0; i < colorsSize; i++) colors = colors.concat(colors);
    colors.sort(() => Math.random() - 0.5);
    fillStack = colors.concat(fillStack);
}

// GET TAPS SVG
const tapsColor = [];
const colbsColors = new Array(5);

function tapsImgLoaded() {
    let tapsSVG = document.getElementById('tapsImg').getSVGDocument();
    for (let c = 0; c < 5; c++) {
        tapsColor.push(tapsSVG.getElementById('tapsColor' + c));
    }
    
    updateTapsColors();
    
    testAllLoaded();
}

function colbsImgLoaded(id) {
    let el = document.getElementById('colb' + id);
    let tapsSVG = el.getSVGDocument();
    tapsSVG.onclick = () => {if (ON_GAME) clickColb(id)};
    colbsColors[id] = [];
    for (let c = 0; c < 10; c++) {
        colbsColors[id].push(tapsSVG.getElementById('colbColor' + c));
    }
    testAllLoaded();
}

function clickColb (id) {
    ON_GAME = false;
    let place = getColbPlace(id);
    if (place) {
        setColorInColb(place);
        if(sound) playSound('add-color');
        testGetScores(id);
    } else {
        ON_GAME = true;
    }
}

function getColbPlace(id) {
    for (let i = 0; i < 10; i++) {
        if (colbsColors[id][i].getAttribute('class') === 'nocolor') {
            return colbsColors[id][i];
        }
    }
    return false;
}

function setColorInColb(pos) {
    pos.setAttribute('class', fillStack.pop());
    updateTapsColors();
    if (fillStack.length < 5) addFilsInStack();
}

function updateTapsColors() {
    let stackSize = fillStack.length - 1;
    for (let i = 0; i < 5; i++) {
        tapsColor[i].setAttribute('class', fillStack[stackSize - i]);
    }
}

function clickFire (id) {
    if (ON_GAME && fires && colbsColors[id][1].getAttribute('class') !== 'nocolor') {
        ON_GAME = false;
        fires--;
        updateFires();
        let img = document.getElementById('fire' + id);
        if(sound) playSound('fire');
        animateFire(img, 20, id, 0);
    }
}

function upColbColor(id, pos) {
    let upperColor = colbsColors[id][pos + 1].getAttribute('class');
    if (upperColor !== 'nocolor') {
        let posColor = colbsColors[id][pos].getAttribute('class');
        colbsColors[id][pos + 1].setAttribute('class', posColor);
        colbsColors[id][pos].setAttribute('class', upperColor);
    }
}

function animateFire(img, times, id, pos) {
    img.src = fireFrames[fireFrame];
    if (times % 2 === 0 && pos < 9) upColbColor(id, pos++);
    fireFrame = (fireFrame === fireFrames.length -1) ? 0 : fireFrame += 1;
    if (--times) setTimeout(animateFire, 60, img, times, id, pos);
    else setTimeout(() => {
        img.src = './images/fireBTN.svg';
        testGetScores(id);
    }, 60);
}

function testGetScores(id) {
    let colors = [];
    let i = 9;
    while (i >= 0) {
        let nowColor = colbsColors[id][i];
        if (nowColor.getAttribute('class') !== 'nocolor') {
            if (colors.length === 0 || (colors[0].getAttribute('class') === nowColor.getAttribute('class'))) {
                colors.push(nowColor);
            } else i = -1;
        }
        i--;
    }
    console.log(colors.map(e => e.getAttribute('class')));
    if (colors.length >= COMBO_SIZE) {
        colors.forEach(e => e.setAttribute('class', 'nocolor'));
        showSplash(id);
        let points = (colors.length - COMBO_SIZE + 1) * combo_k;
        addScores(colors.length - COMBO_SIZE + 1);
    } else combo_k = 1;
    ON_GAME = true;
}

function showSplash(id) {
    let colb = document.getElementById('colb' + id);
    let point = colb.getBoundingClientRect();
    
    let leftPoint = point.left + Math.floor(point.width / 2) - Math.floor(157 / 2);
    let topPoint = point.top + Math.floor(point.height / 3) - Math.floor(229 / 2);
    
    let splash = document.createElement("img");
    splash.src = './images/splash.gif'; // 157 x 229
    splash.style = `position: fixed; top: ${topPoint}px; left: ${leftPoint}px; z-index: 3`;
    document.body.append(splash);
    if(sound) playSound('splash');
    setTimeout(() => {
        splash.remove();
    }, 400);
}
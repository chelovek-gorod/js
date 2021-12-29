/********************
 * 
 *  MAIN
 * 
 * *****************/

'use strict';

import {slidesIn, slideOut} from './slider.js';
import {addCursor, cursorIn, cursorOut, halpLightIn} from './cursor.js';
import {createHP, createSC, createBS, updateScores, updateHp, updateBest} from './ui.js';

let hp = 3;
let scores = 0;
let slides = 1;
let repits = 1;
let sidesArr = [];

let helpS = 3;
let onHelp = false;
let helpArrow;
const helpTimeout = 1200;
const lightHelpTimeout = 60;

const soundInGameImg = document.createElement('img');
let soundInGame = false;
function clickSoundBtn () {
    if (soundInGame) {
        soundInGame = false;
        soundInGameImg.src = "./images/sound-off.svg";
        musicBG.pause();
    } else {
        soundInGame = true;
        soundInGameImg.src = "./images/sound-on.svg";
        musicBG.play();
    }
    localStorage.setItem('sound', soundInGame);
}

let best = localStorage.getItem('best');
if (best === null) best = 0;

let cursorReady = false;

const startImg = document.createElement('img');
const gameOverImg = document.createElement('img');

const musicBG = new Audio();
musicBG.addEventListener('ended', musicBG.play);
const se = new Audio();

document.addEventListener('keyup', (e)=> {if (e.key == 'Escape') {location.reload();}});

window.onload = ()=> {
    soundInGameImg.id = "soundImg";
    soundInGameImg.src = "./images/sound-on.svg";
    document.body.append(soundInGameImg);
    soundInGameImg.addEventListener('click' ,clickSoundBtn);
    clickSoundBtn();
    
    let start = false;
    startImg.id = "startImg";
    startImg.src = "./images/start.svg";
    document.body.prepend(startImg);
    setTimeout(() => {startImg.style.opacity = 1;}, 1200);
    startImg.onclick = () => {
        if (!start) {
            start = true;
            playSound("start");
            gameStart();
        }
    };
    document.addEventListener('keyup', (e)=> {
        if (e.key == 'Enter' && !start) {
            start = true;
            playSound("start");
            gameStart();
        }
    });
};

function gameStart() {
    startImg.style.opacity = 0;
    setTimeout(() => {startImg.remove();}, 1200);
    createHP(hp);
    createSC(scores);
    createBS(best);
    setTimeout(() => {
        slidesIn(slides);
        addCursor();
    }, 1200);
    setTimeout(playMusic, 3600);
}

function setCursorStatus(status) {
    if (status) setTimeout(cursorIn, 1200);
    else cursorOut();
    cursorReady = status;
}

function cursorClick(direction) {
    if (cursorReady) {
        cursorReady = false;
        let index;
        switch (direction) {
            case "top" : index = 0; break;
            case "right" : index = 2; break;
            case "bottom" : index = 1; break;
            case "left" : index = 3; break;
        }
        if (index === sidesArr[sidesArr.length -1]) {
            sidesArr.pop();
            if (sidesArr.length === 0) {
                getLastSlide();
                onHelp = false;
            }
            else {
                setTimeout(cursorFrize, 1200);
                if (onHelp) helpArrow = sidesArr[sidesArr.length - 1];
            }
            slideOut(index);
            playSound("button-true");
            updateScores(++scores);
            if (scores > best) {
                localStorage.setItem('best', scores);
                updateBest(scores);
            }
        } else {
            updateHp(--hp);
            if (hp >= 0) {
                setTimeout(cursorFrize, 1200);
                playSound("button-false");
            }
            else {
                cursorReady = false;
                cursorOut();
                musicBG.pause();
                playSound("game-over");
                if (scores > best) localStorage.setItem('best', scores);
                gameOverImg.id = "gameOverImg";
                gameOverImg.src = "./images/gameover.svg";
                document.body.prepend(gameOverImg);
                setTimeout(() => {gameOverImg.style.opacity = 1;}, 1200);
                setTimeout(() => {
                    gameOverImg.style.opacity = 0;
                    document.getElementById("shell").style.opacity = 0;
                    document.getElementById("scLine").style.top = "-60px";
                    document.getElementById("bestSC").style.bottom = "-60px";
                }, 4800);
                setTimeout(() => {location.reload();}, 6000);
            }
        }
    }
    else playSound("empty-click");
}

function getLastSlide() {
    cursorReady = false;
    onHelp = false;
    cursorOut();
    repits--;
    if (repits < 1) repits = ++slides;
    setTimeout(() => {
        updateHp(++hp);
        playSound("slides-clear");
    }, 1200);
    setTimeout(slidesIn, 1800, slides);
}

function cursorFrize() {
    cursorReady = true;
}

function updateSidesArr(arr) {
    for (let i = 0; i < arr.length; i++) {
        sidesArr.push(arr[i]);
    }
    if (slides < helpS) {
        helpArrow = sidesArr[sidesArr.length - 1];
        showHalp();
    }
}

function showHalp() {
    onHelp = true;
    setTimeout(sendHelpLight, 4800);
}

function sendHelpLight() {
    if (onHelp) {
        halpLightIn(helpArrow, lightHelpTimeout);
        setTimeout(sendHelpLight, 3600);
    }
}

function playSound(sound) {
    if (soundInGame) {
        se.src = './music/se-'+ sound +'.mp3';
        se.play();
    }
}

function playMusic() {
    musicBG.src = './music/bg-music.mp3';
    if (soundInGame) musicBG.play();
}

export {cursorClick, setCursorStatus, updateSidesArr, playSound};
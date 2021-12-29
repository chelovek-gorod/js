/********************
 * 
 *  SLIDER
 * 
 * *****************/

'use strict';

import {setCursorStatus, playSound, updateSidesArr} from './main.js';

const shell = document.createElement('div');
shell.id = "shell";
    
document.body.append(shell);

const divColors = ["#FF0000", "#FFFF00", "#00FFFF", "#FF00FF", "#00FF00", "#0000FF"];
let indexColor = 0;

function slidesIn(n) {
    let arrSides = [];
    let lastIn = randInt();
    for (let i = 0; i < n; i++) {
        let rand = randInt();
        if (rand === lastIn) rand++;
        if (rand > 3) rand = 0;
        arrSides.push(rand);
        lastIn = rand;
    }
    newSlide(arrSides, 0);
    setTimeout(updateSidesArr, 1200, arrSides);
}

function slideOut(index) {
    let DivsSlide = shell.querySelectorAll("div");
    let lastDivSlide = DivsSlide[DivsSlide.length-1];
    if (index < 2) lastDivSlide.classList.remove("fullHeight");
    else lastDivSlide.classList.remove("fullWidth");
    
    setTimeout(removeDivSlide, 1200, lastDivSlide);
}

function removeDivSlide(lastDivSlide) {
    lastDivSlide.remove();
}
    
function randInt() {
    let rand = Math.random() * (4);
    return Math.floor(rand);
}

function setColor() {
    if (indexColor < divColors.length-1) indexColor++;
    else indexColor = 0;
    return divColors[indexColor];
}

function newSlide(arrSides, indexSide) {
    let newDiv = document.createElement('div');
    shell.append(newDiv);
    switch (arrSides[indexSide]) {
        case 0 : newDiv.classList.toggle("top"); break;
        case 2 : newDiv.classList.toggle("right"); break;
        case 1 : newDiv.classList.toggle("bottom"); break;
        case 3 : newDiv.classList.toggle("left"); break;
    }
    newDiv.style.backgroundColor = setColor();
    if (arrSides[indexSide] < 2) setTimeout(setFullHeight, 1200, newDiv);
    else setTimeout(setFullWidth, 1200, newDiv);
    
    indexSide++;
    if (indexSide < arrSides.length) setTimeout(newSlide, 1200, arrSides, indexSide);
    else {
        indexSide = arrSides.length - 1;
        setTimeout(setCursorStatus, 1200, true);
    }
}

function setFullHeight(e) {
    e.classList.toggle("fullHeight");
    playSound("slide");
}
function setFullWidth(e) {
    e.classList.toggle("fullWidth");
    playSound("slide");
}

export {slidesIn, slideOut};
/********************
 * 
 *  CURSOR
 * 
 * *****************/

'use strict';

import {cursorClick} from './main.js';

const colorsArr = ['#777777', '#888888', '#999999', '#AAAAAA', '#BBBBBB', '#CCCCCC', '#DDDDDD', '#EEEEEE', '#FFFFFF'];
let colors = colorsArr.length -1;
const lightTimeout = 10;
// const lightHelpTimeout = 60; // in main.js

const svg = document.createElement('object');
svg.id = "cursor";
svg.type = "image/svg+xml";
svg.data = "./images/arrows.svg";
const cursorKeysArr = [];

function addCursor() {
    document.body.prepend(svg);
    
    svg.onload = () => {
        const cursorSVG = svg.getSVGDocument();
        
        cursorKeysArr.push(cursorSVG.getElementById('top'));
        cursorKeysArr.push(cursorSVG.getElementById('bottom'));
        cursorKeysArr.push(cursorSVG.getElementById('right'));
        cursorKeysArr.push(cursorSVG.getElementById('left'));
        
        cursorSVG.getElementById('top').onclick = () => {
            lightIn(cursorSVG.getElementById('top'), 0, lightTimeout);
            cursorClick('top');
        };
        cursorSVG.getElementById('right').onclick = () => {
            lightIn(cursorSVG.getElementById('right'), 0, lightTimeout);
            cursorClick('right');
        };
        cursorSVG.getElementById('bottom').onclick = () => {
            lightIn(cursorSVG.getElementById('bottom'), 0, lightTimeout);
            cursorClick('bottom');
        };
        cursorSVG.getElementById('left').onclick = () => {
            lightIn(cursorSVG.getElementById('left'), 0, lightTimeout);
            cursorClick('left');
        };
        cursorSVG.getElementById('topArrow').onclick = () => {
            lightIn(cursorSVG.getElementById('top'), 0, lightTimeout);
            cursorClick('top');
        };
        cursorSVG.getElementById('rightArrow').onclick = () => {
            lightIn(cursorSVG.getElementById('right'), 0, lightTimeout);
            cursorClick('right');
        };
        cursorSVG.getElementById('bottomArrow').onclick = () => {
            lightIn(cursorSVG.getElementById('bottom'), 0, lightTimeout);
            cursorClick('bottom');
        };
        cursorSVG.getElementById('leftArrow').onclick = () => {
            lightIn(cursorSVG.getElementById('left'), 0, lightTimeout);
            cursorClick('left');
        };
        
        document.addEventListener('keyup', (e)=> {
            if (e.key == 'ArrowUp') {
                lightIn(cursorSVG.getElementById('top'), 0, lightTimeout);
                cursorClick('top');
            }
            if (e.key == 'ArrowDown') {
                lightIn(cursorSVG.getElementById('bottom'), 0, lightTimeout);
                cursorClick('bottom');
            }
            if (e.key == 'ArrowRight') {
                lightIn(cursorSVG.getElementById('right'), 0, lightTimeout);
                cursorClick('right');
            }
            if (e.key == 'ArrowLeft') {
                lightIn(cursorSVG.getElementById('left'), 0, lightTimeout);
                cursorClick('left');
            }
        });
    };
}

function cursorIn() {
    svg.style.opacity = 1;
}

function cursorOut() {
    svg.style.opacity = 0;
}

function halpLightIn(arrow, timeout) {
    lightIn(cursorKeysArr[arrow], 0, timeout);
}

function lightIn(btn, color, timeout) {
    btn.setAttribute("fill", colorsArr[color]);
    if (color < colors) setTimeout(lightIn, timeout, btn, ++color, timeout);
    else setTimeout(lightOut, timeout, btn, color--, timeout);
}

function lightOut(btn, color, timeout) {
    btn.setAttribute("fill", colorsArr[color]);
    if (color > 0) setTimeout(lightOut, timeout, btn, --color, timeout);
}

export {addCursor, cursorIn, cursorOut, halpLightIn};
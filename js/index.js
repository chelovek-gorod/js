/**************
 * 
 *  INDEX.JS
 * 
 * ***********/

'use strict';

const shell = document.getElementById('shell');
setTimeout(() => shell.style.opacity = 0, 100);

/*
const header = document.querySelector('header');
const footer = document.querySelector('footer');


setTimeout(() => {
    header.style.top = 0;
    footer.style.bottom = 0;
}, 0);

*/

const blocks = Array.from(document.querySelector('main').querySelectorAll('a'));
let timer = 600;
let step = 200;

blocks.forEach(e => {
    setTimeout(() => {
        e.style.opacity = 1;
    }, timer);
    timer += step;
});

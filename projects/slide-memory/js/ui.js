/********************
 * 
 *  UI
 * 
 * *****************/

'use strict';

const hpDiv = document.createElement('div');
const scoreDiv = document.createElement('div');
const bestSC = document.createElement('div');

function createHP(hp) {
    hpDiv.id = "hpLine";
    document.body.prepend(hpDiv);
    updateHp(hp);
    setTimeout(() => {hpDiv.style.top = "20px";}, 1200);
}

function createSC(scores) {
    scoreDiv.id = "scLine";
    document.body.prepend(scoreDiv);
    updateScores(scores);
    setTimeout(() => {scoreDiv.style.top = "20px";}, 1200);
}

function createBS(best) {
    bestSC.id = "bestSC";
    document.body.prepend(bestSC);
    updateBest(best);
    setTimeout(() => {bestSC.style.bottom = "20px";}, 1200);
}

function updateScores(scores) {
    scoreDiv.innerHTML = `scores: <span id="scores">${scores}</span>`;
}

function updateHp(hp) {
    let hp_str = '';
    for (let i = 0; i < hp; i++) {
        hp_str += `<span id="hp${i+1}"> &#10007; </span>`;
    }
    hpDiv.innerHTML = hp_str;
}

function updateBest(best) {
    bestSC.innerHTML = `Your best scores: <span id="best">${best}</span>`;
}

export {createHP, createSC, createBS, updateScores, updateHp, updateBest};
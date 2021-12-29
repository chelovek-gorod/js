"use strict";

const back = document.getElementById('back');
const newBGbtn = document.getElementById('setNewBG');
const screen = document.getElementById('screen');

const backgrounds = ['./image/bg-1.jpg', './image/bg-2.jpg', './image/bg-3.jpg', './image/bg-4.jpg'];
let BG = 0;
let BG_images = backgrounds.length - 1;
let BG_onchange = false;

const floors = ['100%', '80%', '60%', '40%', '20%', '0%'];
let currentFloor = 0;
let nextFloor = 0;
const floorsToGo = [];
let onMove = false;

let elevatorSpeed;
function setElevatorTransitionSpeed() {
    if (Math.abs(currentFloor - nextFloor) > 2) {
        back.className = 'fast-speed';
        elevatorSpeed = 3600;
    } else {
        back.className = 'slow-speed';
        elevatorSpeed = 2400;
    }
}

function newBG() {
    soundBtn.play();
    if (!BG_onchange) {
        BG_onchange = true;
        newBGbtn.classList.toggle('activeButton', BG_onchange);
        if (!onMove) setTimeout(changeBG, 1200);
    }
}

function changeBG () {
    document.body.style.opacity = 0;
    playSoundFx('doors');
        
    setTimeout(() => {
        currentFloor = 0;
        nextFloor = 0;
        floorsToGo.length = 0;

        back.className = 'jump-speed';
        back.style.backgroundPositionY = floors[0];

        if (BG === BG_images) BG = 0;
        else BG++;
        back.style.backgroundImage = `url(${backgrounds[BG]})`;

        BG_onchange = false;
        newBGbtn.classList.toggle('activeButton', BG_onchange);
        document.body.style.opacity = 1;
        
        screen.innerHTML = '0 &uarr;';
    }, 1200);
}

function newFloor(id) {
    soundBtn.play();
    let getFloor = +id.innerHTML;
    if (getFloor === nextFloor || BG_onchange) return 0;
    if (!~floorsToGo.indexOf(getFloor)) {
        floorsToGo.push(getFloor);
        id.classList.toggle('activeButton');
    }
    if (!onMove) {
        onMove = true;
        setTimeout(moveElevator, 1200);
    }
}

function moveElevator() {
    nextFloor = Infinity;
    floorsToGo.forEach(e => {
        if (Math.abs(currentFloor - e) < Math.abs(currentFloor - nextFloor)) nextFloor = e; 
    });
    setElevatorTransitionSpeed();
    
    playSoundGo();
    setTimeout(() => playSoundFx('errived'), elevatorSpeed - 300);
    
    screen.innerHTML = (currentFloor < nextFloor) ? nextFloor + ' &uarr;' : nextFloor + ' &darr;';

    back.style.backgroundPositionY = floors[nextFloor];
    setTimeout(() => {
        document.getElementById(`floor${nextFloor}`).classList.toggle('activeButton');
        floorsToGo.splice(floorsToGo.indexOf(nextFloor), 1);
        currentFloor = nextFloor;
        
        stopSoundGo();
        setTimeout(() => playSoundFx('stop'), 600);
        
        if (floorsToGo.length) setTimeout(moveElevator, 1800);
        else { 
            onMove = false;
            if (BG_onchange) setTimeout(changeBG, 1800);
        }
    }, elevatorSpeed);
}

//////////////////////////////

const soundFx = new Audio();

const soundBtn = new Audio();
soundBtn.src = './sounds/elevator-pressed-floor.mp3';

const soundGo = new Audio();
soundGo.src = './sounds/elevator-go.mp3';

function playSoundFx(sound) {
    soundFx.src = './sounds/elevator-'+ sound +'.mp3';
    soundFx.play();
}

function playSoundGo() {
    soundGo.play();
}

function stopSoundGo() {
    soundGo.pause();
    soundGo.currentTime = 0;
}

////////////////////////////////////////////

setTimeout(() => document.body.style.opacity = 1, 1000);
/*********
 *
 *   JS
 * 
 ********/

'use strict';

let sound = true;
const soundImg = document.getElementsByClassName('sound')[0].querySelector('img');
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
    se.src = 'music/se-'+ sound +'.mp3';
    se.play();
}

const musicArr = ['bg-music-0', 'bg-music-1', 'bg-music-2'];
let nowPlayMusic = 0;

function playMusic() {
    musicBG.src = 'music/' + musicArr[nowPlayMusic] + '.mp3';
    nowPlayMusic++;
    if (nowPlayMusic === musicArr.length) nowPlayMusic = 0;
    musicBG.addEventListener("ended", playMusic);
}

playMusic();

// SHELL
function start() {
    document.getElementById('shell').style.opacity = 0;
    setTimeout(() => document.getElementById('shell').remove(), 600);
    setTimeout(() => { if(sound) musicBG.play(); }, 1800);
    setTimeout(() => { if(sound) playSound("game-start");}, 300);
}

document.getElementsByClassName('restart')[0].onmouseover = function () {if (sound) playSound("restart-hover")};

////////////////////////////////////////////////////////

let scores = 0;
const scoresDiv = document.getElementById('scores');

let starSrc = 'images/star1.png';
let star1 = document.getElementById('star1');
let star2 = document.getElementById('star2');
let star3 = document.getElementById('star3');

// SET COLORS IN GAME
let colorsArr = [1, 2, 3, 4, 5,  6,   7,   8,   9,   10,  11,  12,  13];
let colorsPSc = [0, 0, 0, 0, 50, 100, 150, 200, 300, 400, 500, 700, 1000];
let useColors = testScoresForNewColors();

function testScoresForNewColors() {
    let size = colorsPSc.length - 1;
    for (let i = size; i >= 0; i--) {
        if (scores >= colorsPSc[i]) return i + 1;
    }
}

// ADD CEILS WIHT BALS (HIDDEN) IN GAME
const boardSide = 9;
let boardSize = 9**2;
const board = document.getElementById('board');
for (let i = 0; i < boardSize; i++) board.innerHTML += '<div><img pd="' + i + '" src="images/ball.png"></div>';
const cells = Array.from(board.querySelectorAll('div'));

// PREPARE BALL INNER
let innerArr = [];
for (let i = 1; i < 6; i++) innerArr.push(document.getElementById('ball' + i));
//innerArr = [...innerArr].reverse();

let inner = {
    balls : innerArr, // inner img tags
    stack : [], // color stack
    add_k : 2, // size of adding colors in stack
    add_m : 3, // multicoloosr add in iteration

    adding : function () {
        let add_arr = [];
        for (let n = 0; n < this.add_k; n++){
            add_arr = add_arr.concat(colorsArr.slice(0, useColors));
        }
        for (let m = 0; m < this.add_m; m++){
            add_arr.push(360);
        }
        add_arr.sort(() => Math.random() - 0.5);
        this.stack = add_arr.concat(this.stack);
        this.add_k++;
    },

    update : function () {
        this.balls.forEach((e, i) => {
            e.removeAttribute('class');
            e.classList.add('color' + this.stack[this.stack.length - (i + 1)]);
        });
        if (this.stack.length < 6) this.adding();
    }
};

// BALL IN
function ballIn(place, color) {
    place.querySelector('img').removeAttribute('class');
    
    place.classList.add('open');
    place.querySelector('img').classList.add('color' + color);
}

// BALL OUT
function ballOut(place) {
    place.classList.remove('open');
}

// SHOW FEW BALLS
const balsAtStart = 12;

let startBallsArr = function () {
    let resArr = [];
    while (resArr.length < balsAtStart) {
        resArr = resArr.concat(colorsArr.slice(0, useColors));
    }
    resArr.length = balsAtStart;
    return resArr;
}().sort(() => Math.random() - 0.5);

for (let i = 0; i < balsAtStart; i++) {
    let nextBall = Math.floor(Math.random() * boardSize);
    while (cells[nextBall].classList.contains('open')) {
        if (nextBall < boardSize - 1) nextBall++;
        else nextBall = 0;
    }
    ballIn(cells[nextBall], startBallsArr[i]);
}

inner.adding();
inner.update();

board.addEventListener('click', e => {
    if (play && !e.target.classList.contains('open')
             && e.target.querySelector('img')
             && e.target != board) {
        play = false;

        let newColor = inner.stack.pop();
        inner.update();

        ballIn(e.target, newColor);
        openNewBall(e.target);
        if (sound) playSound("ball-add");
    }
});

function openNewBall(openCell, color) {
    let index = openCell.querySelector('img').getAttribute('pd');
    
    let hsc = Math.floor(index / boardSide) * boardSide;
    let horArr = cells.slice(hsc, hsc + boardSide);

    let vsc = index % boardSide;
    let verArr = cells.filter((e, i) => {if (i % boardSide === vsc) return e;});

    let hor = {multiCount : 0, colors: [], lastColor: undefined};
    let ver = {multiCount : 0, colors: [], lastColor: undefined};

    for (let i = 0; i < boardSide; i++) {
        testLine(hor, horArr[i]);
        testLine(ver, verArr[i]);
    }
    
    let resArr = hor.colors.filter(e => e.length > 4)
                .concat(ver.colors.filter(e => e.length > 4));

    if (resArr.length) {
        
        setTimeout(() => {
            for (let i = 0; i < resArr.length; i++) clearLine(resArr[i]);

            if (sound) playSound("line-clear");

            scoresDiv.innerHTML = scores;
            
            /*
            if (scores > bestResults.best1.scores)  setBest();
            else if (scores > bestResults.best2.scores)  setBest();
            else if (scores > bestResults.best3.scores)  setBest();
            */
            setTimeout(() => {
                addRandomBall();
                setTimeout(() => {play = true;}, 600);
            }, 600);
        }, 600);
    } else play = true;
}

function testLine(line, e) {
    if (e.classList.contains('open')) {
        // set current color
        let currentColor = e.querySelector('img').className;
        // push in last arr colors
        if (currentColor === 'color360' || currentColor === line.lastColor) {
            if (!line.colors.length) line.colors.push([]);
            line.colors[line.colors.length - 1].push(e);
            if (currentColor === 'color360') line.multiCount++;
            else {
                line.multiCount = 0;
                line.lastColor = currentColor;
            }
        } else {
            if (line.multiCount) {
                line.colors.push(line.colors[line.colors.length - 1].slice(line.multiCount * -1));
                line.multiCount = 0;
            } else line.colors.push([]);
            line.colors[line.colors.length - 1].push(e);
            line.lastColor = currentColor;
        }
    } else {
        line.multiCount = 0;
        line.lastColor = undefined;

        // without this - if multicolor et end of line - all emptu cells are ignored...
        line.colors.push([]);
    }
}

function clearLine(arr) {
    switch (arr.length) {
        case 5 : scores += 5; break;  // 1 per each
        case 6 : scores += 7; break;  // 1.2 per each
        case 7 : scores += 10; break; // 1.44 per each
        case 8 : scores += 15; break; // 1.73 per each
        case 9 : scores += 20; break; // 2.1 per each
    }
    useColors = testScoresForNewColors();
    for (let i = 0; i < arr.length; i++) ballOut(arr[i]);
}

function addRandomBall() {
    let newColor = Math.floor(Math.random() * (useColors));
    let nextBall = Math.floor(Math.random() * boardSize);
    let loops = 2; // if loops > 2 - no plases to add ball
    while (cells[nextBall].classList.contains('open') && loops) {
        if (nextBall < boardSize - 1) nextBall++;
        else {
            nextBall = 0;
            loops--;
        }
    }
    if (!loops) {
        musicBG.pause();
        if (sound) playSound("game-over");
        alert('Thanks for a game =)');
        document.location.reload();
    }
    ballIn(cells[nextBall], colorsArr[newColor]);
    openNewBall(cells[nextBall], true);
    if (sound) playSound("ball-add");
}

let play = true;

////////////////////////////////////////////////////////////

let bestResults;
let myName = '';

let best1name = document.getElementById('best1name');
let best2name = document.getElementById('best2name');
let best3name = document.getElementById('best3name');

let best1scores = document.getElementById('best1scores');
let best2scores = document.getElementById('best2scores');
let best3scores = document.getElementById('best3scores');

// updateResults();

function updateResults() {
    fetch('server/scores.json')
      .then(response => response.json())
      .then(result => showResult(result));
}

function showResult(result) {
    bestResults = result;
    
    if (star3.src != starSrc) {
        if (scores >= result.best3.scores) star1.src = starSrc;
        if (scores >= result.best2.scores) star2.src = starSrc;
        if (scores >= result.best1.scores) star3.src = starSrc;
    }

    best1name.innerHTML = result.best1.name;
    best1scores.innerHTML = result.best1.scores;

    best2name.innerHTML = result.best2.name;
    best2scores.innerHTML = result.best2.scores;

    best3name.innerHTML = result.best3.name;
    best3scores.innerHTML = result.best3.scores;
}

function setBest(){
    let sendData = JSON.stringify({name: getName(), scores: scores});
    fetch('server/server.php', {
            method: 'POST',
            body: sendData,
            headers: {'Content-Type': 'application/json'}
    })
    .then((response) => {
        return response.json();
    })
    .then((result) => {
        showResult(result);
    })
    .catch(error => console.log(error));
}

function getName() {
    if (myName == '') {
        let title = "New Best Result!!!\nInput Your name, please:";
        let lastName;
        if (localStorage.getItem('name') === null) lastName = "player";
        else lastName = localStorage.getItem('name');
        let name = prompt(title, lastName);
        if (name === null) name = "player";
        localStorage.setItem('name', name);
        myName = name;
        return name;
    } else return myName;
}
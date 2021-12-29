"use strict";

const userInputTitle = document.getElementById('userInputTitle');
const userOutputTitle = document.getElementById('userOutputTitle');

const capsLabelTitle = document.getElementById('capsLabelTitle');
const capsLockInput = document.getElementById('capsLockInput');

const spacesLabelTitle = document.getElementById('spacesLabelTitle');
const spacesLockInput = document.getElementById('spacesLockInput');

const titlesArr = [userInputTitle, userOutputTitle, capsLabelTitle, capsLockInput, spacesLabelTitle, spacesLockInput];
titlesArr.forEach(text => text.innerHTML = text.innerHTML.toLowerCase());
titlesArr.forEach(text => text.innerHTML = text.innerHTML.replaceAll(' ', '-'));

const inputString = document.getElementById('inputString');
const outputString = document.getElementById('outputString');

const Translit = { 'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
    'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
    'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '\'', 'ы': 'y', 'ь': '\'', 'э': 'e', 'ю': 'yu', 'я': 'ya',
    '`': '\'', '~': 'or', '№': '#', '%': 'percent', '^': 'xx', '&': 'and', '*': 'x', '{': '(', '}': ')', '[': '(', ']': ')',
    '<': '(', '>': ')', '\\': '|', '_': '-', '/': '|'
}

capsLockInput.onchange = () =>  {
    if (capsLockInput.checked) titlesArr.forEach(text => text.innerHTML = text.innerHTML.toUpperCase());
    else titlesArr.forEach(text => text.innerHTML = text.innerHTML.toLowerCase());
    
    if (inputString.value) convertInput();
};

spacesLockInput.onchange = () =>  {
    if (spacesLockInput.checked) titlesArr.forEach(text => text.innerHTML = text.innerHTML.replaceAll('-', ' '));
    else titlesArr.forEach(text => text.innerHTML = text.innerHTML.replaceAll(' ', '-'));
    
    if (inputString.value) convertInput();
};

inputString.onchange = () => convertInput();

function convertInput() {
    let str = inputString.value;
    let strSize = str.length;
    let res = '';
    for (let i = 0; i < strSize; i++) {
        let onUpperCase = (str[i] === str[i].toUpperCase()) ? true : false;
        let char = str[i].toLowerCase();
        if (char in Translit) char = Translit[char];
        res += (onUpperCase && capsLockInput.checked) ? char.toUpperCase() : char;
    }
    outputString.value = (spacesLockInput.checked) ? res : res.replaceAll(' ', '-');
}

function outputCopyClick() {
    outputString.select();
    document.execCommand("copy");
}
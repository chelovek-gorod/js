/*************
 *
 *    JS
 *
 ************/

"use strict";

let userReady = false;

let user = {
    login: '',
    email: '',
    password: ''
};

let patternLogin = new RegExp("[a-zA-Z0-9]{4,20}$"),
    patternEmail = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"),
    patternPassword = new RegExp("[a-zA-Z0-9]{8,20}$");

let doorTop = document.getElementById('doorTop'),
    doorBottom = document.getElementById('doorBottom'),
    formBox = document.getElementById('formBox'),
    buttonLine = document.getElementById('buttonLine'),
    indicatorBox = document.getElementById('indicatorBox'),
    messageDiv = document.getElementById('message'),
    login = document.getElementById('name'),
    email = document.getElementById('email'),
    pass1 = document.getElementById('pass1'),
    pass2 = document.getElementById('pass2'),
    formReset = document.getElementById('formReset'),
    formSend = document.getElementById('formSend');

let newMessage;
let message = 'Заполните все поля в форме';

setTimeout(()=>indicatorBox.style.top = '-5px', 500);

function clickStart() {
    doorTop.style.top = '-45%';
    doorBottom.style.bottom = '-45%';
    buttonLine.style.left = '200%';
    formBox.style.transform = 'rotateY(0deg)';
    setTimeout(typeMessage, 1500, message);
}

function clickEnd() {
    doorTop.style.top = '-4px';
    doorBottom.style.bottom = '-4px';
    buttonLine.style.left = '50%';
    formBox.style.transform = 'rotateY(90deg)';

    clearTimeout(newMessage);
    setTimeout(()=> messageDiv.innerHTML = '...', 1000);
}

function typeMessage(txt, i = 0) {
    if (i === 0) {
        clearTimeout(newMessage);
        messageDiv.innerHTML = '';
    }
    if (i < txt.length) {
        messageDiv.innerHTML += txt.charAt(i);
      i++;
      newMessage = setTimeout(typeMessage, 50, txt, i);
    }
}

function endInput(value, id) {
    switch (id) {
        case 'name' :
            if (login.value == '') {
                user.login = '';
            } else if (patternLogin.test(String(value))) {
                user.login = String(value);
                typeMessage('Логин принят');
            } else {
                typeMessage('Ошибка ввода логина');
                user.login = '';
            }
            break;
        case 'email' :
            if (email.value == '') {
                user.email = '';
            } else if (patternEmail.test(String(value).toLowerCase())) {
                user.email = String(value);
                typeMessage('E-mail принят');
            } else {
                typeMessage('Ошибка ввода e-mail');
                user.email = '';
            }
            break;
        case 'pass1' : 
            if (pass1.value == '') {
                user.password = '';
            } else if (patternLogin.test(String(value))) {
                typeMessage('Повторите пароль');
            } else {
                typeMessage('Ошибка ввода пароля');
                user.password = '';
            }
            break;
        case 'pass2' : 
            if (pass2.value == '') {
                user.password = '';
            } else if (pass1.value == String(value)) {
                user.password = String(value);
                typeMessage('Пароль принят');
            } else {
                typeMessage('Пароли не совпадают');
                user.password = '';
                pass2.value = '';
            }
            break;
        default: console.log('DEFAUIL!!! id = "' + id + '"; value = ' + value);
    }
}

function clickSend() {
    if (user.login != '' && user.email != '' && user.password != '') {
        sendData();
        typeMessage('Отправляем данные...');
    }
}

function sendData() {
    let xhr = new XMLHttpRequest();
    let url = 'server.php';
    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            setTimeout(()=>typeMessage('Ответ: ' + this.responseText),3000);
            setTimeout(closed,6000);
        }
    };
    var data = JSON.stringify(user);
    xhr.send(data);
}

function closed() {
    doorTop.style.top = '-4px';
    doorBottom.style.bottom = '-4px';
    buttonLine.style.left = '50%';
    formBox.style.transform = 'rotateY(90deg)';
}
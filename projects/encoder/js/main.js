'use strict';

let ready = false;

const key = document.getElementById('key');
const keyTitle = document.getElementById('keyTitle');
const msg = document.getElementById('msg');
const btn = document.getElementById('btnGenerate');

const coder = {
    //str: 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789ёйцукенгшщзхъфывапролджэячсмитьбюЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ `~!@#$%^&*()-_=+[{]};:"\'|,.<>?/№',
    scs: ')brКлeЧ1adйfУмyбPuFРHxЙОIswФ`_qдhЮ№iS>tСn+QJВт^г(к}EЕиЖGсЦрl@цъё=#оьZИ$<ГvzБgщo\'K.]kЩШNаYMчAR4UmOL~?Л!%ЯМЗя cнв;ТЫЁWАюXTD-Х5Пзpэ2"уЭBV&ы8{07,*6ДН|/х9CЬ[Ъ3фежп:шj',
    l: 161,
    test_key: function (str) {
        let size = str.length;
        for (let i = 0; i < size; i++) {
            if (this.scs.indexOf(str[i]) < 0 || str[0] == ' ' || str[size-1] == ' ') return false;
        }
        return true;
    },
    get_md: function(key, rn) {
        let md = rn;
        let keySize = key.length;
        for (let k = 0; k < keySize; k++) {
            let p = this.scs.indexOf(key[k]);
            if (~p) md += p;
        }
        while (md >= this.l) md -= this.l;
        if (md < 1) md = 1;
        return md;
    },
    get_s: function (str, stap) {
        let sl = str.length;
        let ss = stap;
        while (ss >= sl) ss -= sl;
        return str[ss];
    },
    code: function(msg, key) {
        let rn = Math.floor(Math.random() * this.l - 1);
        let md = this.get_md(key, rn);
        let arr = ['-=C=-'];
        let msgSize = msg.length;
        let key_l = key.length;
        let key_i = key.indexOf(this.get_s(key, md)); // start from this key index
        for (let s = 0; s < msgSize; s++) {
            let sPosition = this.scs.indexOf(msg[s]);
            if (~sPosition) {
                let kPosition = this.scs.indexOf(key[key_i]);
                let ns = sPosition + md + kPosition;
                while (ns >= this.l) ns -= this.l;
                arr.push(this.scs[ns]);
            } else arr.push(msg[s]);
            key_i + 1 < key_l ? key_i++ : key_i = 0;
        }
        arr.push(this.scs[rn],'-=C=-');
        return arr.join('');
    },
    decode: function(msg, key) {
        if (msg.substr(0, 5) != '-=C=-') return 'ERROR: wrong message prefix!';
        if (msg.substr(-5) != '-=C=-') return 'ERROR: wrong message postfix!';
        let rn = this.scs.indexOf(msg[msg.length - 6]);
        let md = this.get_md(key, rn);
        if (! ~md) return 'ERROR: wrong message!';
        let arr = [];
        let msgSize = msg.length - 6;
        let key_l = key.length;
        let key_i = key.indexOf(this.get_s(key, md)); // start from this key index
        for (let s = 5; s < msgSize; s++) {
            let sPosition = this.scs.indexOf(msg[s]);
            if (~sPosition) {
                let kPosition = this.scs.indexOf(key[key_i]);
                let ns = sPosition - md - kPosition;
                while (ns < 0) ns += this.l;
                arr.push(this.scs[ns]);
            } else arr.push(msg[s]);
            key_i + 1 < key_l ? key_i++ : key_i = 0;
        }
        return arr.join('');
    },
    generateKey: function() {
        let keySize = Math.floor(Math.random() * 8) + 5;
        let arr = [];
        for (let i = 0; i < keySize; i++) {
            let p = Math.floor(Math.random() * this.l - 1);
            let s = this.scs[p];
            if (s != ' ') arr.push(s);
        }
        return arr.join('');
    }
};
key.value = coder.generateKey();
ready = true;

const codeType = {
    code: document.getElementById('code'),
    decode: document.getElementById('decode'),
    switch: function() {
        this.code.parentNode.classList.toggle('selected', this.code.checked);
        this.decode.parentNode.classList.toggle('selected', this.decode.checked);
        btn.innerText = this.code.checked ? 'code' : 'decode';
    }
};

function doCode() {
    if (ready && msg.value) {
        let res;
        if (codeType.code.checked) msg.value = coder.code(msg.value, key.value);
        else msg.value = coder.decode(msg.value, key.value);
    } else {
        if (ready) msg.value = " WHERE IS MESSAGE ???";
        else if (msg.value) msg.value = " #!@ INVALID CODE @!#";
        else msg.value = " MESSAGE ??? CODE ???";
    }
}

function keyCopyClick() {
    key.select();
    document.execCommand("copy");
}

function msgCopyClick() {
    msg.select();
    document.execCommand("copy");
}

function typeKpde(str) {
    ready = str ? coder.test_key(str) : false;
    if (ready) keyTitle.innerHTML = 'Code key:';
    else keyTitle.innerHTML = '<i>Invalid code key:</i>';
}

/////////////////////////////////////////////////
/*
// test 

let codeStr = '-=C=-ustфysгМ-=C=-';
let codeKey = '1011';
let charsKey = coder.scs;
let charsKeySize = charsKey.length;

console.log('key =', codeKey, '; result =', coder.decode(codeStr, codeKey));
for (let i = 0; i < charsKeySize; i++) {
    console.log('key =', charsKey[i], '; result =', coder.decode(codeStr, charsKey[i]));
}
*/
////////////////////////////////////////////////
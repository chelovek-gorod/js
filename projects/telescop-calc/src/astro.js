//////////////////////////////////////////////
//                                          //
//   СКРИПТ РАСЧЕТА ОКУЛЯРА для ТЕЛЕСКОПА   //
//                                          //
//////////////////////////////////////////////

"use strict";

let telescope = {
    
    type: 0,   // 0 - линзовый; 1 - зеркальный; 2 - зеркальнолинзовый
    DMain: 70, // опертура
    df: 31.75, // фокусер (и вторичное зеркало)
    dfk: 0,    // Корректировка (Рефрактор / Рефлектор / Катадиоптрик)
    D: 70,     // реальная опертура (перерасчет для type1 и type2)
    FMain: 700,// Фокусное расстояние
    F: 700,    // Фокусное расстояние (перерасчет с линзай Барлоу)
    
    barlou: false,
    bx: 2.00   // кратность линзы Барлоу (учет при использовании)
};

let eyepice = {
    
    f: 10,  // Фокусное растояние
    x: 70,  // увеличение
    a: 40,  // угол обзора
    v: 0.57,   // угловой обзор в телескопе = a/X
    e: 1.00,// размер выходного зрачка = D/X
    d: 1.00 // отношение к опертуре = X/D
};

/*

m1
m2
m3
m4
m5
m8
m10
m11
m12
m13
m15
m16
m17
m20
m22
m23
m27
m31
m32
m33
m35
m36
m37
m39
m41
m42
m43
m44
m45
m51
m56
m57
m63
m65,m66
m78
m81,m82
m84,m86
m92
m94
m95
m96
m97
m101
m103
m105
m106
m110
cr399
ngc404
ngc752
ngc869
ngc1662
ngc1981
ngc2024
ngc2071
ngc2239
ngc2371,ngc2372
ngc2392
ngc2903
ngc3628
ngc6210
ngc6823
ngc6826
ngc6830
ngc6940
ngc6960
ngc7000
ngc7009
ngc7293
ngc7662
Castor
Mizar and Alcor
betelgeuse
Rasalgethi
Barnard's Star
Delta Lyrae
Almach

*/

let objects = {
    /*  
       для расчета Size делим угловые секунды на 3600 например ср угл.размеры солнца = 31'59"
       31'59" = 31*60" + 59" = 1919"     ||     1919"/3600 = 0.533056 
       
       name   [ minSize, midSize,  maxSize, 1deg = pix, imgSize pix, bright K, cssBgImg]   */
    sun_p :   [0.524167, 0.533194, 0.542222,   4000,       2400,        -1,    "Солнце (фотосфера)",         "url('./src/images/objects/object_sun_p.png')"],
    sun_c :   [0.524167, 0.533194, 0.542222,   4000,       2400,        -1,    "Солнце (хромосфера)",        "url('./src/images/objects/object_sun_c.png')"],
    moon :    [0.488889, 0.528611, 0.568333,   4000,       2400,        -1,    "Луна",                       "url('./src/images/objects/object_moon.png')"],
    mercury : [0.001250, 0.002431, 0.003611,  50000,       600,         -1,    "Меркурий",                   "url('./src/images/objects/object_mercury.png')"],
    venus :   [0.002694, 0.010514, 0.018333,  50000,       600,         -1,    "Венера",                     "url('./src/images/objects/object_venus.png')"],
    mars :    [0.000972, 0.003972, 0.006972,  50000,       600,         -1,    "Марс",                       "url('./src/images/objects/object_mars.png')"],
    jupiter : [0.008278, 0.011097, 0.013917,  50000,      1200,         -1,    "Юпитер",                     "url('./src/images/objects/object_jupiter.png')"],
    saturn :  [0.004028, 0.004806, 0.005583,  50000,      1200,         -1,    "Сатурн",                     "url('./src/images/objects/object_saturn.png')"],
    uran :    [0.000917, 0.001028, 0.001139, 100000,       300,         -1,    "Уран",                       "url('./src/images/objects/object_uran.png')"],
    neptun :  [0.000611, 0.000639, 0.000667, 100000,       300,         -1,    "Нептун",                     "url('./src/images/objects/object_neptun.png')"],
    m1 :      [0.083333, 0.083333, 0.083333,   3000,      1200,        8.4,    "M1 (Остаток сверхновой)",    "url('./src/images/objects/object_m1.png')"],
    m2 :      [0.216667, 0.216667, 0.216667,   3000,      1200,        6.6,    "M2 (Шаровое скопление)",     "url('./src/images/objects/object_m2.png')"],
    m3 :      [0.266667, 0.266667, 0.266667,   1500,      1200,        6.3,    "M3 (Шаровое скопление)",     "url('./src/images/objects/object_m3.png')"],
    m4 :      [0.433333, 0.433333, 0.433333,   2000,      1200,        5.4,    "M4 (Шаровое скопление)",     "url('./src/images/objects/object_m4.png')"],
    m5 :      [0.283333, 0.283333, 0.283333,   2000,      1200,        5.7,    "M5 (Шаровое скопление)",     "url('./src/images/objects/object_m5.png')"],
    m8 :      [1.083333, 1.083333, 1.083333,   1000,      2400,        5.0,    "M8 (Туманность Лагуна)",     "url('./src/images/objects/object_m8.png')"],
    m10 :     [0.250000, 0.250000, 0.250000,   1000,      1200,        6.6,    "M10 (Шаровое скопление)",    "url('./src/images/objects/object_m10.png')"],
    m11 :     [0.233333, 0.233333, 0.233333,   1000,       600,        5.8,    "M11 (Рассеянное скопление)", "url('./src/images/objects/object_m11.png')"],
    m12 :     [0.233333, 0.233333, 0.233333,   2000,      1200,        6.1,    "M12 (Шаровое скопление)",    "url('./src/images/objects/object_m12.png')"],
    m13 :     [0.383333, 0.383333, 0.383333,   1000,      1200,        5.8,    "M13 (Шаровое скопление)",    "url('./src/images/objects/object_m13.png')"],
    m31 :     [2.841667, 2.841667, 2.841667,    300,      2400,        3.5,    "M31 (Галактика Андромеды)",  "url('./src/images/objects/object_m31.png')"],
    m42 :     [1.083333, 1.083333, 1.083333,    600,      1200,        3.5,    "M42 (Туманность Ориона)",    "url('./src/images/objects/object_m42.png')"],
    almach :  [0.002667, 0.002667, 0.002667,  15000,       600,         -1,    "Аламак (γ Андромеды)",       "url('./src/images/objects/object_almach.png')"]
};

let idTelescopeImg = document.getElementById("telescopeImg");
let ArrTelescopeImgs = ["./src/images/tr_.png", "./src/images/tn_.png", "./src/images/tk_.png", "./src/images/tr_b.png", "./src/images/tn_b.png", "./src/images/tk_b.png"];
let idTelescopeRadio0 = document.getElementById("tt0");
let idTelescopeRadio1 = document.getElementById("tt1");
let idTelescopeRadio2 = document.getElementById("tt2");
let idTelescopeD = document.getElementById("telescopeD");
let idTelescopeF = document.getElementById("telescopeF");
let idTelescopeDk = document.getElementById("telescopeDk");
let idTelescopeFk = document.getElementById("telescopeFk");
let idTelescopeIn = document.getElementById("telescopeIn");

let idEyepiceF = document.getElementById("eyepiceF");
let idEyepiceX = document.getElementById("eyepiceX");
let idEyepiceA = document.getElementById("eyepiceA");
let idEyepiceV = document.getElementById("eyepiceV");
let idEyepiceE = document.getElementById("eyepiceE");
let idEyepiceD = document.getElementById("eyepiceD");

let idBarlouCheckbox = document.getElementById("barlou");
let idBarlouX = document.getElementById("barlouX");

let idX20d = document.getElementById("x20d");
let idF20d = document.getElementById("f20d");
let idE20d = document.getElementById("e20d");
let idX15d = document.getElementById("x15d");
let idF15d = document.getElementById("f15d");
let idE15d = document.getElementById("e15d");
let idX10d = document.getElementById("x10d");
let idF10d = document.getElementById("f10d");
let idE10d = document.getElementById("e10d");
let idX07d = document.getElementById("x07d");
let idF07d = document.getElementById("f07d");
let idE07d = document.getElementById("e07d");
let idX05d = document.getElementById("x05d");
let idF05d = document.getElementById("f05d");
let idE05d = document.getElementById("e05d");
let idX03d = document.getElementById("x03d");
let idF03d = document.getElementById("f03d");
let idE03d = document.getElementById("e03d");
let idX02d = document.getElementById("x02d");
let idF02d = document.getElementById("f02d");
let idE02d = document.getElementById("e02d");

let idFf = document.getElementById("ff");
let idRr = document.getElementById("rr");
let idMm = document.getElementById("mm");
let idMk = document.getElementById("mk");

let idPlanets = document.getElementById("planets");
let idPs = document.getElementById("ps");
let idEyepiceBrder = document.getElementById("eyepice-border");
let idEyepice = document.getElementById("eyepice");

let objectsList ="";
for (let obj_i in objects) {
    objectsList += "<option ";
    if (obj_i == "jupiter") {objectsList += "selected ";}
    objectsList += "value=" + obj_i + ">" + objects[obj_i][6] + "</option>";
}
idPlanets.innerHTML = objectsList;

function reCalckTelescope() {
    
    //барлоу
    if (telescope.barlou) {
        telescope.F = telescope.FMain * telescope.bx;
    } else {
        telescope.F = telescope.FMain;
    }
    
    //опертура
    if (telescope.type === 0) {
        telescope.D = telescope.DMain;
    } else {
        if (telescope.type === 1) {telescope.dfk = 1.2} else {telescope.dfk = 0.7}
        telescope.D = telescope.DMain - (telescope.DMain *
        (3.1416 * telescope.df * telescope.dfk * 0.5 * telescope.df * telescope.dfk * 0.5)/
        (3.1416 * telescope.DMain * 0.5 * telescope.DMain * 0.5));
    }
    
    idTelescopeD.value = telescope.DMain.toFixed(0);
    idTelescopeF.value = telescope.FMain.toFixed(0);
    idTelescopeDk.innerHTML = telescope.D.toFixed(2);
    idTelescopeFk.innerHTML = telescope.F.toFixed(2);
    
    idBarlouX.value = telescope.bx.toFixed(2);
    
    /*харрактеристики телескопа*/
    idX20d.innerHTML = (telescope.D * 2).toFixed(0);
    idF20d.innerHTML = (telescope.F / (telescope.D * 2)).toFixed(1);
    idE20d.innerHTML = (telescope.D / (telescope.D * 2)).toFixed(1);
    idX15d.innerHTML = (telescope.D * 1.5).toFixed(0);
    idF15d.innerHTML = (telescope.F / (telescope.D * 1.5)).toFixed(1);
    idE15d.innerHTML = (telescope.D / (telescope.D * 1.5)).toFixed(1);
    idX10d.innerHTML = (telescope.D).toFixed(0);
    idF10d.innerHTML = (telescope.F / telescope.D).toFixed(1);
    idE10d.innerHTML = (telescope.D / telescope.D).toFixed(1);
    idX07d.innerHTML = (telescope.D * 0.7).toFixed(0);
    idF07d.innerHTML = (telescope.F / (telescope.D * 0.7)).toFixed(1);
    idE07d.innerHTML = (telescope.D / (telescope.D * 0.7)).toFixed(1);
    idX05d.innerHTML = (telescope.D * 0.5).toFixed(0);
    idF05d.innerHTML = (telescope.F / (telescope.D * 0.5)).toFixed(1);
    idE05d.innerHTML = (telescope.D / (telescope.D * 0.5)).toFixed(1);
    idX03d.innerHTML = (telescope.D * (1 / 3)).toFixed(0);
    idF03d.innerHTML = (telescope.F / (telescope.D * (1 / 3))).toFixed(1);
    idE03d.innerHTML = (telescope.D / (telescope.D * (1 / 3))).toFixed(1);
    idX02d.innerHTML = (telescope.D * (1 / 6)).toFixed(0);
    idF02d.innerHTML = (telescope.F / (telescope.D * (1 / 6))).toFixed(1);
    idE02d.innerHTML = (telescope.D / (telescope.D * (1 / 6))).toFixed(1);

    idFf.innerHTML = (telescope.F / telescope.D).toFixed(1);
    idRr.innerHTML = (140 / telescope.D).toFixed(2);
    idMm.innerHTML = (2.1 + 5 * Math.log10(telescope.D)).toFixed(1);
    idMk.innerHTML = ((140 / telescope.D)/0.2667).toFixed(1);
    
    changeEav();
    reCalckEyepice();
}

function reCalckEyepice() {
    
    eyepice.x = telescope.F / eyepice.f;
    eyepice.e = telescope.D / eyepice.x;
    eyepice.d = eyepice.x / telescope.D;
    
    eyepice.v = eyepice.a / eyepice.x;
    idEyepiceV.innerHTML = eyepice.v.toFixed(2);
    
    idEyepiceF.value = eyepice.f.toFixed(1);
    idEyepiceX.value = eyepice.x.toFixed(1);
    idEyepiceE.value = eyepice.e.toFixed(2);
    idEyepiceD.value = eyepice.d.toFixed(2);
    
    // ГРАФИЧЕСКАЯ ЧАСТЬ
    let bgSize = Math.pow(eyepice.x / telescope.D, 0.2) * 600;
    let Vpix = eyepice.a * 20;
    idEyepiceBrder.style.width = Vpix + "px";
    idEyepiceBrder.style.height = Vpix + "px";
    idEyepiceBrder.style.marginLeft = "-" + (3 + Vpix * 0.5) + "px";
    idEyepiceBrder.style.backgroundSize = bgSize + "px";
    
    // угол, отображаемый одним пикселям при данном увеличении
    let pix = eyepice.v / Vpix;
    
    let M = objects[idPlanets.value][3] * pix;
    let S = objects[idPlanets.value][idPs.value] / objects[idPlanets.value][1];
    
    let Sinner = S / M * objects[idPlanets.value][4];
    
    let max_eye = 6;
    let bright, eye_mm_k, bright_k, sq_m, op_obj;
    if (objects[idPlanets.value][5] == -1 ) {
        // SSO
        bright_k = 54;
        eye_mm_k = eyepice.e > max_eye ? max_eye : eyepice.e;
        bright = telescope.D * eye_mm_k / bright_k;
        op_obj = 1;
    } else {
        // DSO
        bright_k = 36;
        bright = (telescope.D / bright_k) / objects[idPlanets.value][5];
        if (eyepice.e > max_eye) {
            op_obj = 1;
        } else {
            op_obj = ((eyepice.e / 2) * (eyepice.e / 2)) / ((max_eye / 2) * (max_eye / 2));
            // op_obj *= 1.772456; // sqrt(3.1416) - балансир
        }
    }
    
    let blur;
    if (Sinner > objects[idPlanets.value][4]) {
        blur = (Sinner / objects[idPlanets.value][4]).toFixed(0) + (eyepice.x / telescope.D).toFixed(0);}
    else if (eyepice.x < (telescope.D * 2.3)) {blur = 0;}
    else if (eyepice.x < (telescope.D * 2.7)) {blur = 1;}
    else {blur = (eyepice.x / telescope.D).toFixed(0);}
    
    idEyepice.style.filter = "blur("+ blur +"px) brightness(" + bright + ")";
    idEyepice.style.backgroundSize = Sinner + "px";
    idEyepice.style.opacity = op_obj;
}

function testInputValue(valueIs, min, max, valueNo) {
    let newValue = parseFloat(valueIs.replace(/,/,'.'));
    if (isNaN(newValue) || newValue < min || newValue > max) {return valueNo;}
    else {return newValue;}
}

function change(item) {
    
    switch (item) {
        
        // БЛОК ТЕЛЕСКОПА
        case 'it' : {
            if (telescope.type === 0) {telescope.type = 1; idTelescopeRadio1.checked = true;} else
            if (telescope.type === 1) {telescope.type = 2; idTelescopeRadio2.checked = true;} else
            if (telescope.type === 2) {telescope.type = 0; idTelescopeRadio0.checked = true;}
            if (telescope.barlou) idTelescopeImg.src = ArrTelescopeImgs[telescope.type+3];
            else idTelescopeImg.src = ArrTelescopeImgs[telescope.type];
        } break;
        
        case 't0' : {
            telescope.type = 0;
            if (telescope.barlou) idTelescopeImg.src = ArrTelescopeImgs[telescope.type+3];
            else idTelescopeImg.src = ArrTelescopeImgs[telescope.type];
        } break;
        case 't1' : {
            telescope.type = 1;
            if (telescope.barlou) idTelescopeImg.src = ArrTelescopeImgs[telescope.type+3];
            else idTelescopeImg.src = ArrTelescopeImgs[telescope.type];
        } break;
        case 't2' : {
            telescope.type = 2;
            if (telescope.barlou) idTelescopeImg.src = ArrTelescopeImgs[telescope.type+3];
            else idTelescopeImg.src = ArrTelescopeImgs[telescope.type];
        } break;
        
        case 'td' : {
            telescope.DMain = testInputValue(idTelescopeD.value, 30, 5000, telescope.DMain);
        } break;
        
        case 'tf' : {
            telescope.FMain = testInputValue(idTelescopeF.value, 100, 10000, telescope.FMain);
        } break;
        
        case 'ti' : {telescope.df = idTelescopeIn.value;} break;
        
        //БЛОК ЛИНЗЫ БАРЛОУ
        case 'ie' : {
            if (telescope.barlou) {
                idBarlouCheckbox.checked = telescope.barlou = false;
                if (telescope.barlou) idTelescopeImg.src = ArrTelescopeImgs[telescope.type+3];
                else idTelescopeImg.src = ArrTelescopeImgs[telescope.type];
            }
            else {
                idBarlouCheckbox.checked = telescope.barlou = true; 
                if (telescope.barlou) idTelescopeImg.src = ArrTelescopeImgs[telescope.type+3];
                else idTelescopeImg.src = ArrTelescopeImgs[telescope.type];
            }
        } break;
        
        case 'bc' : {
            if (telescope.barlou) {
                telescope.barlou = false;
                if (telescope.barlou) idTelescopeImg.src = ArrTelescopeImgs[telescope.type+3];
                else idTelescopeImg.src = ArrTelescopeImgs[telescope.type];
            }
            else {
                telescope.barlou = true;
                if (telescope.barlou) idTelescopeImg.src = ArrTelescopeImgs[telescope.type+3];
                else idTelescopeImg.src = ArrTelescopeImgs[telescope.type];
                if (telescope.bx == 1.00) {telescope.bx = 2.00;}
            }
        } break;
        
        case 'bx' : {
            telescope.bx = testInputValue(idBarlouX.value, 0.10, 10, telescope.bx);
        } break;
    }
    
    reCalckTelescope();
}

function changeEye(item) {
    
    switch (item) {
        
        // БЛОК ОКУЛЯРА
        case 'ef' : {
            eyepice.f = testInputValue(idEyepiceF.value, 1.5, 80, eyepice.f);
        } break;
        
        case 'ex' : {
            eyepice.x = testInputValue(idEyepiceX.value, (telescope.D / 10), (telescope.D * 4), eyepice.x);
            eyepice.f = telescope.F / eyepice.x;
        } break;
        
        case 'ee' : {
            eyepice.e = testInputValue(idEyepiceE.value, 0.25, 14, eyepice.e);
            eyepice.x = telescope.D / eyepice.e;
            eyepice.f = telescope.F / eyepice.x;
        } break;
        
        case 'ed' : {
            eyepice.d = testInputValue(idEyepiceD.value, 0.1, 4, eyepice.d);
            eyepice.x = eyepice.d * telescope.D;
            eyepice.f = telescope.F / eyepice.x;
        } break;
    }
    
    reCalckEyepice(item);
}

function changeEav() {
    
    eyepice.a = testInputValue(idEyepiceA.value, 30, 90, eyepice.a);
    idEyepiceA.value = eyepice.a.toFixed(1);
    
    reCalckEyepice();
}

//Графическая часть
function changePlanet() {idEyepice.style.backgroundImage = objects[idPlanets.value][7]; reCalckEyepice();}
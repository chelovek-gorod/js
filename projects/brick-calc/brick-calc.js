/* 29-08-2019 Разработал Мирге Марсель */

var aboutDiv = document.getElementById('about');
var aboutHideDiv = document.getElementById('about-hide');

aboutHideDiv.addEventListener('click' , ()=> {
    if (aboutDiv.style.display === "block") {
        aboutDiv.style.display = "none";
        aboutHideDiv.innerHTML = 'Развернуть описание';
    } else {
        aboutDiv.style.display = "block";
        aboutHideDiv.innerHTML = 'Cвернуть описание'; 
    }
});
aboutDiv.addEventListener('click' , ()=> {
    aboutDiv.style.display = "none";
    aboutHideDiv.innerHTML = 'Свернуть описание';
});

///////////////////////////////////////////////////////////////////////////////////////////////////////
//ВВОДНЫЕ ПРАРАМЕТРЫ:
///////////////////////////////////////////////////////////////////////////////////////////////////////

//картинки толщины шва
var array_seam_img = new Array(

'./calckimg/key-s-005.png',
'./calckimg/key-s-006.png',
'./calckimg/key-s-007.png',
'./calckimg/key-s-008.png',
'./calckimg/key-s-009.png',
'./calckimg/key-s-010.png',
'./calckimg/key-s-011.png',
'./calckimg/key-s-012.png',
'./calckimg/key-s-013.png',
'./calckimg/key-s-014.png',
'./calckimg/key-s-015.png'

);

//картинки, названия и размеры кирпичей
var array_brick_img=new Array(

'./calckimg/key-k-0.png',
'./calckimg/key-k-1.png',
'./calckimg/key-k-2.png',
'./calckimg/key-k-3.png',
'./calckimg/key-k-4.png',
'./calckimg/key-k-5.png',
'./calckimg/key-k-6.png',
'./calckimg/key-k-7.png'

);

var array_brick_name=new Array(

"250 х 60 х 65 мм<br>узкий колотый<br>односторонний<br><br>",
"250 х 76 х 65 мм<br>колотый с двух<br>противоположных<br>сторон",
"230 х 100 х 65 мм<br>колотый<br>двусторонний<br><br>",
"250 х 100 х 65 мм<br>колотый<br>односторонний<br><br>",
"250 х 120 х 65 мм<br>гладкий<br><br><br>",
"250 х 120 х 88 мм<br>пустотелый<br>гладкий<br><br>",
"250 х 120 х 88 мм<br>пустотелый<br>колотый<br>односторонний",
"250 х 120 х 88 мм<br>пустотелый<br>колотый<br>двусторонний"

);

var array_text_bricks=new Array(

" шт. узкого колотого одностороннего кирпича, размером 250 х 60 х 65 мм",
" шт. колотого с двух противоположных сторон кирпича, размером 250 х 76 х 65 мм",
" шт. двустороннего колотого кирпича, размером 230 х 100 х 65 мм",
" шт. одностороннего колотого кирпича, размером 250 х 100 х 65 мм",
" шт. гладкого кирпича, размером 250 х 120 х 65 мм",
" шт. пустотелого гладкого кирпича, размером 250 х 120 х 88 мм пустотелый гладкий",
" шт. пустотелого, колотого с одной стороны, кирпича, размером 250 х 120 х 88 мм",
" шт. пустотелого, колотого с двух сторон, кирпича, размером 250 х 120 х 88 мм"

);

var array_brick_W = [0.250, 0.250, 0.230, 0.250, 0.250, 0.250, 0.250, 0.250];
var array_brick_H = [0.065, 0.065, 0.065, 0.065, 0.065, 0.088, 0.088, 0.088];
var array_brick_L = [0.060, 0.076, 0.100, 0.100, 0.120, 0.120, 0.120, 0.120];
var array_brick   = new Array(array_brick_W, array_brick_H, array_brick_L);            

//картинки, названия ФОРМ столба и число кирпичей в ширине грани
var array_pillar_img=new Array(

'./calckimg/key-stolb-0.png',
'./calckimg/key-stolb-1.png',
'./calckimg/key-stolb-2.png',
'./calckimg/key-stolb-3.png'

);

var array_pillar_name=new Array(

"1,5 х 1,5 кирпича",
"1,5 х 2 кирпича",
"2 х 1,5 кирпича",
"2 х 2 кирпича"

);


	//картинки -
var img_minus_off = "./calckimg/minus-off.png";
var img_minus_on = "./calckimg/minus-on.png";
	
	//картинки +
var img_plus_off = "./calckimg/plus-off.png";
var img_plus_on = "./calckimg/plus-on.png";

	//картинки V
var img_checked_off = "./calckimg/included-off.png";
var img_checked_on = "./calckimg/included-on.png";


	//стили текста под кнопками

var color_on = "#000";
var color_off = "#AAA";

/////////////////////////////////////////////////////////////////////////

	//собираем ID ТОЛЩИНЫ ШВА
	
var key_seam_img=document.getElementById("id-img-key-s");

var key_seam_name=document.getElementById("id-txt-key-s");

var key_seam_min=document.getElementById("id-min-key-s");
var key_seam_plu=document.getElementById("id-plu-key-s");

	//собираем ID КИРПИЧ ДЛЯ ПРОЛЕТА
	
var key_brick_span_img=document.getElementById("id-img-key-kp");

var key_brick_span_name=document.getElementById("id-txt-key-kp");

var key_brick_span_min=document.getElementById("id-min-key-kp");
var key_brick_span_plu=document.getElementById("id-plu-key-kp");

	//собираем ID КИРПИЧ ДЛЯ СТОЛБА
	
var key_brick_pillar_img=document.getElementById("id-img-key-ks");

var key_brick_pillar_name=document.getElementById("id-txt-key-ks");

var key_brick_pillar_min=document.getElementById("id-min-key-ks");
var key_brick_pillar_plu=document.getElementById("id-plu-key-ks");

	//собираем ID ФОРМА СТОЛБА
	
var key_pillar_form_img=document.getElementById("id-img-key-st");

var key_pillar_form_name=document.getElementById("id-txt-key-st");
var key_pillar_width_mm=document.getElementById("id-txt-width-st");
var key_pillar_length_mm=document.getElementById("id-txt-length-st");

var key_pillar_form_min=document.getElementById("id-min-key-st");
var key_pillar_form_plu=document.getElementById("id-plu-key-st");

	//собираем ID ПЕРИМЕТРА ЗАБОРА
	
var img_input_perimeter_fence=document.getElementById("id-img-input-perimeter-fence");

var input_perimeter_fence_meters=document.getElementById("id-input-perimeter-fence-meters");
var input_perimeter_fence_bricks=document.getElementById("id-input-perimeter-fence-bricks");

	//собираем ID ВЫСОТЫ ПРОЛЕТА
	
var img_input_height_span=document.getElementById("id-img-input-height-span");

var input_height_span_meters=document.getElementById("id-input-height-span-meters");
var input_height_span_bricks=document.getElementById("id-input-height-span-bricks");


	//собираем ID ВЫСОТЫ СТОЛБА
	
var img_input_height_pillar=document.getElementById("id-img-input-height-pillar");

var input_height_pillar_meters=document.getElementById("id-input-height-pillar-meters");
var input_height_pillar_bricks=document.getElementById("id-input-height-pillar-bricks");

	//собираем ID ЧИСЛО ЭЛЕМЕНТОВ
	
var img_input_elements_number=document.getElementById("id-img-input-elements-number");

var input_spans_number=document.getElementById("id-input-spans-number");
var input_pillars_number=document.getElementById("id-input-pillars-number");

var key_checked_key=document.getElementById("id-checked-key");
var text_checked_key=document.getElementById("id-txt-checked-key");

var text_checked_in_perimeter=document.getElementById("id-txt-checked-in-perimeter");

var button_calculate=document.getElementById("button-calculate"); // style="background: #5baa00
var out_calculation_txt=document.getElementById("id-out-calculation-txt");

////////////////////////////////////////////////////////////////////////////////
//ИСХОДНЫЕ ДАННЫЕ
////////////////////////////////////////////////////////////////////////////////

// ВСЕ ОПЕРАЦИИ ВЫЧИСЛЕНИЯ И ХРОНЕНИЯ ДАННЫХ В МЕТРАХ!!!!
// W = Width - ширина, визуально от левого до правого края
// H = Height - высота визуально с низу вверх
// L = Length - глубина (длина), визуально от себя и в вдаль по горизонтали
// переводим метры в миллиметры : num*=1000;
    
//ШОВ	
// толщина шва по умолчанию. возможные варианты: 5,6,7,8,9,10,11,12,13,14,15
var seam_mm = 10;   // mm
var seam_m = 0.010; // M

//ПРОЛЕТЫ
//переменные для ввода
var spanNumbers = 1;
var spanHinBricks = 25;
var spanHinMeters = 1.875;
var spanWinBricks = 10;
var spanWinMeters = 2.610;
var minInputSpanM = 0;
var minInputSpanB = 0;
var minInputSpanN = 0;
var maxInputSpanM = 0;
var maxInputSpanB = 0;
var maxInputSpanN = 0;
var inputSpanM = 1.875;
var inputSpanB = 25;
var inputSpanN = 1;

//кирпич для пролетов
var spanBrickType = 4;//номер кирпича (0-7) для пролета

var SBW = 10; var SMW =2.610;
var SBH = 25; var SMH =1.875;

//СТОЛБ
var pillarNumbers = 2;    // количество
var pillarForm = 2;    // форма
var pillarHinBricks = 27;
var pillarHinMeters = 2.025;
var pillarWinBricks = 2;
var pillarWinMeters = 0.470;
var minInputPillarM = 0;
var minInputPillarB = 0;
var minInputPillarN = 0;
var maxInputPillarM = 0;
var maxInputPillarB = 0;
var maxInputPillarN = 0;
var inputPillarM = 2.025;
var inputPillarB = 27;
var inputPillarN = 2;
//кирпич
var pillarBrickTypeA = 2;//номер кирпича (0-7) 
var pillarBrickTypeB = 3;//номер кирпича (0-7)
var numbersBrickTypeA = 4;
var numbersBrickTypeB = 1;

var PBW = 2; var PMW = 0.470; 
var PBH = 27; var PMH = 2.025;
var PBL = 1.5; var PML = 0.340;

//ДЛИННА ЗАБОРА
var fenceWinBricks = 14;
var fenceWinMeters = 3.550;
var minInputPerimeterM = 0;
var minInputPerimeterB = 0;
var maxInputPerimeterM = 0;
var maxInputPerimeterB = 0;
var inputPerimeterM = 2.610;
var inputPerimeterB = 10;
var to_brick = 0;
var to_brick_ceil = 0;

//СООБЩЕНИЯ ПРИ НЕВЕРНОМ ДЕЙСТВИИ ПОЛЬЗОВАТЕЛЮ
var msg_one_type_pillar = '\n С выбранным Вами кирпичом для столба '
                        + '\n возможно выложить только один вид столба '
                        + '\n правильной формы!';
                        
var pillar_combo_text ="" ;
var span_combo_text ="" ;

//УЧЕТ СТОЛБОВ В ПИРИМЕТРЕ ЗАБОРА
var includedPillarInFence=true;//по умолчанию ширина столбов включина в общую длину забора

var canToCalculate=true;// все данные для финального расчета есть, можно считать

//ВЫВОДИЛСЯ ЛИ ФИНАЛЬНЫЙ РАСЧЕТ
var resultReady = false; //результаты расчета не выводились пользователю

///////////////////////////////////////////////////////////////////////////////
/*

 Р А С Ч Е Т Н Ы Й   М О Д У Л Ь
 
 */
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// ПЕРЕРАСЧЕТ ПОРАМЕТРОВ ДЛЯ ФИНАЛЬНОГО ВЫВОДА
////////////////////////////////////////////////////////////////////////////////
function Calculate() {
    if (canToCalculate === false){

        if (resultReady === false) {
            alert ("\n Укажите число пролетов и/или столбов! "
                 + "\n (Вы указали число пролетов = 0 \n и число столбов = 0");
        }
        else{
            alert ("\n Результаты расчета уже выведены ниже! "
                 + "\n\n Измените любой из параметров забора для перерасчета.");
        }
    }
    else {
        // составляем текст для столбов
        if (pillarNumbers == 0) {
            pillar_combo_text = '<span style="color: #aaa;">0 кирпичей для столбов<br>'
                         + '<i>(так как Вы указали число столбов = 0)</i></span>';
        }
        else {
            switch (pillarBrickTypeA) {
                case 0 : /* только 1,5 на 1,5 */ pillar_combo_text = 4 * pillarHinBricks * pillarNumbers
                         + array_text_bricks[pillarBrickTypeA] + " для столбов;";
                         break; 
                case 2 : /* 2х ст. + 1х ст. */
                         if (pillarForm == 0) {
                             pillar_combo_text = 4 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeA]
                             + "для столбов;";
                         }
                         else if (pillarForm == 1 || pillarForm == 2) {
                             pillar_combo_text = 4 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeA]
                             + ", а также <br>"
                             + pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeB] + " для столбов; <br>"
                             + '<span style="color: #aaa;"><i>(каждый ряд столба, выбранной Вами формы,'
                             + 'состоит из 4-х двусторонних колотых кирпичей <br>'
                             + 'и одного одностороннего колотого кирпича)</i></span>';
                         }
                         else { //pillarForm == 3
                             pillar_combo_text = 4 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeA]
                             + ", а также <br>"
                             + 2 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeB] + " для столбов; <br>"
                             + '<span style="color: #aaa;"><i>(каждый ряд столба, выбранной Вами формы,'
                             + 'состоит из 4-х двусторонних колотых кирпичей <br>'
                             + 'и 2-х односторонних колотых кирпичейа)</i></span>';
                         }
                         break;
                case 3 : /* только 1,5 на 1,5 */ pillar_combo_text = 4 * pillarHinBricks * pillarNumbers
                         + array_text_bricks[pillarBrickTypeA] + " для столбов;";
                         break;
                case 4 : if (pillarForm == 0) {
                             pillar_combo_text = 4 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeA]
                             + " для столбов;";
                         }
                         else if (pillarForm == 1 || pillarForm == 2) {
                             pillar_combo_text = 5 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeA]
                             + " для столбов;";
                         }
                         else { //pillarForm == 3
                             pillar_combo_text = 6 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeA]
                             + " для столбов;";
                         }
                         break;
                case 5 : if (pillarForm == 0) {
                             pillar_combo_text = 4 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeA]
                             + " для столбов;";
                         }
                         else if (pillarForm == 1 || pillarForm == 2) {
                             pillar_combo_text = 5 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeA]
                             + " для столбов;";
                         }
                         else { //pillarForm == 3
                             pillar_combo_text = 6 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeA]
                             + " для столбов;";
                         }
                         break;
                case 6 : if (pillarForm == 0) {
                             pillar_combo_text = 4 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeA]
                             + " для столбов;";
                         }
                         else if (pillarForm == 1 || pillarForm == 2) {
                             pillar_combo_text = 5 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeA]
                             + " для столбов;";
                         }
                         else { //pillarForm == 3
                             pillar_combo_text = 6 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeA]
                             + " для столбов;";
                         }
                         break;
                case 7 : /* 2х ст. + 1х ст. */
                         if (pillarForm == 0) {
                             pillar_combo_text = 4 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeA]
                             + " для столбов;";
                         }
                         else if (pillarForm == 1 || pillarForm == 2) {
                             pillar_combo_text = 4 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeA]
                             + ", а также <br>"
                             + pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeB] + " для столбов; <br>"
                             + '<span style="color: #aaa;"><i>(каждый ряд столба, выбранной Вами формы,'
                             + 'состоит из 4-х двусторонних колотых кирпичей <br>'
                             + 'и одного одностороннего колотого кирпича)</i></span>';
                         }
                         else { //pillarForm == 3
                             pillar_combo_text = 4 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeA]
                             + ", а также <br>"
                             + 2 * pillarHinBricks * pillarNumbers + array_text_bricks[pillarBrickTypeB] + " для столбов; <br>"
                             + '<span style="color: #aaa;"><i>(каждый ряд столба, выбранной Вами формы,'
                             + 'состоит из 4-х двусторонних колотых кирпичей <br>'
                             + 'и 2-х односторонних колотых кирпичей)</i></span>';
                         }
                         break;
            }
        }
        //выводим финальный текст расчета
        if (spanNumbers == 0) {
            span_combo_text = '<span style="color: #aaa;">0 кирпичей для пролетов<br>'
                         + '<i>(так как Вы указали число пролетов = 0)</i></span><br>';
        }
        else {
            span_combo_text = spanWinBricks * spanHinBricks + array_text_bricks[spanBrickType]
            + " для пролетов;<br>";
        }
        out_calculation_txt.innerHTML = '<b>Для возведения забора, с выбранными Вами параметрами, потребуется:</b> <br>'
                                      + '<br>' + span_combo_text + '<br>' + pillar_combo_text + '<br><br>'; 
        //теперь оформим все                              
        out_calculation_txt.style.color = color_on;
        out_calculation_txt.focus();
        resultReady = true;
        canToCalculate = false;
        button_calculate.style.background = "#aaa";
    }
}

////////////////////////////////////////////////////////////////////////////////
// ПРОВЕРКА ДЛЯ ФИНАЛЬНОГО ВЫВОДА
////////////////////////////////////////////////////////////////////////////////

function reCalculate() {
    if (spanNumbers == 0 && pillarNumbers == 0) {
        canToCalculate = false;
        button_calculate.style.background = "#aaa";
    }
    else {
        canToCalculate = true;
        button_calculate.style.background = "#5baa00";
    }
    
    //сброс результата
    if (resultReady === true){
        out_calculation_txt.innerHTML = 'Все введенные Вами размеры округляются в большую сторону. <br>'
                                      + 'Длина забора округляется кратно половине длины кирпича. <br>'
                                      + 'Высота столбов и пролетов округляется до высоты целого кирпича.';
        out_calculation_txt.style.color = color_off;
        resultReady = false;
    }
}

////////////////////////////////////////////////////////////////////////////////
// МЕНЯЕМ ФОРМУ СТОЛБА
////////////////////////////////////////////////////////////////////////////////

// Основная
function calculatePillarForm() {
    //alert (seam_m + ' = ' + typeof seam_m);
    /*
    1) проверить что за кирпич столба выбран
    */
    if (pillarBrickTypeA == 0 || pillarBrickTypeA == 3) {
        pillarForm = 0;
        numbersBrickTypeA = 4;
        numbersBrickTypeB = 0;
    }
    else if (pillarBrickTypeA == 2) {
        pillarBrickTypeB = 3;
        switch (pillarForm) {
            case 0 : numbersBrickTypeA = 4; numbersBrickTypeB = 0; break;
            case 1 : numbersBrickTypeA = 4; numbersBrickTypeB = 1; break;
            case 2 : numbersBrickTypeA = 4; numbersBrickTypeB = 1; break;
            case 3 : numbersBrickTypeA = 4; numbersBrickTypeB = 2; break;
        }
    }
    else if (pillarBrickTypeA == 7) {
        pillarBrickTypeB = 6;
        switch (pillarForm) {
            case 0 : numbersBrickTypeA = 4; numbersBrickTypeB = 0; break;
            case 1 : numbersBrickTypeA = 4; numbersBrickTypeB = 1; break;
            case 2 : numbersBrickTypeA = 4; numbersBrickTypeB = 1; break;
            case 3 : numbersBrickTypeA = 4; numbersBrickTypeB = 2; break;
        }
    }
    else {
        switch (pillarForm) {
            case 0 : numbersBrickTypeA = 4; numbersBrickTypeB = 0; break;
            case 1 : numbersBrickTypeA = 5; numbersBrickTypeB = 0; break;
            case 2 : numbersBrickTypeA = 5; numbersBrickTypeB = 0; break;
            case 3 : numbersBrickTypeA = 6; numbersBrickTypeB = 0; break;
        }
    }
    
    switch (pillarForm) {
            case 0 : PBW = 1.5; PMW = array_brick[0][pillarBrickTypeA]+seam_m+array_brick[2][pillarBrickTypeA];
                     PBL = 1.5; PML = PMW; 
                     break;
            case 1 : PBW = 1.5; PMW = array_brick[0][pillarBrickTypeA]+seam_m+array_brick[2][pillarBrickTypeA]; 
                     PBL = 2; PML = array_brick[0][pillarBrickTypeA]*2+seam_m; 
                     break;
            case 2 : PBW = 2; PMW = array_brick[0][pillarBrickTypeA]*2+seam_m; 
                     PBL = 1.5; PML = array_brick[2][pillarBrickTypeA]+seam_m+array_brick[0][pillarBrickTypeA];
                     break;
            case 3 : PBW = 2; PMW = array_brick[0][pillarBrickTypeA]*2+seam_m; 
                     PBL = 2; PML = PMW;
                     break;
        }
    PMW = +PMW.toFixed(3);
    PML = +PML.toFixed(3);

    if (pillarForm == 0) {key_pillar_form_min.src = img_minus_off;} else {key_pillar_form_min.src = img_minus_on;}
    if (pillarForm == 3) {key_pillar_form_plu.src = img_plus_off;} else {key_pillar_form_plu.src = img_plus_on;}
    if (pillarBrickTypeA == 0 || pillarBrickTypeA == 3) {key_pillar_form_plu.src = img_plus_off; key_pillar_form_min.src = img_minus_off;}
    
	key_pillar_form_img.src=array_pillar_img[pillarForm];  
	key_pillar_form_name.innerHTML = array_pillar_name[pillarForm];

    key_pillar_width_mm.innerHTML = PMW*1000;
    key_pillar_length_mm.innerHTML= PML*1000; 	
    
    calculateSpanHN();
    calculatePillarHN();

}

// картинка

function imgKeyPillarType() {
    if (pillarBrickTypeA == 0 || pillarBrickTypeA == 3) {alert (msg_one_type_pillar);} else {
    
        if (pillarForm < 3) {
    	    pillarForm += 1;
    	}
    	else{
    	    pillarForm = 0;
    	}
    
    	calculatePillarForm() ;
    }
}
// +
function pluKeyPillarType(){
    if (pillarBrickTypeA == 0 || pillarBrickTypeA == 3) {alert (msg_one_type_pillar);} else {

    	if (pillarForm <3 ) {
    	    pillarForm += 1;
    		  
    	    calculatePillarForm() ;
    	}
    }
}
// -
function minKeyPillarType(){
    if (pillarBrickTypeA == 0 || pillarBrickTypeA == 3) {alert (msg_one_type_pillar);} else {

    	if (pillarForm > 0) {
    	    pillarForm -=1;
    	   
    	    calculatePillarForm();
    	}
    }
}
////////////////////////////////////////////////////////////////////////////////
// МЕНЯЕМ ТОЛЩИНУ ШВА
////////////////////////////////////////////////////////////////////////////////

// Основная
function calculateSeam() {

    if (seam_mm== 5) {key_seam_min.src = img_minus_off;} else {key_seam_min.src = img_minus_on;}
    if (seam_mm==15) {key_seam_plu.src = img_plus_off;} else {key_seam_plu.src = img_plus_on;}
    
	key_seam_img.src=array_seam_img[seam_mm - 5];  
	key_seam_name.innerHTML = seam_mm;
	
	seam_mm = +seam_mm; // толщина шва в миллиметрах
	seam_m  = +seam_mm * 0.001; // толщина шва в метрах
	seam_m  = +(seam_m).toFixed(3) 

	calculatePillarForm();
}
	
// картинка
function imgKeySeam() {

	if (seam_mm < 15) {
	    seam_mm += 1;
	}
	else{
	    seam_mm = 5;
	}

	calculateSeam() ;
}

// +
function pluKeySeam(){

	if (seam_mm < 15 ) {
	    seam_mm += 1;
		  
	    calculateSeam() ;
	}
}

// -
function minKeySeam(){

	if (seam_mm > 5) {
	    seam_mm -=1;
	   
	    calculateSeam();
	}
}

////////////////////////////////////////////////////////////////////////////////
// МЕНЯЕМ КИРПИЧ ПРОЛЕТА
////////////////////////////////////////////////////////////////////////////////

// основной
function calculateSpanBrick(){

    if (spanBrickType == 0) {key_brick_span_min.src = img_minus_off;} else {key_brick_span_min.src = img_minus_on;}
    if (spanBrickType == 6) {key_brick_span_plu.src = img_plus_off;} else {key_brick_span_plu.src = img_plus_on;}
  
	key_brick_span_img.src=array_brick_img[spanBrickType];
	key_brick_span_name.innerHTML=array_brick_name[spanBrickType];

	calculateSpanHN();

}
	
// картинка
function imgKeySpanBrick(){

	if (spanBrickType < 6){
	  spanBrickType+=1;
	  if (spanBrickType == 2) {spanBrickType = 3;}
	}
	else{
	  spanBrickType = 0;
	}

	calculateSpanBrick() ;
}

// +
function pluKeySpanBrick(){

	if (spanBrickType <6) {
	  spanBrickType+=1;
	  if (spanBrickType == 2) {spanBrickType = 3;}
	  
	  calculateSpanBrick() ;
	}
}

// -
function minKeySpanBrick(){

	if (spanBrickType > 0) {
	  spanBrickType-=1;
	  if (spanBrickType == 2) {spanBrickType = 1;}
	  
	  calculateSpanBrick() ;
	}
}

////////////////////////////////////////////////////////////////////////////////
// МЕНЯЕМ КИРПИЧ СТОЛБА
////////////////////////////////////////////////////////////////////////////////

// основной
function calculatePillarBrick(){
// if (pillarForm > 0 && (pillarBrickTypeA == 0 || pillarBrickTypeA == 3)) {alert (msg_one_type_pillar);}

    if (pillarBrickTypeA == 0) {key_brick_pillar_min.src = img_minus_off;} else {key_brick_pillar_min.src = img_minus_on;}
    if (pillarBrickTypeA == 7) {key_brick_pillar_plu.src = img_plus_off;} else  {key_brick_pillar_plu.src = img_plus_on;}

	key_brick_pillar_img.src=array_brick_img[pillarBrickTypeA];
	key_brick_pillar_name.innerHTML=array_brick_name[pillarBrickTypeA];

    calculatePillarForm();
}
	
// картинка
function imgKeyPillarBrick(){

	if (pillarBrickTypeA < 7){
	  pillarBrickTypeA+=1;
	  if (pillarBrickTypeA == 1) {pillarBrickTypeA = 2;}
	}
	else{
	  pillarBrickTypeA=0;
	}

	calculatePillarBrick() ;
}

// +
function pluKeyPillarBrick(){

	if (pillarBrickTypeA <7) {
	  pillarBrickTypeA+=1;
	  if (pillarBrickTypeA == 1) {pillarBrickTypeA = 2;}
		
	  calculatePillarBrick() ;
	}
}

// -
function minKeyPillarBrick(){

	if (pillarBrickTypeA > 0) {
	  pillarBrickTypeA-=1;
	  if (pillarBrickTypeA == 1) {pillarBrickTypeA = 0;}
		
	  calculatePillarBrick() ;
	}
}

////////////////////////////////////////////////////////////////////////////////
//второй ряд

////////////////////////////////////////////////////////////////////////////////
// КОЛИЧЕСТВО ЭЛЕМЕНТОВ
////////////////////////////////////////////////////////////////////////////////

//фокус на числе пролетов
function imgInpPNum() { input_pillars_number.focus(); }

//включить/выключить учет ширины столбов в периметре забора
function checkedKey() {
    if (includedPillarInFence === true) {
        includedPillarInFence = false;
        key_checked_key.src = img_checked_off;
        text_checked_key.style.color = color_off;
        text_checked_in_perimeter.innerHTML = "Без учета ширины столбов";
    }
    else if (pillarNumbers > 0){
        includedPillarInFence = true;
        key_checked_key.src = img_checked_on;
        text_checked_key.style.color = color_on;
        text_checked_in_perimeter.innerHTML = "С учетом ширины столбов";
    }
    else {
        alert( "\n Чтобы учитывать ширину столбов в ширине забора\n число столбов должно быть больше 0 !" );
    }
    
    //если небыло обновлено
    inputPerimeterB = spanWinBricks;
    calculatePerimeter()
}

//переадрисация высоты и шт пролетов
//принимаем inputSpanB
//принимаем inputSpanN
//запускаем calculatePerimeter()
function calculateSpanHN() {
    //проверяем
    if (inputSpanN > 0 && inputSpanB == 0) {inputSpanB = 1;} 

    //переводим кирпичи в метры
    inputSpanM = inputSpanB * (seam_m + array_brick[1][spanBrickType]);
    spanHinMeters = inputSpanM.toFixed(3);
    spanHinBricks = inputSpanB.toFixed(0);
    input_height_span_meters.value = spanHinMeters;
    input_height_span_bricks.value = spanHinBricks;
    
    spanNumbers = inputSpanN;
    input_spans_number.value = spanNumbers;
        
    //если небыло обновлено
    inputPerimeterB = spanWinBricks;
    calculatePerimeter();
}

//введено число пролетов
function inputSpansNumber() {
    //забираем введенные данные
    inputSpanN = parseFloat(input_spans_number.value.replace(/,/,'.'));
    //проверяем что введено
    if (isNaN(inputSpanN) || inputSpanN < 0 || inputSpanN > 99) {
        // если введено недопустимое значение
        alert( "\n Введено недопустимое значение! \n (введите любое целое число от 0 до 99)" );
        input_spans_number.value = spanNumbers;
        // выходим из функции без изменений ключевых параметров забора
    }
    else {
        inputSpanN = Math.ceil(inputSpanN);
        if (inputSpanN == 0) {inputSpanB = 0;}
        calculateSpanHN();
    }
    
}

//переадрисация высоты и шт столбов
//принимаем inputPillarB
//принимаем inputPillarN
//запускаем calculatePerimeter()
function calculatePillarHN() {
    //проверяем
    if (inputPillarN > 0 && inputPillarB == 0) {inputPillarB = 1;}
    
    //переводим кирпичи в метры
    inputPillarM = inputPillarB * (seam_m + array_brick[1][pillarBrickTypeA]);
    pillarHinMeters = inputPillarM.toFixed(3);
    pillarHinBricks = inputPillarB.toFixed(0);
    input_height_pillar_meters.value = pillarHinMeters;
    input_height_pillar_bricks.value = pillarHinBricks;
    
    pillarNumbers = Math.ceil(inputPillarN);
    input_pillars_number.value = pillarNumbers;
    //отключить учет ширины столбов в периметре забора если столбов = 0
    if (pillarNumbers == 0 && includedPillarInFence === true) {checkedKey();}
        
    calculatePerimeter();
}

//введено число столбов
function inputPillarsNumber() {
    //забираем введенные данные
    inputPillarN = parseFloat(input_pillars_number.value.replace(/,/,'.'));
    //проверяем что введено
    if (isNaN(inputPillarN) || inputPillarN < 0 || inputPillarN > 99) {
        // если введено недопустимое значение
        alert( "\n Введено недопустимое значение! \n (введите любое целое число от 0 до 99)" );
        input_pillars_number.value = pillarNumbers;
        // выходим из функции без изменений ключевых параметров забора
    }
    else {
        inputPillarN = Math.ceil(inputPillarN);
        if (inputPillarN == 0 ) {inputPillarB = 0;}
        calculatePillarHN();
    }
    
}

////////////////////////////////////////////////////////////////////////////////
// ВЫСОТА ПРОЛЕТОВ
////////////////////////////////////////////////////////////////////////////////

//фокус на метрах
function imgInpHSpan() { input_height_span_meters.focus(); }

//введены метры
function inputHeightSpanMeters() {
    //забираем введенные данные
    inputSpanM = parseFloat(input_height_span_meters.value.replace(/,/,'.'));
    //проверяем что введено
    if (inputSpanM == 0 ) {
        // если введено 0
        inputSpanB = 0;
        inputSpanN = 0;
        calculateSpanHN();
        // выходим из функции без изменений ключевых параметров забора
    }
    else if (isNaN(inputSpanM) || inputSpanM < 0 || inputSpanM > 3.5) {
        // если введено недопустимое значение
        alert ( "\n Введено недопустимое значение! \n (введите любое число от 0.000 до 3.500)" );
        input_height_span_meters.value = spanHinMeters;
        // выходим из функции без изменений ключевых параметров забора
    }
    else {
        //считаем сколько вместится сюда [n = кирпич + шов]
        inputSpanB = inputSpanM / (seam_m + array_brick[1][spanBrickType]);
        // округляем до целого числа
        inputSpanB = Math.ceil(inputSpanB);
        if (spanNumbers == 0) {inputSpanN = 1;}

        calculateSpanHN();
    }
}

//введены кирпичи
function inputHeightSpanBricks() {
    //забираем введенные данные
    inputSpanB = parseFloat(input_height_span_bricks.value.replace(/,/,'.'));
    //проверяем что введено
    if (inputSpanB == 0 ) {
        // если введено 0
        inputSpanN = 0;
        calculateSpanHN();
        // выходим из функции без изменений ключевых параметров забора
    }
    else if (isNaN(inputSpanB) || inputSpanB < 0 || inputSpanB > 50) {
        // если введено недопустимое значение
        alert ( "\n Введено недопустимое значение! \n (введите любое число от 0 до 50)" );
        input_height_span_bricks.value = spanHinBricks;
        // выходим из функции без изменений ключевых параметров забора
    }
    else {
        // округляем до целого числа
        inputSpanB = Math.ceil(inputSpanB);
        if (spanNumbers == 0) {inputSpanN = 1;}
        
        calculateSpanHN();
    }
}

////////////////////////////////////////////////////////////////////////////////
// ВЫСОТА СТОЛБОВ
////////////////////////////////////////////////////////////////////////////////

//фокус на метрах
function imgInpHPillar() { input_height_pillar_meters.focus(); }

//введены метры
function inputHeightPillarMeters() { 
    //забираем введенные данные
    inputPillarM = parseFloat(input_height_pillar_meters.value.replace(/,/,'.'));
    //проверяем что введено
    if (inputPillarM == 0 ) {
        // если введено 0
        inputPillarN = 0;
        inputPillarB = 0;
        calculatePillarHN();
        // выходим из функции без изменений ключевых параметров забора
    }
    else if (isNaN(inputPillarM) || inputPillarM < 0 || inputPillarM > 3.5) {
        // если введено недопустимое значение
        alert( "\n Введено недопустимое значение! \n (введите любое число от 0.000 до 3.500)" );
        input_height_pillar_meters.value = pillarHinMeters;
        // выходим из функции без изменений ключевых параметров забора
    }
    else {
        //считаем сколько вместится сюда [n = кирпич + шов]
        inputPillarB = inputPillarM / (seam_m + array_brick[1][pillarBrickTypeA]);
        // округляем до целого числа
        inputPillarB = Math.ceil(inputPillarB);
        if (pillarNumbers == 0) { inputPillarN = 1;}
        
        calculatePillarHN();
    }
}

//введены кирпичи
function inputHeightPillarBricks() {
    //забираем введенные данные
    inputPillarB = parseFloat(input_height_pillar_bricks.value.replace(/,/,'.'));
    //проверяем что введено
    if (inputPillarB == 0 ) {
        // если введено 0
        inputPillarN = 0;
        calculatePillarHN();
        // выходим из функции без изменений ключевых параметров забора
    }
    else if (isNaN(inputPillarB) || inputPillarB < 0 || inputPillarB > 50) {
        // если введено недопустимое значение
        alert( "\n Введено недопустимое значение! \n (введите любое число от 0 до 50)" );
        input_height_pillar_bricks.value = pillarHinBricks;
        // выходим из функции без изменений ключевых параметров забора
    }
    else {
        // округляем до целого числа
        inputPillarB = Math.ceil(inputPillarB);
        if (pillarNumbers == 0) { inputPillarN = 1;}
        
        calculatePillarHN();
    }
}

////////////////////////////////////////////////////////////////////////////////
// ДЛИННА ВСЕГО ЗАБОРА
////////////////////////////////////////////////////////////////////////////////

//фокус на длинне забора в метрах
function imgInpPerFen() { input_perimeter_fence_meters.focus(); }

//расчеты и вывода в поля ввода 
function calculatePerimeter() {
    //проверяем на <= 0
    if (spanNumbers == 0) {inputPerimeterB = 0;}
    if (inputPerimeterB < spanNumbers) { inputPerimeterB = spanNumbers;}
    //перезапись переменных ширины пролета
    spanWinBricks = inputPerimeterB;
    spanWinMeters = (array_brick[0][spanBrickType] + seam_m) * spanWinBricks + seam_m * spanNumbers;
    fenceWinBricks = spanWinBricks + PBW * pillarNumbers;
    fenceWinMeters = spanWinMeters + PMW * pillarNumbers;
    if (includedPillarInFence == true)
    {
        input_perimeter_fence_bricks.value = fenceWinBricks.toFixed(1);
        input_perimeter_fence_meters.value = fenceWinMeters.toFixed(3); 
    }
    else{
        input_perimeter_fence_bricks.value = spanWinBricks.toFixed(1);
        input_perimeter_fence_meters.value = spanWinMeters.toFixed(3);
    }
    
    reCalculate() ;
}

//введены метры
function inputPerimeterMeters() {
    //вычисляем минимальное число для обработки
    if (includedPillarInFence == true){ 
      minInputPerimeterM = PMW * pillarNumbers + (array_brick[0][spanBrickType] + seam_m + seam_m) * spanNumbers;
      minInputPerimeterM = +minInputPerimeterM;
    }
    else {
      minInputPerimeterM = (array_brick[0][spanBrickType] + seam_m) * (spanNumbers + seam_m);
    }
    //забираем введенные данные
    inputPerimeterM = parseFloat(input_perimeter_fence_meters.value.replace(/,/,'.'));
    //проверяем что введено
    if (spanNumbers == 0 && pillarNumbers == 0) {
        alert ("\n Укажите число пролетов или столбов!");
        if (includedPillarInFence == true){ 
            input_perimeter_fence_meters.value = +fenceWinMeters.toFixed(3);
        }
        else {
            input_perimeter_fence_meters.value = +spanWinMeters.toFixed(3);
        }
    }
    else if (isNaN(inputPerimeterM) || inputPerimeterM < minInputPerimeterM || inputPerimeterM > 250) {
        // если введено недопустимое значение
        alert ( "\n Введено недопустимое значение! \n введите любое число от " + minInputPerimeterM.toFixed(3)
              + " до 250 \n\n Минимальная длина забора состоит \n из ширины столбов (если они учитываются)"
              + " \n и суммы длин пролетов. \n Минимальная длина пролета равна сумме \n ширины 1-го кирпича"
              + " и толщины 2-х швов." );
        if (includedPillarInFence == true){ 
            input_perimeter_fence_meters.value = +fenceWinMeters.toFixed(3);
        }
        else {
            input_perimeter_fence_meters.value = +spanWinMeters.toFixed(3);
        }
        // выходим из функции без изменений ключевых параметров забора
    }
    else {
        //отсекаем столбы, если они есть
        if (includedPillarInFence == true){inputPerimeterM -= PMW*pillarNumbers;}
        // введенное число округляем до 3-х знаков после запятой
        inputPerimeterM = +inputPerimeterM.toFixed(3);
        //высчитываем реальный и округленный вверх до ближайшего целого числа показатель числа кирпичей с учетом швов
        to_brick = (inputPerimeterM - seam_m * spanNumbers)/(array_brick[0][spanBrickType] + seam_m);
        to_brick_ceil = Math.ceil(to_brick);
        //округляем до половины кирпича
        if ((to_brick_ceil - 0.5) < to_brick)
        {inputPerimeterB = to_brick_ceil;}
        else{inputPerimeterB = to_brick_ceil - 0.5;}
        //запускаем проверку введенного числа кирпичей
        calculatePerimeter();
    }    
}

//введены кирпичи
function inputPerimeterBricks() {
    //вычисляем минимальное число для обработки
    if (includedPillarInFence == true){ 
      minInputPerimeterB = PBW*pillarNumbers + spanNumbers;
      minInputPerimeterB = +minInputPerimeterB;
    }
    else {
      minInputPerimeterB = spanNumbers;
    }
    //забираем введенные данные
    inputPerimeterB = parseFloat(input_perimeter_fence_bricks.value.replace(/,/,'.'));
    //проверяем что введено
    if (spanNumbers == 0 && pillarNumbers == 0) {
        alert ("\n Укажите число пролетов или столбов!");
        if (includedPillarInFence == true){ 
            input_perimeter_fence_bricks.value = +fenceWinBricks.toFixed(1);
        }
        else {
            input_perimeter_fence_bricks.value = +spanWinBricks.toFixed(1);
        }
    }
    else if (isNaN(inputPerimeterB) || inputPerimeterB < minInputPerimeterB || inputPerimeterB > 950) {
        // если введено недопустимое значение
        alert ( "\n Введено недопустимое значение! \n введите любое число от " + minInputPerimeterB.toFixed(1)
              + " до 950 \n или уменьшите число пролетов \n\n (Периметр забора не может быть меньше"
              + " \n суммы длин пролетов. В свою очередь \n минимальная длина пролетов равна"
              + " \n длине одного кирпича.)" );
        if (includedPillarInFence == true){ 
            input_perimeter_fence_bricks.value = +fenceWinBricks.toFixed(1);
        }
        else {
            input_perimeter_fence_bricks.value = +spanWinBricks.toFixed(1);
        }
        // выходим из функции без изменений ключевых параметров забора
    }
    else {
        //отсекаем столбы, если они есть
        if (includedPillarInFence === true){inputPerimeterB -= PBW*pillarNumbers;}
        //высчитываем реальный и округленный вверх до ближайшего целого числа показатель числа кирпичей
        to_brick = inputPerimeterB;
        to_brick_ceil = Math.ceil(to_brick);
        //округляем до половины кирпича
        if ((to_brick_ceil - 0.5) < to_brick)
        {inputPerimeterB = to_brick_ceil;}
        else{inputPerimeterB = to_brick_ceil - 0.5;}
        //запускаем проверку введенного числа кирпичей
        
        calculatePerimeter();
    }    
}   

/*
//проверим что за типы и значения
alert ( 'ДАННЫЕ ДЛЯ ФИНАЛЬНОГО РАСЧЕТА : \n'
      + 'pillarNumbers (' + typeof pillarNumbers + ') = ' + pillarNumbers + '\n'
      + 'pillarHinBricks (' + typeof pillarHinBricks + ') = ' + pillarHinBricks + '\n'
      + 'spanWinBricks (' + typeof spanWinBricks + ') = ' + spanWinBricks + '\n'
      + 'spanHinBricks (' + typeof spanHinBricks + ') = ' + spanHinBricks );
*/
/*****************************************************************
*                  ГЕНЕРАТОР ТОВАРОВ И ЗАКАЗОВ                   *
*                                                                *
*  [заказ шт.] [наименование] [вес 1 м.п.] [1шт м.п.] [$за 1 т]  *
*                                                                *
******************************************************************/

// проверка версий и цен
// увеличивать на 1 при любых изменениях
//при не совподении ключей вся память пользователя чистится
var storageKey = 100000;

//массив всего
var allProdArrey = [
    'armatyra_a3',
    'armatyra_a1',
    'tryba_kv',
    'tryba_pr',
    'tryba_vgp',
    'ygol',
    'shveller',
    'tavr',
    'dvutavr',
    'kvadrat',
    'polosa',
    'list',
    'elektrody',
    'profnastil_1500mm',
    'profnastil_1700mm',
    'profnastil_2000mm',
    'screw'
];

// !!! НЕ ИСПОЛЬЗОВАТЬ В НАЗВАНИИ __(двойное нижнее подчеркивание) !!!
// [заказ шт.] [наименование] [вес 1 м.п.] [1шт м.п.] [$за 1 т]
// !!! [заказ шт.] ВСЕГДА = 0 !!!
// если были заказы - они сами загрузятся из памяти ПК пользователя!!!
var armatyra_a3_img = "img/metall/armatyra-a3-ico.jpg";
var armatyra_a3 = [
    [0,'А3 500С &#8960;8мм', 0.405, 5.87, 1679.01, 'Арматура'],
    [0,'А3 500С &#8960;8мм', 0.405, 11.74, 1679.01, 'Арматура'],
    [0,'А3 500С &#8960;10мм', 0.620, 11.74, 1612.90, 'Арматура'],
    [0,'А3 500С &#8960;12мм', 0.900, 11.74, 1500.00, 'Арматура'],
    [0,'А3 500С &#8960;14мм', 1.210, 11.74, 1528.93, 'Арматура'],
    [0,'А3 500С &#8960;16мм', 1.580, 11.74, 1582.28, 'Арматура']
];
 
var armatyra_a1_img = "img/metall/armatyra-a1-ico.jpg";
var armatyra_a1 = [
    [0,'А1 S240 &#8960;6мм', 0.230, 6, 1434.78, 'Арматура'],
    [0,'А1 S240 &#8960;8мм', 0.405, 6, 1604.94, 'Арматура'],
    [0,'А1 S240 &#8960;10мм', 0.620, 6, 1612.90, 'Арматура'],
    [0,'А1 S240 &#8960;12мм', 0.900, 6, 1500.00, 'Арматура']
];
 
var tryba_kv_img = "img/metall/tryba-kv-ico.jpg";
var tryba_kv = [
    [0,'15 x 15 x 1,5 мм', 0.605, 6, 1900.83, 'Труба'],
    [0,'20 x 20 x 1,5 мм', 0.841, 6, 1926.28, 'Труба'],
    [0,'20 x 20 x 2 мм', 1.080, 6, 1685.19, 'Труба'],
    [0,'25 x 25 x 1,5 мм', 1.070, 6, 1915.89, 'Труба'],
    [0,'25 x 25 x 2 мм', 1.390, 6, 1762.59, 'Труба'],
    [0,'30 x 30 x 1,5 мм', 1.310, 6, 1870.23, 'Труба'],
    [0,'40 x 40 x 1,5 мм', 1.780, 6, 1769.66, 'Труба'],
    [0,'40 x 40 x 2 мм', 2.334, 6, 1628.11, 'Труба'],
    [0,'50 x 50 x 2 мм', 2.980, 6, 1610.74, 'Труба'],
    [0,'50 x 50 x 3 мм', 4.310, 6, 1624.13, 'Труба'],
    [0,'60 x 60 x 2 мм', 3.593, 6, 1669.91, 'Труба'],
    [0,'60 x 60 x 3 мм', 5.250, 6, 1561.90, 'Труба'],
    [0,'80 x 80 x 3 мм', 7.130, 12, 1608.70, 'Труба'],
    [0,'80 x 80 x 4 мм', 9.330, 12, 1597.00, 'Труба'],
    [0,'100 x 100 x 4 мм', 11.750, 12, 1617.02, 'Труба']
];
 
var tryba_pr_img = "img/metall/tryba-pr-ico.jpg";
var tryba_pr = [
    [0,'30 x 20 x 1,5 мм', 1.080, 6, 1805.56, 'Труба'],
    [0,'40 x 20 x 1,5 мм', 1.333, 6, 1800.45, 'Труба'],
    [0,'40 x 20 x 2 мм', 1.700, 6, 1647.06, 'Труба'],
    [0,'40 x 25 x 1,5мм', 1.433, 6, 1884.16, 'Труба'],
    [0,'40 x 25 x 2 мм', 1.860, 6, 1612.90, 'Труба'],
    [0,'45 x 25 x 1,5 мм', 1.563, 6, 1714.65, 'Труба'],
    [0,'50 x 25 x 1,5 мм', 1.670, 6, 1886.23, 'Труба'],
    [0,'50 x 25 x 2 мм', 2.170, 6, 1658.99, 'Труба'],
    [0,'60 x 40 x 2 мм', 2.960, 6, 1689.19, 'Труба'],
    [0,'60 x 40 x 3 мм', 4.300, 6, 1604.65, 'Труба']
];
 
var tryba_vgp_img = "img/metall/tryba-vgp-ico.jpg";
var tryba_vgp = [
    [0,'ВГП 20 x 2,8 мм', 1.660, 6, 1716.87, 'Труба'],
    [0,'ВГП 25 x 3,2 мм', 2.390, 6, 1631.80, 'Труба'],
    [0,'ВГП 32 x 3,2 мм', 3.090, 6, 1618.12, 'Труба'],
    [0,'ВГП 50 x 3,5 мм', 4.880, 6, 1618.85, 'Труба'],
    [0,'ВГП 57 x 3,0 мм', 4.000, 6, 1750.00, 'Труба'],
    [0,'ВГП 89 x 3,5 мм', 7.380, 10.5, 1571.82, 'Труба']
];
 
var ygol_img = "img/metall/ygol-ico.jpg";
var ygol = [
    [0,'25 x 25 x 3 мм', 1.150, 6, 1826.09, 'Угол'],
    [0,'25 x 25 x 4 мм', 1.475, 6, 1694.92, 'Угол'],
    [0,'32 x 32 x 4 мм', 1.910, 6, 1675.39, 'Угол'],
    [0,'40 x 40 x 3 мм', 1.850, 6, 1891.89, 'Угол'],
    [0,'40 x 40 x 4 мм', 2.430, 6, 1646.09, 'Угол'],
    [0,'40 x 40 x 5 мм', 2.980, 6, 1778.52, 'Угол'],
    [0,'45 x 45 x 4 мм', 2.730, 6, 1703.30, 'Угол'],
    [0,'45 x 45 x 5 мм', 3.380, 6, 1701.18, 'Угол'],
    [0,'50 x 50 x 4 мм', 3.080, 6, 1688.31, 'Угол'],
    [0,'50 x 50 x 5 мм', 3.800, 6, 1700.00, 'Угол'],
    [0,'63 x 63 x 5 мм', 4.810, 6, 1642.41, 'Угол'],
    [0,'63 x 63 x 6 мм', 5.800, 6, 1632.87, 'Угол'],
    [0,'75 x 75 x 5 мм', 5.720, 6, 1551.72, 'Угол'],
    [0,'100 x 100 x 7 мм', 10.790, 12, 1621.87, 'Угол']
];
 
var shveller_img = "img/metall/shveller-ico.jpg";
var shveller = [
    [0,'Швеллер 8П', 7.100, 12, 1690.14, 'Швеллер'],
    [0,'Швеллер 10П', 8.750, 12, 1680.00, 'Швеллер'],
    [0,'Швеллер 12П', 10.400, 12, 1923.08, 'Швеллер']
];
 
var tavr_img = "img/metall/tavr-ico.jpg";
var tavr = [
    [0,'10 x 75 x 4', 10.200, 12, 2000.00, 'Тавр'],
    [0,'20 x 20 x 3', 10.400, 12, 2000.00, 'Тавр'],
    [0,'25 x 16 x 3', 10.600, 12, 2000.00, 'Тавр']
];
 
var dvutavr_img = "img/metall/dvutavr-ico.jpg";
var dvutavr = [
    [0,'Балка №10', 10.200, 12, 2000.00, 'Двутавр'],
    [0,'Балка №12', 10.400, 12, 2000.00, 'Двутавр'],
    [0,'Балка №12 Б-1', 10.600, 12, 2000.00, 'Двутавр'],
    [0,'Балка №14', 10.800, 12, 2000.00, 'Двутавр']
];
 
var kvadrat_img = "img/metall/kvadrat-ico.jpg";
var kvadrat = [
    [0,'10 x 10 мм', 0.785, 6, 1783.44, 'Квадрат'],
    [0,'12 x 12 мм', 1.130, 6, 1681.42, 'Квадрат']
];
 
var polosa_img = "img/metall/polosa-ico.jpg";
var polosa = [
    [0,'20 x 4 мм', 0.710, 6, 1830.99, 'Полоса'],
    [0,'25 x 4 мм', 0.800, 6, 1875.00, 'Полоса'],
    [0,'40 x 3 мм', 0.940, 6, 1914.89, 'Полоса'],
    [0,'40 x 4 мм', 1.305, 6, 1839.08, 'Полоса']
];
 
/* [заказ шт.] [наименование] [вес 1 шт.] [1 - позволяет не менять формулы] [$за 1 т] */
var list_img = "img/metall/list-ico.jpg";
var list = [
    [0,'0.8 мм (х/к)', 19.670, 1, 1830.20, 'Лист 2500 x 1250 x'],
    [0,'1.0 мм (х/к)', 24.750, 1, 1818.18, 'Лист 2500 x 1250 x'],
    [0,'1.2 мм (х/к)', 29.480, 1, 1865.67, 'Лист 2500 x 1250 x'],
    [0,'1.5 мм (х/к)', 37.630, 1, 1833.64, 'Лист 2500 x 1250 x'],
    [0,'1.5 мм (г/к)', 37.630, 1, 1727.35, 'Лист 2500 x 1250 x'],
    [0,'2.0 мм (г/к)', 50.000, 1, 1700.00, 'Лист 2500 x 1250 x']
];

// число саморезев = числу цветов в массиве
// screw_ral_img
var elektrody_img =[
    ['img/metall/elektrody-mr.jpg', 'МР-3'],
    ['img/metall/elektrody-mr.jpg', 'МР-4'],
    ['img/metall/elektrody-cl.jpg', 'ЦЛ-11']
];
/* [заказ шт.] [марка] [вес 1 уп.] [1] [$за 1 шт]
           расход 12 - 14 шт на лист             */
var elektrody = [
    [0,'МР-3', 2.500, 1, 12.90, 'Электроды'],
    [0,'МР-4', 2.500, 1, 13.20, 'Электроды'],
    [0,'ЦЛ-11', 1.000, 1, 18.40, 'Электроды']
];
 
// число листов в одном размере массива = числу цветов в массиве
// profnastil_ral_img
var profnastil_ral_img =[
    ['img/metall/profnastil-ral-1015.jpg', 'Слоновая кость'],
    ['img/metall/profnastil-ral-3005.jpg', 'Красное вино'],
    ['img/metall/profnastil-ral-5005.jpg', 'Синий'],
    ['img/metall/profnastil-ral-6005.jpg', 'Зеленый мох'],
    ['img/metall/profnastil-ral-8004.jpg', 'Коричневый шоколад']
];
/* [заказ шт.] [нцвет] [вес 1 шт.] [m2] [$за 1 м2]
        длинна - 1,2 м.п.      рабочая - 1,15 м.п.     */
var profnastil_1500mm = [
    [0,'RAL 1015', 6.300, 1.8, 9.62, 'Профнастил 1.5м'],
    [0,'RAL 3005', 6.300, 1.8, 7.89, 'Профнастил 1.5м'],
    [0,'RAL 5005', 6.300, 1.8, 7.89, 'Профнастил 1.5м'],
    [0,'RAL 6005', 6.300, 1.8, 7.89, 'Профнастил 1.5м'],
    [0,'RAL 8004', 6.300, 1.8, 7.89, 'Профнастил 1.5м']
];
var profnastil_1700mm = [
    [0,'RAL 1015', 7.140, 2.04, 9.62, 'Профнастил 1.7м'],
    [0,'RAL 3005', 7.140, 2.04, 7.84, 'Профнастил 1.7м'],
    [0,'RAL 5005', 7.140, 2.04, 7.84, 'Профнастил 1.7м'],
    [0,'RAL 6005', 7.140, 2.04, 7.84, 'Профнастил 1.7м'],
    [0,'RAL 8004', 7.140, 2.04, 7.84, 'Профнастил 1.7м']
];
var profnastil_2000mm = [
    [0,'RAL 1015', 8.400, 2.4, 9.62, 'Профнастил 2.0м'],
    [0,'RAL 3005', 8.400, 2.4, 7.71, 'Профнастил 2.0м'],
    [0,'RAL 5005', 8.400, 2.4, 7.71, 'Профнастил 2.0м'],
    [0,'RAL 6005', 8.400, 2.4, 7.71, 'Профнастил 2.0м'],
    [0,'RAL 8004', 8.400, 2.4, 7.71, 'Профнастил 2.0м']
];

// число саморезев = числу цветов в массиве
// screw_ral_img
var screw_ral_img =[
    ['img/metall/screw-ral-1015.jpg', 'Слоновая кость'],
    ['img/metall/screw-ral-3005.jpg', 'Красное вино'],
    ['img/metall/screw-ral-5005.jpg', 'Синий'],
    ['img/metall/screw-ral-6005.jpg', 'Зеленый мох'],
    ['img/metall/screw-ral-8004.jpg', 'Коричневый шоколад']
];
/* [заказ шт.] [нцвет] [вес 1 шт.] [1] [$за 1 шт]
           расход 12 - 14 шт на лист             */
var screw = [
    [0,'RAL 1015', 0.006, 1, 0.09, 'Саморез'],
    [0,'RAL 3005', 0.006, 1, 0.09, 'Саморез'],
    [0,'RAL 5005', 0.006, 1, 0.09, 'Саморез'],
    [0,'RAL 6005', 0.006, 1, 0.09, 'Саморез'],
    [0,'RAL 8004', 0.006, 1, 0.09, 'Саморез']
];

var contentTab = document.getElementById('tab-contant-div');
var content;
var bgColor = ['grey-bg','white-bg'];
var bgColorInner;
var imgInner;
var inputColorStyle;
var inputUnitInner;

var topStringProductBlock;
var bottomStringProductBlock;

var topStringPriceBlock;
var mainStringPriceBlock;
var bottomStringPriceBlock;

var TPInner;
var TUInner;
var TWInner;
var inputNumberInner;
var inputUnitInner;
var bottomStringLeftOrderBlock;
var bottomStringRightOrderBlock;

//переменные в цикле
var priceForOneM;
var priceForOneM2;
var priceForOneProduct;
var priceForOneTon;
var heightPL;

//
var orderTotalWeight = 0;
var orderTotalSum = 0;
var idOrderWeight = document.getElementById("id-obdh-w");
var idOrderSum = document.getElementById("id-obdh-s");

var istr = 0;
var ii;
var qq="'";

var orderPage = false;
var orderPrpdsCounter = 0;
 
// вид локальной переменной:
// ИМЯ_ГРУППЫ = НАЗВАНИЕ__ШТУКИ
 
//генератор строки
function strGen(name){
    var toStr = '';
    for (var s=0; s<window[name].length; s++) {
        toStr += window[name][s][0]+'__';
    }
    toStr = toStr.substring(0, toStr.length - 2);
    return(toStr);
}
 
//генератор массива
function arrGen(strTo) {
    var toArr = strTo.split('__');
    return(toArr);
}

// отрисовка товаров при загрузке страницы
function constructTab (prod) {
    parsingLocalStorage (prod);
    parsingProdArr (prod);
} 
 
//ПАРСИНГ
function parsingLocalStorage (prod) {
    if("storageKey" in localStorage) {
        if (localStorage.storageKey == storageKey) {
            if("orderTotalWeight" in localStorage){orderTotalWeight = +localStorage.orderTotalWeight;}
            if("orderTotalSum" in localStorage){orderTotalSum = +localStorage.orderTotalSum;}
            idOrderWeight.innerHTML = (orderTotalWeight.toFixed() + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
            idOrderSum.innerHTML = (orderTotalSum.toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
 
            //парсим товары с предыдущей сессии
            if( prod in localStorage){
                var arrarr = arrGen(localStorage.getItem(prod));
                for (var n=0; n<arrarr.length; n++) {
                    window[prod][n][0] = +arrarr[n];
                }
            }
 
        } else {
            localStorage.clear();
            localStorage.storageKey = storageKey;
        }
    } else {
        localStorage.storageKey = storageKey;
    }
}

//отрисовка таблицы товаров 
function parsingProdArr (prod) {
    for (var i=0; i<window[prod].length; i++) {
        
        if (window[prod][i][0] == 0 && orderPage == true) {} else {
            
            orderPrpdsCounter++;
            
            if (istr % 2 == 0) {bgColorInner = bgColor[0]; istr++;}else{bgColorInner = bgColor[1];istr++;}
            
            if (prod.substring(0, 10) == 'profnastil') {
                imgInner = profnastil_ral_img[i][0];
            } else if (prod == 'screw') {
                imgInner = screw_ral_img[i][0];
            } else if (prod == 'elektrody') {
                imgInner = elektrody_img[i][0];
            } else {
                imgInner = window[prod+"_img"];
            }
            
            ii = i+10;
            
            if (prod == 'list') {
                inputUnitInner = ' шт.';
    
                priceForOneM2 = (window[prod][i][4]/1000*window[prod][i][2]*window[prod][i][3]/(2.5*1.25)).toFixed(2);
                priceForOneProduct = (window[prod][i][4]/1000*window[prod][i][2]*window[prod][i][3]).toFixed(2);
                priceForOneTon = (window[prod][i][4] + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                
                topStringProductBlock = '<div class="smal-tt top-tt">Размер: 2500 x 1250 мм</div>';
                bottomStringProductBlock = '<div class="smal-tt bottom-tt">1 лист = '+window[prod][i][2]+' кг</div>';
    
                topStringPriceBlock = '<div class="smal-tt top-tt">'+priceForOneM2+' BYN за м2</div>';
                mainStringPriceBlock = '<div class="big-tt">'+priceForOneProduct+' BYN за лист</div>';
                bottomStringPriceBlock = '<div class="smal-tt bottom-tt">'+priceForOneTon+' BYN за 1 тонну</div>';
    
                TPInner = ((window[prod][i][0]*window[prod][i][4]/1000*window[prod][i][2]*window[prod][i][3]).toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                TUInner = ((window[prod][i][0]*window[prod][i][2]*window[prod][i][3]).toFixed(0) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                TWInner = '';
                inputNumberInner = ((window[prod][i][0]).toFixed() + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                bottomStringLeftOrderBlock = 'Общий вес  &asymp; <span id="'+prod+'_'+ii+'_tu">'+TUInner+'</span> кг';
                bottomStringRightOrderBlock = '<span id="'+prod+'_'+ii+'_tw">'+TWInner+'</span>';
            } else if (prod.substring(0, 10) == 'profnastil') {
                inputUnitInner = ' шт.';
    
                heightPL = (window[prod][i][3]/1.2*1000).toFixed();
                priceForOneProduct = (window[prod][i][4]*window[prod][i][3]).toFixed(2);
                priceForOneM2 = (window[prod][i][4]).toFixed(2);
                priceForOneM = (window[prod][i][4]*window[prod][i][3]/1.2).toFixed(2);
    
                topStringProductBlock = '<div class="smal-tt top-tt">Размер: '+heightPL+' x 1200 x 0.37 мм</div>';
                bottomStringProductBlock = '<div class="smal-tt bottom-tt">'+profnastil_ral_img[i][1]+'</div>';
    
                topStringPriceBlock = '<div class="smal-tt top-tt">'+window[prod][i][4]+' BYN за м2</div>';
                mainStringPriceBlock = '<div class="big-tt">'+priceForOneProduct+' BYN за лист</div>';
                bottomStringPriceBlock = '<div class="smal-tt bottom-tt">'+priceForOneM+' BYN за 1 м.п.</div>';
    
                TPInner = ((window[prod][i][0]*window[prod][i][4]*window[prod][i][3]).toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                TUInner = ((window[prod][i][0]*1.2).toFixed(1) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                TWInner = ((window[prod][i][0]*1.15).toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                inputNumberInner = ((window[prod][i][0]).toFixed() + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                bottomStringLeftOrderBlock = 'Всего: <span id="'+prod+'_'+ii+'_tu">'+TUInner+'</span> м.п. ';
                bottomStringRightOrderBlock = '(рабочих <span id="'+prod+'_'+ii+'_tw">'+TWInner+'</span> м.п.)';
            } else if (prod == 'screw') {
                inputUnitInner = ' шт.';
    
                priceForOneProduct = (window[prod][i][4]*window[prod][i][3]).toFixed(2);
    
                topStringProductBlock = '<div class="smal-tt top-tt">Саморез 9 x 5.5 мм</div>';
                bottomStringProductBlock = '<div class="smal-tt bottom-tt">'+screw_ral_img[i][1]+'</div>';
    
                topStringPriceBlock = '<div class="smal-tt top-tt"></div>';
                mainStringPriceBlock = '<div class="big-tt">'+priceForOneProduct+' BYN за шт.</div>';
                bottomStringPriceBlock = '<div class="smal-tt bottom-tt"></div>';
    
                TPInner = ((window[prod][i][0]*window[prod][i][4]*window[prod][i][3]).toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                TUInner = 'Расход: 12-14 шт на 1 лист';
                TWInner = '';
                inputNumberInner = ((window[prod][i][0]).toFixed() + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                bottomStringLeftOrderBlock = '<span id="'+prod+'_'+ii+'_tu">'+TUInner+'</span>';
                bottomStringRightOrderBlock = '<span id="'+prod+'_'+ii+'_tw">'+TWInner+'</span>';
            } else if (prod == 'elektrody') {
                inputUnitInner = ' уп.';
    
                priceForOneProduct = (window[prod][i][4]*window[prod][i][3]).toFixed(2);
    
                topStringProductBlock = '<div class="smal-tt top-tt">Электроды</div>';
                bottomStringProductBlock = '<div class="smal-tt bottom-tt"> Вес упаковки : '+(window[prod][i][2]).toFixed(1)+'</div>';
    
                topStringPriceBlock = '<div class="smal-tt top-tt"></div>';
                mainStringPriceBlock = '<div class="big-tt">'+priceForOneProduct+' BYN за уп.</div>';
                bottomStringPriceBlock = '<div class="smal-tt bottom-tt"></div>';
    
                TPInner = ((window[prod][i][0]*window[prod][i][4]*window[prod][i][3]).toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                TUInner = '';
                TWInner = ((window[prod][i][0]*window[prod][i][2]*window[prod][i][3]).toFixed(0) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                inputNumberInner = ((window[prod][i][0]).toFixed() + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                bottomStringLeftOrderBlock = '<span id="'+prod+'_'+ii+'_tu">'+TUInner+'</span>';
                bottomStringRightOrderBlock = 'Ощий вес &asymp; <span id="'+prod+'_'+ii+'_tw">'+TWInner+'</span> кг.';
            } else {
                inputUnitInner = ' м.п.';
    
                priceForOneProduct = (window[prod][i][4]/1000*window[prod][i][2]*window[prod][i][3]).toFixed(2);
                priceForOneM = (window[prod][i][4]/1000*window[prod][i][2]).toFixed(2);
                priceForOneTon = (window[prod][i][4] + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    
                topStringProductBlock = '<div class="smal-tt top-tt">1 изделие: '+window[prod][i][3]+' м.п.</div>';
                bottomStringProductBlock = '<div class="smal-tt bottom-tt">1 м.п. = '+window[prod][i][2]+' кг</div>';
    
                topStringPriceBlock = '<div class="smal-tt top-tt">'+priceForOneProduct+' BYN за 1 изделие</div>';
                mainStringPriceBlock = '<div class="big-tt">'+priceForOneM+' BYN за м.п.</div>';
                bottomStringPriceBlock = '<div class="smal-tt bottom-tt">'+priceForOneTon+' BYN за 1 тонну</div>';
    
                TPInner = ((window[prod][i][0]*window[prod][i][4]/1000*window[prod][i][2]*window[prod][i][3]).toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                TUInner = ((window[prod][i][0]).toFixed(0) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                TWInner = ((window[prod][i][0]*window[prod][i][2]*window[prod][i][3]).toFixed(0) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                inputNumberInner = ((window[prod][i][0]*window[prod][i][3]).toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
                bottomStringLeftOrderBlock = 'Число изделий: <span id="'+prod+'_'+ii+'_tu">'+TUInner+'</span> шт. ';
                bottomStringRightOrderBlock = '( &asymp; <span id="'+prod+'_'+ii+'_tw">'+TWInner+'</span> кг)';
            }
            mainArrey = window[prod];
    
            if (window[prod][i][0] > 0) {inputColorStyle = 'style="color:#ff8400;"';} else {inputColorStyle = 'style="color:#9e9e9e;"';}
    
            content ='<div class="tab-line '+bgColorInner+' tab-shedow">'
                        +'<div class="tab-block-name">'
                            +'<img src='+imgInner+'>'
                            +topStringProductBlock
                            +'<div class="big-tt">'+window[prod][i][1]+'</div>'
                            +bottomStringProductBlock
                        +'</div>'
                        +'<div class="tab-block-price">'
                            +topStringPriceBlock
                            +mainStringPriceBlock
                            +bottomStringPriceBlock
                        +'</div>'
                        +'<div class="tab-block-order">'
                            +'<div class="smal-tt top-tt">Общая сумма: <span id="'+prod+'_'+ii+'_tp">'+TPInner+'</span> BYN</div>'
                            +'<button class="minus" onclick="toCangeOrder('+qq+prod+'_'+ii+'_m'+qq+');"><span>-</span></button>'
                            +'<input id="'+prod+'_'+ii+'_tm" type="text" size="21" value="'+inputNumberInner+inputUnitInner+'" maxlength="15" '
                                +'onfocus="toCangeOrder('+qq+prod+'_'+ii+'_f'+qq+');" onblur="toCangeOrder('+qq+prod+'_'+ii+'_b'+qq+');"'
                                +'onchange="toCangeOrder('+qq+prod+'_'+ii+'_i'+qq+');" '+ inputColorStyle +'>'
                            +'<button class="plus" onclick="toCangeOrder('+qq+prod+'_'+ii+'_p'+qq+');"><span>+</span></button>'
                            +'<div class="smal-tt bottom-tt">'+bottomStringLeftOrderBlock+bottomStringRightOrderBlock+'</div>'
                        +'</div>'
                    +'</div>';
            contentTab.insertAdjacentHTML('beforeend', content);
            /*
            insertAdjacentHTML() вставляет полученные узлы (nodes) в DOM дерево в указанную позицию.
            Данная функция не переписывает имеющиеся элементы, что предотвращает дополнительную сериализацию
            и поэтому работает быстрее, чем манипуляции с innerHTML.
            */
        }
    }
}
 
// обновление лэйбы заказа при загрузке главной и контентных страниц
function chekOrder() {
    //парсим предыдущие сессии
    if("orderTotalWeight" in localStorage){orderTotalWeight = +localStorage.orderTotalWeight;}
    if("orderTotalSum" in localStorage){orderTotalSum = +localStorage.orderTotalSum;}
    idOrderWeight.innerHTML = (orderTotalWeight.toFixed() + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    idOrderSum.innerHTML = (orderTotalSum.toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}
 
// отрисовка конкретного товара
function updateTab (prod, posii) {
    //console.log(inputUnitInner); 
    var i = +posii - 10;
    var tu_id = document.getElementById(prod+'_'+posii+'_tu');
    var tp_id = document.getElementById(prod+'_'+posii+'_tp');
    var tw_id = document.getElementById(prod+'_'+posii+'_tw');
    var tm_id = document.getElementById(prod+'_'+posii+'_tm');
 
    if (prod == 'list') {
        tp_id.innerHTML = ((window[prod][i][0]*window[prod][i][4]/1000*window[prod][i][2]*window[prod][i][3]).toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        tu_id.innerHTML = ((window[prod][i][0]*window[prod][i][2]*window[prod][i][3]).toFixed(0) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        tm_id.value = ((window[prod][i][0]).toFixed() + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' шт.';
    } else if (prod.substring(0, 10) == 'profnastil') {
        tp_id.innerHTML = ((window[prod][i][0]*window[prod][i][4]*window[prod][i][3]).toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        tu_id.innerHTML = ((window[prod][i][0]).toFixed(0) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        tw_id.innerHTML = ((window[prod][i][0]*1.15).toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        tm_id.value = ((window[prod][i][0]).toFixed() + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' шт.';
    } else if (prod == 'screw') {
        tp_id.innerHTML = ((window[prod][i][0]*window[prod][i][4]*window[prod][i][3]).toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        tm_id.value = ((window[prod][i][0]).toFixed() + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' шт.';
    } else if (prod == 'elektrody') {
        tp_id.innerHTML = ((window[prod][i][0]*window[prod][i][4]*window[prod][i][3]).toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        tw_id.innerHTML = ((window[prod][i][0]*window[prod][i][2]*window[prod][i][3]).toFixed(0) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        tm_id.value = ((window[prod][i][0]).toFixed() + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' уп.';
    } else {
        tp_id.innerHTML = ((window[prod][i][0]*window[prod][i][4]/1000*window[prod][i][2]*window[prod][i][3]).toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        tu_id.innerHTML = ((window[prod][i][0]).toFixed(0) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        tw_id.innerHTML = ((window[prod][i][0]*window[prod][i][2]*window[prod][i][3]).toFixed(0) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        tm_id.value = ((window[prod][i][0]*window[prod][i][3]).toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + ' м.п.';
    }
}
 
// изменение заказа
var focusValue;

function toCangeOrder(HTMLUnit){
    var HTMLUnitName = HTMLUnit.substring(0, HTMLUnit.length - 5);
    
    var HTMLUnitPositionIi = HTMLUnit.substring(HTMLUnit.length - 4, HTMLUnit.length - 2);
    var HTMLUnitPosition = +HTMLUnitPositionIi - 10;
    var HTMLUnitKey = HTMLUnit.substring(HTMLUnit.length - 1);
    var inputId = document.getElementById(HTMLUnitName+'_'+HTMLUnitPositionIi+'_tm');
    
    switch (HTMLUnitKey) {
        case "m" :  if (window[HTMLUnitName][HTMLUnitPosition][0] == 0) {
                        //alert("Количество изделий не может быть отрицательным");
                    } else {
                        window[HTMLUnitName][HTMLUnitPosition][0] -=1;
                        updateTab (HTMLUnitName, HTMLUnitPositionIi);
 
                        //обновим данные общего заказа
                        if (HTMLUnitName.substring(0, 10) == 'profnastil' || HTMLUnitName == 'screw' || HTMLUnitName == 'elektrody') {
                            orderTotalWeight -= window[HTMLUnitName][HTMLUnitPosition][2];
                            orderTotalSum -= window[HTMLUnitName][HTMLUnitPosition][4] * window[HTMLUnitName][HTMLUnitPosition][3];
                        } else {
                            orderTotalWeight -= window[HTMLUnitName][HTMLUnitPosition][2] * window[HTMLUnitName][HTMLUnitPosition][3];
                            orderTotalSum -= window[HTMLUnitName][HTMLUnitPosition][4] / 1000 * window[HTMLUnitName][HTMLUnitPosition][2] * window[HTMLUnitName][HTMLUnitPosition][3];
                        }
 
                        //записать в local
                        localStorage.orderTotalWeight =  orderTotalWeight;
                        localStorage.orderTotalSum =  orderTotalSum;
                    }
            break;
 
        case "p" :  if (window[HTMLUnitName][HTMLUnitPosition][0] == 10000) {
                        alert("Максимальное число изделий: 10 000 шт.");
                    } else {
                        window[HTMLUnitName][HTMLUnitPosition][0] +=1;
                        updateTab (HTMLUnitName, HTMLUnitPositionIi);
 
                        //обновим данные общего заказа
                        if (HTMLUnitName.substring(0, 10) == 'profnastil' || HTMLUnitName == 'screw' || HTMLUnitName == 'elektrody') {
                            orderTotalWeight += window[HTMLUnitName][HTMLUnitPosition][2];
                            orderTotalSum += window[HTMLUnitName][HTMLUnitPosition][4] * window[HTMLUnitName][HTMLUnitPosition][3];
                        } else {
                            orderTotalWeight += window[HTMLUnitName][HTMLUnitPosition][2] * window[HTMLUnitName][HTMLUnitPosition][3];
                            orderTotalSum += window[HTMLUnitName][HTMLUnitPosition][4] / 1000 * window[HTMLUnitName][HTMLUnitPosition][2] * window[HTMLUnitName][HTMLUnitPosition][3];
                        }
 
                        //записать в local
                        localStorage.orderTotalWeight =  orderTotalWeight;
                        localStorage.orderTotalSum =  orderTotalSum;
                    }
            break;
 
        case "i" :  var inputM = parseFloat(inputId.value.replace(/,/,'.'));
        
                    var maximum;
                    if (HTMLUnitName == 'list' || HTMLUnitName.substring(0, 10) == 'profnastil' || HTMLUnitName == 'screw' || HTMLUnitName == 'elektrody') {
                        maximum = 10000;
                    } else {
                        maximum = window[HTMLUnitName][HTMLUnitPosition][3]*10000;
                    }
                    
                    //проверяем что введено
                    if (isNaN(inputM) || inputM < 0 || inputM > maximum || !isFinite(inputM)) {
                        // если введено недопустимое значение
                        inputId.value = focusValue;
                    } else {
 
                        if (HTMLUnitName == 'list' || HTMLUnitName.substring(0, 10) == 'profnastil' || HTMLUnitName == 'screw' || HTMLUnitName == 'elektrody') {
                            inputM = Math.ceil(+inputM); // шт = целое число
                        } else {
                            inputM = Math.ceil(+inputM/window[HTMLUnitName][HTMLUnitPosition][3]); // шт = целое число
                        }
 
                        var deltaInput = inputM - window[HTMLUnitName][HTMLUnitPosition][0];
 
                        window[HTMLUnitName][HTMLUnitPosition][0] = inputM;
                        updateTab (HTMLUnitName, HTMLUnitPositionIi);
 
                        //обновим данные общего заказа
                        if (HTMLUnitName.substring(0, 10) == 'profnastil' || HTMLUnitName == 'screw' || HTMLUnitName == 'elektrody') {
                            orderTotalWeight += deltaInput * window[HTMLUnitName][HTMLUnitPosition][2];
                            orderTotalSum += deltaInput * (window[HTMLUnitName][HTMLUnitPosition][4] * window[HTMLUnitName][HTMLUnitPosition][3]);
                        } else {
                            orderTotalWeight += deltaInput * (window[HTMLUnitName][HTMLUnitPosition][2] * window[HTMLUnitName][HTMLUnitPosition][3]);
                            orderTotalSum += deltaInput * (window[HTMLUnitName][HTMLUnitPosition][4] / 1000 * window[HTMLUnitName][HTMLUnitPosition][2] * window[HTMLUnitName][HTMLUnitPosition][3]);
                        }
                     
                        //записать в local
                        localStorage.orderTotalWeight =  orderTotalWeight;
                        localStorage.orderTotalSum =  orderTotalSum;
                    }
                    focusValue = inputId.value;
            break;
        
        case "f" :  focusValue = inputId.value;
                    inputId.value = '';
            break;
            
        case "b" :  inputId.value = focusValue;
            break;
    }
    if (window[HTMLUnitName][HTMLUnitPosition][0] > 0) {inputId.style.color="#ff8400";} else {inputId.style.color="#9e9e9e";} 

    //обнавление лейбы заказа
    idOrderWeight.innerHTML = (orderTotalWeight.toFixed() + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    idOrderSum.innerHTML = (orderTotalSum.toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
 
    localStorage.setItem(HTMLUnitName,strGen(HTMLUnitName));
 }
 
//отрисовка блока оформления заказа
function constructOrder() {
    orderPage = true;
    
    for (var j=0; j<allProdArrey.length; j++) {
        constructTab (allProdArrey[j]);
    }
    
    if (localStorage.orderTotalSum === undefined || localStorage.orderTotalSum == 0) {
            document.getElementById("tab-header-id").style.display = "none";
            contentTab.innerHTML = '<div class="noItemsInOrder"> Оставьте Ваши контакты, и наши специалисты свяжутся с Вами!</div>';
    }
}

// ОБРАБОТКА НАЖАТИЯ ОФОРМИТЬ ЗАКАЗ
function clickCheckOrder() {
    var idInputTel = document.getElementById("id-order-input-tel");
    
    var inputTel = idInputTel.value.replace(/[^\d]/g, '');
    
    var inputTelNumbers = inputTel.length;
    
    switch (inputTelNumbers) {
        
        // 6 цифр - городской телефон
        case 6 : inputTel = inputTel[0]+inputTel[1]+'-'+inputTel[2]+inputTel[3]+'-'+inputTel[4]+inputTel[5];
                orderToString (inputTel);
                break;
                
        case 7 : alert('Укажите код оператора связи: (25/29/33/44)');
                break;
                
        case 9 : if (inputTel.substring(0, 2) == "25" || inputTel.substring(0, 2) == "29"  || inputTel.substring(0, 2) == "33"  || inputTel.substring(0, 2) == "44") {
                    inputTel = '+375 ('+inputTel[0]+inputTel[1]+') '+inputTel[2]+inputTel[3]+inputTel[4]+'-'+inputTel[5]+inputTel[6]+'-'+inputTel[7]+inputTel[8];
                } else if (inputTel.substring(0, 2) == "17") {
                    inputTel = '8 (017) '+inputTel[2]+inputTel[3]+inputTel[4]+'-'+inputTel[5]+inputTel[6]+'-'+inputTel[7]+inputTel[8];
                } else {
                    inputTel = '8 (0'+inputTel[0]+inputTel[1]+inputTel[2]+') '+inputTel[3]+inputTel[4]+'-'+inputTel[5]+inputTel[6]+'-'+inputTel[7]+inputTel[8];
                }
                orderToString (inputTel);
                break;
        case 10 : if (inputTel[0] != '0') {alert('Вы ввели неправельный телефон\nВведите телефон в формате [код оператора или города]-[телефон]');} else {
                    if (inputTel.substring(1, 3) == "25" || inputTel.substring(1, 3) == "29"  || inputTel.substring(1, 3) == "33"  || inputTel.substring(1, 3) == "44") {
                        inputTel = '+375 ('+inputTel[1]+inputTel[2]+') '+inputTel[3]+inputTel[4]+inputTel[5]+'-'+inputTel[6]+inputTel[7]+'-'+inputTel[8]+inputTel[9];
                    } else if (inputTel.substring(1, 3) == "17") {
                        inputTel = '8 (017) '+inputTel[3]+inputTel[4]+inputTel[5]+'-'+inputTel[6]+inputTel[7]+'-'+inputTel[8]+inputTel[9];
                    } else {
                        inputTel = '8 (0'+inputTel[1]+inputTel[2]+inputTel[3]+') '+inputTel[4]+inputTel[5]+'-'+inputTel[6]+inputTel[7]+'-'+inputTel[8]+inputTel[9];
                    }
                    orderToString (inputTel);
                }
                break;
        case 11 : if (inputTel[0] != '8' && inputTel[1] != '0') {alert('Вы ввели неправельный телефон\nВведите телефон в формате [код оператора или города]-[телефон]');} else {
                    if (inputTel.substring(2, 4) == "25" || inputTel.substring(2, 4) == "29"  || inputTel.substring(2, 4) == "33"  || inputTel.substring(2, 4) == "44") {
                        inputTel = '+375 ('+inputTel[2]+inputTel[3]+') '+inputTel[4]+inputTel[5]+inputTel[6]+'-'+inputTel[7]+inputTel[8]+'-'+inputTel[9]+inputTel[10];
                    } else if (inputTel.substring(2, 4) == "17") {
                        inputTel = '8 (017) '+inputTel[4]+inputTel[5]+inputTel[6]+'-'+inputTel[7]+inputTel[8]+'-'+inputTel[9]+inputTel[10];
                    } else {
                        inputTel = '8 (0'+inputTel[2]+inputTel[3]+inputTel[4]+') '+inputTel[5]+inputTel[6]+'-'+inputTel[7]+inputTel[8]+'-'+inputTel[9]+inputTel[10];
                    }
                    orderToString (inputTel);
                }
                break;
        case 12 : if (inputTel.substring(0, 3) != '375') {alert('Вы ввели неправельный телефон\nВведите телефон в формате [код оператора или города]-[телефон]');} else {
                    if (inputTel.substring(3, 5) == "25" || inputTel.substring(3, 5) == "29"  || inputTel.substring(3, 5) == "33"  || inputTel.substring(3, 5) == "44") {
                        inputTel = '+375 ('+inputTel[3]+inputTel[4]+') '+inputTel[5]+inputTel[6]+inputTel[7]+'-'+inputTel[8]+inputTel[9]+'-'+inputTel[10]+inputTel[11];
                    } else if (inputTel.substring(3, 5) == "17") {
                        inputTel = '8 (017) '+inputTel[5]+inputTel[6]+inputTel[7]+'-'+inputTel[8]+inputTel[9]+'-'+inputTel[10]+inputTel[11];
                    } else {
                        inputTel = '8 (0'+inputTel[3]+inputTel[4]+inputTel[5]+') '+inputTel[6]+inputTel[7]+'-'+inputTel[8]+inputTel[9]+'-'+inputTel[10]+inputTel[11];
                    }
                    orderToString (inputTel);
                }
                break;
        default : alert('Вы ввели неправельный телефон\nВведите телефон в формате [код оператора или города]-[телефон]');
    }
}

//собираем заказ в строку
//перебор групп
function orderToString (tel) {
    var order = '';
    for (var gg=0; gg<allProdArrey.length; gg++) {
        order += orderParseString (allProdArrey[gg]);
        
    }
    order += '<hr>Обшая сумма заказа = '+(orderTotalSum.toFixed(2) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+' BYN<br>'
           + '(Общий вес заказа = '+(orderTotalWeight.toFixed(3) + '').replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')+' кг)';
          
    sendMail(tel, order);
}
//перебор строк
function orderParseString (gets) {
    var stringOrd = '';
    
    for (var nn=0; nn<window[gets].length; nn++) {
        
        if (window[gets][nn][0] == 0) {} else {
            stringOrd += window[gets][nn][5]+' '+window[gets][nn][1]+' (цена:'+window[gets][nn][4]+' BYN ) = '+window[gets][nn][0]+ ' шт.<br>';
        }
    }    
    return (stringOrd);
}
    
// отправка на сервер
function sendMail(tel, order){
    
    var getFromServer;
    var request = new XMLHttpRequest();
    
    var vjs1 = tel;
    var vjs2 = order;

    // получение ответа от сервера
    request.addEventListener('load', function() {
        // В этой части кода можно обрабатывать ответ от сервера
        getFromServer = request.response;
        getFromServer = JSON.parse(getFromServer);
        
        if (getFromServer.var === true) {
            document.getElementById("id-order-send").style.display = "block";
            //setTimeout(orderSendPopup, 7000);
        } else {
            alert('Что-то пошло не так\n\nПопробуйте повторить отправку заказа поздже\n\nПриносим извенения за временные неудобства');
        }
    });
    
    //
    request.open('POST', 'php/mail.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send('vjs1=' + encodeURIComponent(vjs1) + '&vjs2=' + encodeURIComponent(vjs2));
}
function orderSendPopup() {document.getElementById("id-order-send").style.display = "none";}

//чистим память
function cleanStorage() {localStorage.clear(); localStorage.storageKey = storageKey; location.reload();}

//переключение меню
function chekTopMenu (menu) {
    var menu = 'tm-id-'+menu;
    document.getElementById(menu).classList.add("top-menu-button-on");
    //document.getElementById("tm-id-catalog").classList.remove("top-menu-button-on");
}
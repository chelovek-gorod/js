/******************************
 * 
 *  ТЕСТ "Я и алкоголь"
 *  Разработал: Мирге М.А. ЗИТ-11
 * 
 */

    
var login = false;
    
var title, subtitle, content, inputs;

var myCounter;
var timer = 0,
    questionNumber = 19,
    answeredQuestions = 0,
    allQuestions = 20,
    results = 0;

var test = [
    /* [вопрос] [был ли ответ] */
    ["После ссоры в семье, после выговора начальника ищете ли Вы успокоение в спиртных напитках ?", false],
    ["Замечаете ли Вы, что стали в последнее время пить больше ?<br><br>", false],
    ["Случалось ли Вам, проснувшись утром после выпивки, не помнить, что было вчера ?", false],
    ["Когда пьете в компании, не стараетесь ли Вы незаметно выпить побольше?", false],
    ["Случались ли в вашей жизни ситуации, когда без алкоголя Вы чувствовали себя неуверенно ?", false],
    
    ["Стремитесь ли Вы опорожнить первую рюмку быстрее, чем делали это раньше ?", false],
    ["Приходите ли Вы в негодование, когда близкие осуждают ваши выпивки?", false],
    ["Замечаете ли Вы у себя провалы памяти ?<br><br>", false],
    ["Всегда ли у Вас находятся причины, оправдывающие выпивку ?<br><br>", false],
    ["Часто ли Вы жалеете о том, что сделали или сказали в пьяном виде ?<br><br>", false],
    
    ["Возникает ли у Вас желание контролировать количество потребляемых спиртных напитков ?", false],
    ["Часто ли Вы нарушаете данное себе обещание - пить меньше или вообще бросить пить ?", false],
    ["Пытались ли Вы бросить пить ?<br><br>", false],
    ["Стремитесь ли Вы к тому, чтобы ваша семья и друзья не видели Вас пьяным ?", false],
    ["Замечали ли Вы, что из-за активного потребления спиртного у Вас появились финансовые затруднения и проблемы на работе ?", false],
    
    ["Увеличилось ли число людей, которые, как Вам кажется, несправедливо к Вам относятся ?", false],
    ["Дрожат ли у Вас руки даже после небольшой выпивки ?<br><br>", false],
    ["Бывает ли, что Ваш запой длится несколько дней ?<br><br>", false],
    ["Чувствуете ли Вы иногда депрессию и нежелание жить ?<br><br>", false],
    ["Бывают ли у Вас после пьянки слуховые и зрительные галлюцинации ?", false]
];

function pageReady() {

    title = document.getElementById("windowTitle"),
    subtitle = document.getElementById("windowSubtitle"),
    content = document.getElementById("windowContent");
    
    title.innerText = 'Начнем?';
    subtitle.innerHTML = 'АлкоТест';
    content.innerHTML = '<br><br>'
        + '<div class="registration">Здравствуйте!</div>'
        + '<br><br>'
        + '<div class="registration">В тесте содержится 20 вопросов, на которые требуется дать ответ "ДА" либо "НЕТ".<br></div>'
        + '<div class="registration">Вопросы, вызывающие затруднения - можно пропустить, и вернуться к ним позже.</div>'
        + '<div class="registration">Прирвать прохождение теста можно в любой момент.</div>'
        + '<br><br><br>'
        + '<div class="registration"><button id="startTest" onclick="clickStartTestButton()">НАЧАТЬ ПРОХОЖДЕНИЕ</button></div>'
        + '<br>';
}

// ЗАПУСК ТЕСТА
function clickStartTestButton() {
    
    myCounter = setInterval(timerAdd, 1000);
    subtitle.innerHTML="Тесть длиться " +timer+ " секунд";
    goNextQuestion();
}

// обработка таймера
function timerAdd() {
    timer++;
    subtitle.innerHTML="Тесть длиться " +timer+ " секунд";
}

// переход к следующему вопросов
function goNextQuestion() {
    
    if (answeredQuestions < allQuestions) {
        if (questionNumber < allQuestions -1) {
            questionNumber += 1;
        } else {
            questionNumber = 0;
        }
        while (test[questionNumber][1] === true) {
            if (questionNumber < allQuestions -1) {
                questionNumber += 1;
            } else {
                questionNumber = 0;
            }
        }
        innerQuestion();
        
    } else {
        innerResult();
    }
}

// новый вопрос
function innerQuestion() {
    
    var qn = questionNumber+1;
    var lq = allQuestions-answeredQuestions;
    var addText = "";
    if (answeredQuestions < allQuestions - 1){
        addText = '<div class="registration"><button id="goonTest" onclick="goNextQuestion()">Пропустить вопрос</button></div>';
    }
    
    title.innerText = "Вопрос № " + qn;
    content.innerHTML = '<br>'
        + '<div class="registration questions-left">Вам осталось ответить на ' + lq + ' вопросов из ' +allQuestions+ '.</div>'
        + '<br><br>'
        + '<div class="registration">' +test[questionNumber][0]+ '</div>'
        + '<br><br>'
        + '<div class="registration"><button id="button" onclick="clickAnswer(1)">ДА</button></div>'
        + '<div class="registration"><button id="button" onclick="clickAnswer(0)">НЕТ</button></div>'
        + '<br><br>'
        + '<div class="registration"><button id="restTest" onclick="goEndTest()">Прервать прохождение</button></div>'
        +addText+ '<br>';
}

// выбран вариант ответа
function clickAnswer(points) {
    answeredQuestions += 1;
    results += points;
    test[questionNumber][1] = true;
    goNextQuestion();
}

// прервать тест
function goEndTest() {
    
    clearInterval(myCounter);
    
    if (questionNumber === 0) {
            questionNumber = allQuestions -1;
        } else {
            questionNumber -= 1;
        }
    
    clearTimeout(myCounter); // остановка таймера
    title.innerText = "Вы прервали тест";
    subtitle.innerHTML="Тест длился " +timer+ " секунд";
    content.innerHTML = '<br>'
        + '<div class="registration">Вы ответели на ' + answeredQuestions + ' вопросов из ' +allQuestions+ '.</div>'
        + '<br><br>'
        + '<div class="registration">Для получения результата - нужно ответить обязательно на все врпросы теста!</div>'
        + '<br><br>'
        + '<div class="registration"><button id="returnTest" onclick="clickStartTestButton()">Вернуться к тесту</button></div>'
        + '<br><br>'
        + '<div class="registration"><button id="endTest" onclick="location.reload();">Завершыть тест</button></div>'
        + '<br>';
}

// РЕЗУЛЬТАТЫ ТЕСТА
function innerResult() {
    
    var resultText;
    if (results === 0) {resultText = "Вы не страдаете алкоголизмом";}
    else if (results < 8) {resultText = "У вас ранняя стадия алкоголизма, которая длится обычно 10-15 лет."}
    else if (results < 18) {resultText = "У вас средняя стадия алкоголизма, длится обычно 2-5 лет."}
    else {resultText = "У вас последняя стадия алкоголизма."}
    
    clearInterval(myCounter); // остановка таймера
    title.innerText = "Результаты теста";
    subtitle.innerHTML="Тесть длился " +timer+ " секунд";
    content.innerHTML = '<br>'
        + '<div class="registration">' +resultText+ '</div>'
        + '<br><br>'
        + '<div class="registration"><button id="endTest" onclick="location.reload();">Завершыть тест</button></div>'
        + '<br>';
}

/////////////////////////////////////////////////////////////////////////////////
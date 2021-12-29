<?php
// забираем параметры заказа
$send_1 = $_POST["vjs1"];
$send_2 = $_POST["vjs2"];

//отправляем письмо с заказом
$to = "chelovek-gorod@yandex.by"; //  dianitpsk@yandex.by
$tema = "Заказ металлопроката"; // тема полученного емайла
$message .= "Номер телефона: ".$send_1."<br><br>"; //полученное из формы name=phone
$message .= "Заказ: <br>".$send_2."<br>"; //полученное из формы name=message
$headers  = "MIME-Version: 1.0" . "\r\n"; // заголовок соответствует формату плюс символ перевода строки
$headers .= "From: metal@bit-studio.by" . "\r\n"; // указывает на тип посылаемого контента
$headers .= "Content-type: text/html; charset=utf-8" . "\r\n"; // указывает на тип посылаемого контента
mail($to, $tema, $message, $headers); //отправляет получателю на емайл значения переменных

// отвечаем клиенту
$send["var"]  = true;
$send["var1"]  = $send_1;
$send["var2"]  = $send_2;

$send = json_encode($send, true);
echo $send;
?>
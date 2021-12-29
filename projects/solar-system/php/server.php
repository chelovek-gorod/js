<?php

// распаковка запроса
$email = $_POST["email"];
$text = $_POST["message"];

//отправляем письмо
$to = "chelovek-gorod@yandex.by";
$theme = "Solar System"; // тема полученного емайла
$message .= "Email: ".$email."<br><br>"; //полученное из формы email
$message .= "Message: <br>".$text."<br>"; //полученное из формы message
$headers  = "MIME-Version: 1.0" . "\r\n"; // заголовок соответствует формату плюс символ перевода строки
$headers .= "From: metal@bit-studio.by" . "\r\n"; // указывает на тип посылаемого контента
$headers .= "Content-type: text/html; charset=utf-8" . "\r\n"; // указывает на тип посылаемого контента
$send_ok = mail($to, $theme, $message, $headers); //отправка письма

// ответ сервера
if ($send_ok) {echo 1;} else {echo 0;}

?>

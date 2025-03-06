<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('en', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->isSMTP(); //sending using SMTP
$mail->Host = 'smtp.gmail.com'; //set SMTP server
$mail->SMTPAuth = true; //Enable SMTP authentication
$mail->Username = 'bosak.yevhen.dev@gmail.com'; //SMTP username (email)
$mail->Password = 'qwer12345poi987'; //SMTP password (email password)
$mail->Port = '587';
$mail->SMTPSecure = 'TLS';

//Від кого лист
$mail->setFrom('yevhenbosak4@gmail.com', 'Портфоліо'); // Вказати потрібний E-mail
//Кому відправити
$mail->addAddress('bosak.yevhen.dev@gmail.com'); // Вказати потрібний E-mail
//Тема листа
$mail->Subject = 'Вітання! Це портфоліо';

//Тіло листа
$body = '<h1>Зустрічайте супер листа!</h1>';

if (trim(!empty($_POST['name']))) {
	$body .= "<p>Name:<strong>" . $_POST['name'] . "</strong></p>";
}
if (trim(!empty($_POST['email']))) {
	$body .= "<p>Email:<strong>" . $_POST['email'] . "</strong></p>";
}
if (trim(!empty($_POST['message']))) {
	$body .= "<p>Message:<strong>" . $_POST['message'] . "</strong></p>";
}

/*
   //Прикріпити файл
   if (!empty($_FILES['image']['tmp_name'])) {
	   //шлях завантаження файлу
	   $filePath = __DIR__ . "/files/sendmail/attachments/" . $_FILES['image']['name']; 
	   //грузимо файл
	   if (copy($_FILES['image']['tmp_name'], $filePath)){
		   $fileAttach = $filePath;
		   $body.='<p><strong>Фото у додатку</strong>';
		   $mail->addAttachment($fileAttach);
	   }
   }
   */

$mail->Body = $body;

//Відправляємо
if (!$mail->send()) {
	$message = 'Помилка';
} else {
	$message = 'Дані надіслані!';
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>
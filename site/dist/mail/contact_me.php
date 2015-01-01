<?php
require 'StopForumSpam.php';

// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['phone']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL)
){
   header('HTTP/1.0 400 Bad Request');
   print "Looks like you forgot some important fields. Pleasee check the form and try again.";
	die();
}


$spam_checker = new StopForumSpam();
$spammer = $spam_checker->is_spammer([
   'email' => $_POST['email'],
   'ip' => $_SERVER['REMOTE_ADDR']
]);
if($spammer){
   header('HTTP/1.0 403 Bad Request');
   print "Looks like your a spammer, so we blocked you.";
   die();
}

	
$name = $_POST['name'];
$email_address = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];
	
// Create the email and send the message
$to = 'info@swimscoring.com';
$email_subject = "Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\n\nName: $name\n\nEmail: $email_address\n\nPhone: $phone\n\nMessage:\n$message";
$headers = "From: noreply@yourdomain.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";	
mail($to,$email_subject,$email_body,$headers);
print 'Thanks for the message.';
?>
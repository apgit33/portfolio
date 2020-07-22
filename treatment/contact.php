<?php
// grab recaptcha library
require_once "recaptchalib.php";

// your secret key
$secret = "YourKey";
 
// empty response
$response = null;
 
// check secret key
$reCaptcha = new ReCaptcha($secret);




$validation = false;
$erreurs[]='';

$nom = (isset($_POST['first-name']) ? (string)htmlentities(trim($_POST['first-name'])):"");
$prenom = (isset($_POST['last-name']) ? (string)htmlentities(trim($_POST['last-name'])):"");
$email = (isset($_POST['email']) ? (string)htmlentities(trim($_POST['email'])):"");
$sujet = (isset($_POST['sujet']) ? (string)htmlentities(trim($_POST['sujet'])):"");
$message = (isset($_POST['message']) ? (string)htmlentities(trim($_POST['message'])):"");

$reg = '^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$^';

if($nom == '') {
    $erreurs[]['nom'] = 'Veuillez renseigner votre nom';
}else if(!preg_match($reg,$nom)) {
    $erreurs[]['nom'] = 'Nom incorrect';
}

if($prenom == '') {
    $erreurs[]['prenom'] = 'Veuillez renseigner votre prénom';
}else if(!preg_match($reg,$prenom)) {
    $erreurs[]['prenom'] = 'Prénom incorrect';
}

if(!filter_var(filter_var($email, FILTER_SANITIZE_EMAIL), FILTER_VALIDATE_EMAIL)) {  
    $erreurs[]['email'] = "Veuillez renseigner un email valide";
}

if($sujet == '') {
    $erreurs[]['sujet'] = 'Veuillez renseigner un sujet';
}
if($message == '') {
    $erreurs[]['message'] = 'Votre message est vide';
}

// if submitted check response
if ($_POST["g-recaptcha-response"]) {
    $response = $reCaptcha->verifyResponse(
        $_SERVER["REMOTE_ADDR"],
        $_POST["g-recaptcha-response"]
    );
}

if ($response == null && ($response->success==false)) {
    $erreurs[]['captcha'] = 'Merci de cocher le captcha';
}

if (!isset($erreurs[1])) {
    $validation = true;
    $sujetF = "Portfolio - $sujet";
    $message = str_replace("\n.", "\n..", $message);
    $messageF ="De : $email\nNom : $nom\nPrénom : $prenom\n\n$message"; 
    
    $erreurs[]['mail'] = (mail("adrienpaturot@yahoo.fr",$sujetF,$messageF))? "<span class='success title'>Email envoyé</span>":"<span class='fail title'>Email non envoyé</span>";
}
echo json_encode(array('validation' => $validation,'erreurs' => $erreurs));
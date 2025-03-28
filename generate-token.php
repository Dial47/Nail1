<?php
require_once 'vendor/autoload.php';

// Función para obtener el cliente de Google
function getClient() {
    $client = new Google_Client();
    $client->setApplicationName('AgelNails Booking System');
    $client->setScopes([
        Google_Service_Calendar::CALENDAR,
        Google_Service_Gmail::GMAIL_SEND
    ]);
    $client->setAuthConfig('credentials.json'); // Asegúrate de tener este archivo
    $client->setAccessType('offline');
    $client->setPrompt('select_account consent');
    $client->setRedirectUri('http://' . $_SERVER['HTTP_HOST'] . '/generate-token.php');

    return $client;
}

// Obtener el cliente
$client = getClient();

// Si hay un código de autorización en la URL
if (isset($_GET['code'])) {
    $authCode = $_GET['code'];
    
    // Intercambiar el código por un token de acceso
    $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
    $client->setAccessToken($accessToken);
    
    // Verificar errores
    if (array_key_exists('error', $accessToken)) {
        throw new Exception(join(', ', $accessToken));
    }
    
    // Guardar el token en un archivo
    file_put_contents('token.json', json_encode($client->getAccessToken()));
    echo "Token generado y guardado correctamente. Puedes cerrar esta ventana.";
} else {
    // Si no hay código, generar URL de autorización
    $authUrl = $client->createAuthUrl();
    echo "<h1>Autorización de Google Calendar</h1>";
    echo "<p>Haz clic en el siguiente enlace para autorizar el acceso a Google Calendar:</p>";
    echo "<a href='{$authUrl}'>Autorizar acceso</a>";
}
?>
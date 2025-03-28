<?php
require_once 'vendor/autoload.php';

// Configuración de CORS para permitir solicitudes desde tu dominio
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Si es una solicitud OPTIONS (preflight), terminar aquí
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Verificar que sea una solicitud POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}

// Obtener los datos del formulario
$data = json_decode(file_get_contents('php://input'), true);

// Validar los datos recibidos
if (!isset($data['name']) || !isset($data['email']) || !isset($data['phone']) || 
    !isset($data['service']) || !isset($data['date']) || !isset($data['time'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

// Configurar cliente de Google
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

    // Cargar token previamente almacenado, si existe
    $tokenPath = 'token.json';
    if (file_exists($tokenPath)) {
        $accessToken = json_decode(file_get_contents($tokenPath), true);
        $client->setAccessToken($accessToken);
    }

    // Si hay token expirado, refrescarlo
    if ($client->isAccessTokenExpired()) {
        if ($client->getRefreshToken()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
            file_put_contents($tokenPath, json_encode($client->getAccessToken()));
        } else {
            // Si no hay refresh token, necesitarías manejar la autenticación manual
            // Esto es simplificado, en producción necesitarías un flujo más robusto
            echo json_encode(['error' => 'Token expirado, necesita reautenticación']);
            exit;
        }
    }

    return $client;
}

try {
    // Obtener cliente autenticado
    $client = getClient();
    
    // Crear servicio de Calendar
    $service = new Google_Service_Calendar($client);
    
    // Formatear fecha y hora
    $dateTime = $data['date'] . 'T' . $data['time'] . ':00';
    $timeZone = 'America/Mexico_City'; // Ajusta según tu zona horaria
    
    // Calcular fin de la cita (asumiendo 1 hora por defecto)
    $duration = isset($data['duration']) ? $data['duration'] : 60; // en minutos
    $endDateTime = date('Y-m-d\TH:i:s', strtotime($dateTime) + $duration * 60);
    
    // Crear evento
    $event = new Google_Service_Calendar_Event([
        'summary' => 'Cita: ' . $data['service'] . ' - ' . $data['name'],
        'description' => 'Servicio: ' . $data['service'] . "\n" .
                        'Cliente: ' . $data['name'] . "\n" .
                        'Teléfono: ' . $data['phone'] . "\n" .
                        'Email: ' . $data['email'],
        'start' => [
            'dateTime' => $dateTime,
            'timeZone' => $timeZone,
        ],
        'end' => [
            'dateTime' => $endDateTime,
            'timeZone' => $timeZone,
        ],
        'attendees' => [
            ['email' => $data['email']],
        ],
        'reminders' => [
            'useDefault' => false,
            'overrides' => [
                ['method' => 'email', 'minutes' => 24 * 60], // Recordatorio por email 24h antes
                ['method' => 'popup', 'minutes' => 60], // Recordatorio popup 1h antes
            ],
        ],
    ]);
    
    // ID del calendario (usa 'primary' para el calendario principal)
    $calendarId = 'primary';
    
    // Insertar evento
    $event = $service->events->insert($calendarId, $event);
    
    // Enviar correo de confirmación
    $gmailService = new Google_Service_Gmail($client);
    
    // Crear el mensaje de correo
    $emailSubject = 'Confirmación de cita - AgelNails';
    $emailBody = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(to right, #8b5cf6, #ff3385); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; border: 1px solid #ddd; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            .button { display: inline-block; background: #ff3385; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h1>¡Tu cita ha sido confirmada!</h1>
            </div>
            <div class='content'>
                <p>Hola <strong>{$data['name']}</strong>,</p>
                <p>Gracias por reservar una cita con AgelNails. A continuación, encontrarás los detalles de tu reserva:</p>
                <ul>
                    <li><strong>Servicio:</strong> {$data['service']}</li>
                    <li><strong>Fecha:</strong> {$data['date']}</li>
                    <li><strong>Hora:</strong> {$data['time']}</li>
                </ul>
                <p>Hemos añadido esta cita a tu Google Calendar. Recibirás recordatorios 24 horas y 1 hora antes de tu cita.</p>
                <p>Si necesitas modificar o cancelar tu cita, por favor contáctanos al teléfono: <strong>(123) 456-7890</strong> o responde a este correo.</p>
                <p>¡Esperamos verte pronto!</p>
                <p>Atentamente,<br>El equipo de AgelNails</p>
            </div>
            <div class='footer'>
                <p>© " . date('Y') . " AgelNails. Todos los derechos reservados.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    $rawMessage = "From: AgelNails <noreply@agelnails.com>\r\n";
    $rawMessage .= "To: {$data['name']} <{$data['email']}>\r\n";
    $rawMessage .= "Subject: =?UTF-8?B?" . base64_encode($emailSubject) . "?=\r\n";
    $rawMessage .= "MIME-Version: 1.0\r\n";
    $rawMessage .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
    $rawMessage .= $emailBody;
    
    // Codificar el mensaje en base64
    $encodedMessage = rtrim(strtr(base64_encode($rawMessage), '+/', '-_'), '=');
    
    // Crear el mensaje para Gmail
    $message = new Google_Service_Gmail_Message();
    $message->setRaw($encodedMessage);
    
    // Enviar el correo
    $gmailService->users_messages->send('me', $message);
    
    // Responder con éxito
    echo json_encode([
        'success' => true,
        'message' => 'Cita reservada con éxito',
        'eventId' => $event->getId(),
        'eventLink' => $event->getHtmlLink()
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error al procesar la solicitud',
        'details' => $e->getMessage()
    ]);
}
?>
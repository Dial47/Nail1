// Configuración de Google Calendar API
const CLIENT_ID = '968384731893-qnt62g593v87m5hcjtit82cn8f7vscg0.apps.googleusercontent.com'; // Reemplaza con tu ID de cliente de OAuth
const API_KEY = 'AIzaSyBvIifAv8xCj7S3h0G8O8u2ZD8I5ngdnCo'; // Reemplaza con tu API Key
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

let tokenClient;
let gapiInited = false;
let gisInited = false;

// Función para cargar la API de Google
function loadGoogleAPI() {
  const script1 = document.createElement('script');
  script1.src = 'https://apis.google.com/js/api.js';
  script1.onload = gapiLoaded;
  document.body.appendChild(script1);

  const script2 = document.createElement('script');
  script2.src = 'https://accounts.google.com/gsi/client';
  script2.onload = gisLoaded;
  document.body.appendChild(script2);
}

// Inicializar la biblioteca gapi
function gapiLoaded() {
  gapi.load('client', initializeGapiClient);
}

// Inicializar el cliente gapi
async function initializeGapiClient() {
  await gapi.client.init({
    apiKey: API_KEY,
    discoveryDocs: DISCOVERY_DOCS,
  });
  gapiInited = true;
  maybeEnableButtons();
}

// Inicializar la biblioteca gis
function gisLoaded() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '', // Será definido más tarde
  });
  gisInited = true;
  maybeEnableButtons();
}

// Habilitar botones cuando ambas bibliotecas estén cargadas
function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    console.log('Google API inicializada correctamente');
  }
}

// Función para autenticar al usuario
function handleAuthClick() {
  return new Promise((resolve, reject) => {
    try {
      // Solicitar un token de acceso
      tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
          reject(resp);
          return;
        }
        console.log('Usuario autenticado correctamente');
        resolve(resp);
      };
      
      if (gapi.client.getToken() === null) {
        // Solicitar un token de acceso
        tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        // Reutilizar el token existente
        tokenClient.requestAccessToken({ prompt: '' });
      }
    } catch (err) {
      console.error('Error durante la autenticación:', err);
      reject(err);
    }
  });
}

// Función para crear un evento en Google Calendar
async function createCalendarEvent(eventData) {
  try {
    // Primero autenticar al usuario
    await handleAuthClick();
    
    // Crear el evento
    const event = {
      'summary': `Cita en AgelNails: ${eventData.service}`,
      'location': 'Calle Principal 123, Ciudad',
      'description': `Reserva para ${eventData.name}. Servicio: ${eventData.service}. Notas: ${eventData.notes || 'Ninguna'}`,
      'start': {
        'dateTime': `${eventData.date}T${eventData.time}:00`,
        'timeZone': 'Europe/Madrid'
      },
      'end': {
        // Asumimos que cada cita dura 1 hora
        'dateTime': `${eventData.date}T${addHoursToTime(eventData.time, 1)}:00`,
        'timeZone': 'Europe/Madrid'
      },
      'attendees': [
        {'email': eventData.email}
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 30}
        ]
      }
    };

    const request = gapi.client.calendar.events.insert({
      'calendarId': 'primary',
      'resource': event,
      'sendUpdates': 'all'
    });

    const response = await new Promise((resolve, reject) => {
      request.execute(resp => {
        if (resp.error) {
          reject(resp.error);
        } else {
          resolve(resp);
        }
      });
    });

    console.log('Evento creado: ' + response.htmlLink);
    return response;
  } catch (error) {
    console.error('Error al crear el evento:', error);
    throw error;
  }
}

// Función auxiliar para añadir horas a un tiempo en formato HH:MM
function addHoursToTime(time, hoursToAdd) {
  const [hours, minutes] = time.split(':').map(Number);
  let newHours = hours + hoursToAdd;
  
  // Manejar el desbordamiento de 24 horas
  if (newHours >= 24) {
    newHours = newHours - 24;
  }
  
  return `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Exportar funciones para uso en otros archivos
window.calendarIntegration = {
  loadGoogleAPI,
  createCalendarEvent
};
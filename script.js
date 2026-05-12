const inputIntento = document.getElementById('inputIntento');
const btnAdivinar = document.getElementById('btnAdivinar');
const mensaje = document.getElementById('mensaje');
const contador = document.getElementById('contador');
const historial = document.getElementById('historial');
const btnReiniciar = document.getElementById('btnReiniciar');
const tarjeta = document.getElementById('game-card');

console.log('Elementos conectados:', inputIntento, btnAdivinar, mensaje, contador, historial, btnReiniciar, tarjeta);

function mostrarMensaje(texto, color) {
  mensaje.textContent = texto;
  mensaje.style.color = color;
}

// Prueba la función
mostrarMensaje('¡Bienvenido al juego!', '#e94560');
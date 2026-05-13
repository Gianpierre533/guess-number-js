const inputIntento = document.getElementById('inputIntento');
const btnAdivinar = document.getElementById('btnAdivinar');
const mensaje = document.getElementById('mensaje');
const contador = document.getElementById('contador');
const historial = document.getElementById('historial');
const btnReiniciar = document.getElementById('btnReiniciar');
const tarjeta = document.querySelector('.game-card'); 
const musica = document.getElementById('musicaFondo');
const volumenControl = document.getElementById('volumenControl');

// --- Variables del juego ---
let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let intentos = 0;
let historialIntentos = [];

console.log('(DEBUG) Número secreto:', numeroSecreto);

// --- Configuración Inicial de Audio ---
if (musica && volumenControl) {
    musica.volume = volumenControl.value; // Sincroniza el audio con el valor inicial del slider
}

// --- Función para actualizar mensajes con colores de la paleta ---
function mostrarMensaje(texto, color) {
    mensaje.textContent = texto;
    mensaje.style.color = color;
    mensaje.style.animation = 'none';
    void mensaje.offsetWidth; 
    mensaje.style.animation = 'fadeIn 0.4s ease forwards';
}

// Mensaje inicial
mostrarMensaje('¡Bienvenido al juego!', '#fce4ec');

function iniciarMusica() {
    if (musica && musica.paused) {
        musica.play().catch(error => console.log("Esperando interacción para sonar..."));
    }
}

// Evento para el control de volumen
if (volumenControl) {
    volumenControl.addEventListener('input', () => {
        musica.volume = volumenControl.value;
        iniciarMusica(); // Intenta reproducir si el usuario mueve el volumen
    });
}

function actualizarHistorial(valor) {
    historialIntentos.push(valor);
    historial.innerHTML = '';
    
    historialIntentos.forEach(num => {
        const badge = document.createElement('span');
        badge.classList.add('history-badge');
        badge.textContent = num;
        historial.appendChild(badge);
    });
}

// --- Función principal ---
function verificarIntento() {
    iniciarMusica(); // Activa la música al primer clic si no ha sonado antes
    
    let valor = Number(inputIntento.value);

    if (!inputIntento.value || isNaN(valor) || valor < 1 || valor > 100) {
        mostrarMensaje('Rango inválido', '#ff4d6d');
        return;
    } 

    intentos++;
    contador.textContent = 'Intentos: ' + intentos;
    actualizarHistorial(valor);

    if (valor === numeroSecreto) {
        mostrarMensaje('✨ ¡LO LOGRASTE! ✨', '#00ff88');
        btnAdivinar.disabled = true;
        btnReiniciar.style.display = 'inline-block';
        
        tarjeta.style.borderColor = '#ff6b9c85';
        tarjeta.style.boxShadow = '0 0 40px rgba(252, 61, 188, 0.69)';
    } else {
        const direccion = valor > numeroSecreto ? '⬇️ Menor' : '⬆️ Mayor';
        const pista = obtenerPistaVisual(valor, numeroSecreto);
        const colorMsj = valor > numeroSecreto ? '#4cc9f0' : '#ff6b9d';
        
        mostrarMensaje(`${direccion} — ${pista}`, colorMsj);
    }

    inputIntento.value = '';
    inputIntento.focus();
}

function obtenerPistaVisual(intento, secreto) {
    const diferencia = Math.abs(intento - secreto);
    if (diferencia <= 5)  return '🔥 Muy cerca';
    if (diferencia <= 15) return '♨️ Ya casi';
    if (diferencia <= 30) return '☁️ Algo lejos';
    return '❄️ Muy lejos';
}

// --- Conectar eventos ---
btnAdivinar.addEventListener('click', verificarIntento);

inputIntento.addEventListener('keypress', function(evento) {
    if (evento.key === 'Enter') {
        verificarIntento();
    }
});

// --- Reiniciar juego ---
function reiniciarJuego() {
    numeroSecreto = Math.floor(Math.random() * 100) + 1;
    intentos = 0;
    historialIntentos = [];

    contador.textContent = 'Intentos: 0';
    historial.innerHTML = ''; 
    
    mostrarMensaje('🎯 Mucha Suerte...', '#ff6b9d');

    btnAdivinar.disabled = false;
    btnReiniciar.style.display = 'none';
    inputIntento.value = '';
    inputIntento.focus();

    tarjeta.style.borderColor = 'rgba(255, 107, 157, 0.25)';
    tarjeta.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.5)';
    console.log('(DEBUG) Nuevo número secreto:', numeroSecreto);
}

btnReiniciar.addEventListener('click', reiniciarJuego);
// Intentar tocar la música con el primer clic en cualquier parte del documento
document.addEventListener('click', () => {
    if (musica.paused) {
        musica.play().catch(error => {
            console.log("El navegador aún bloquea el audio");
        });
    }
}, { once: true }); // El 'once: true' hace que este evento solo se dispare una vez
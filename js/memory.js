let parejasEncontradas = 0;
let primeraSeleccion = null;
let bloquearClick = false;
let intentosRestantes = 3;

const grupoTarjetas = [
    { image: "./assets/img/chucky.wepb", valor: "imagen 1" },
    { image: "./assets/img/freddy.wepb", valor: "imagen 2" },
    { image: "./assets/img/halloween.wepb", valor: "imagen 3" },
    { image: "./assets/img/it.wepb", valor: "imagen 4" },
    { image: "./assets/img/jason.wepb", valor: "imagen 5" },
    { image: "./assets/img/saw.wepb", valor: "imagen 6" },
    { image: "./assets/img/scream.wepb", valor: "imagen 7" },
    { image: "./assets/img/grito.wepb", valor: "imagen 8" },
];

const totalBarajas = [...grupoTarjetas, ...grupoTarjetas];

const barajaTarjetas = () => {
    return totalBarajas.sort(() => Math.random() - 0.5);
};

const actualizarIntentos = () => {
    document.getElementById("intentos").textContent = `Intentos restantes: ${intentosRestantes}`;
};

// Pantalla de Game Over
const mostrarGameOver = (ganador) => {
    const gameOverModal = document.getElementById("game-over");
    const gameoverTexto = document.querySelector(".game-over-texto");

    if (ganador) { // Si el jugador gana
        gameoverTexto.textContent = "¡Has ganado sobrevivido!";
    } else { // Si el jugador pierde
        gameoverTexto.textContent = "¡Se te acabaron los intentos! Buena suerte la próxima vez.";
    }

    gameOverModal.style.display = 'flex';
    setTimeout(() => {
        gameOverModal.classList.add('visible');
    }, 100);
};

// Función para repartir las tarjetas
const reparteTarjetas = () => {
    parejasEncontradas = 0;
    primeraSeleccion = null;
    bloquearClick = false;
    intentosRestantes = 3;

    actualizarIntentos();

    const mesa = document.querySelector("#mesa");
    // limpia la mesa antes de repartir
    mesa.innerHTML = " ";

    const tarjetasBarajadas = barajaTarjetas();

    tarjetasBarajadas.forEach((imagenCarta) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = "tarjeta";
        tarjeta.dataset.valor = imagenCarta.valor;
        tarjeta.innerHTML = `
            <div class="tarjeta_reverso"></div>
            <div class="tarjeta_contenido">
                <img src="${imagenCarta.image}" alt="Carta de memory">
            </div>
        `;
        
        mesa.appendChild(tarjeta);

        tarjeta.addEventListener("click", () => {
            if (bloquearClick || tarjeta.classList.contains("descubierta")) {
                return;
            }

            tarjeta.classList.add("descubierta");

            if (!primeraSeleccion) {
                primeraSeleccion = tarjeta;
            } else {
                const segundaSeleccion = tarjeta;
                if (primeraSeleccion.dataset.valor === segundaSeleccion.dataset.valor) {
                    parejasEncontradas++;
                    primeraSeleccion = null;

                    if (parejasEncontradas === grupoTarjetas.length) {
                        mostrarGameOver(true);
                    }
                } else {
                    bloquearClick = true;
                    intentosRestantes--;
                    actualizarIntentos();

                    setTimeout(() => {
                        primeraSeleccion.classList.remove("descubierta");
                        segundaSeleccion.classList.remove("descubierta");
                        primeraSeleccion = null;
                        bloquearClick = false;

                        if (intentosRestantes === 0) {
                            mostrarGameOver(false);
                        }
                    }, 1000);
                }
            }
        });
    });
};


// para reiniciar desde el primer boton en pantalla 
document.querySelector("#btn-reinicio").addEventListener('click', reparteTarjetas);


// Reiniciamos desde el modal el juego
document.querySelector("#btn-reinicio-game-over").addEventListener('click', () => {
const gameOverImagen = document.getElementById("game-over");
 gameOverImagen.classList.remove('visible');

 setTimeout(() => {
  gameOverImagen.style.display = 'none';
  }, 1000);
  reparteTarjetas();
  });

// carga el juego al actualizar pagina
  window.onload = reparteTarjetas;

// document.querySelector("#btn-reinicio").addEventListener('click', reparteTarjetas);

// document.querySelector("#btn-reinicio-game-over").addEventListener('click', () => {
//     const gameOverImagen = document.getElementById("game-over");
//     gameOverImagen.classList.remove('visible');
//     setTimeout(() => {
//         gameOverImagen.style.display = 'none';
//     }, 1000);
//     reparteTarjetas();
// });
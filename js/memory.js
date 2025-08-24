let parejasEncontradas = 0;
let primeraSeleccion = null;
let bloquearClick = false;
let intentosRestantes = 3;

const grupoTarjetas = [
  { image: "./assets/img/chucky.webp", valor: "imagen 1" },
  { image: "./assets/img/freddy.webp", valor: "imagen 2" },
  { image: "./assets/img/halloween.webp", valor: "imagen 3" },
  { image: "./assets/img/it.webp", valor: "imagen 4" },
  { image: "./assets/img/jason.webp", valor: "imagen 5" },
  { image: "./assets/img/saw.webp", valor: "imagen 6" },
  { image: "./assets/img/scream.webp", valor: "imagen 7" },
  { image: "./assets/img/grito.webp", valor: "imagen 8" },
];

const totalBarajas = [...grupoTarjetas, ...grupoTarjetas];

const barajaTarjetas = () => {
  return totalBarajas.sort(() => Math.random() - 0.5);
};

const actualizarIntentos = () => {
  document.getElementById(
    "intentos"
  ).textContent = `Remaining Attempts: ${intentosRestantes}`;
};

// Pantalla de Game Over
const mostrarGameOver = (ganador) => {
  const gameOverModal = document.getElementById("game-over");
  const gameoverTexto = document.querySelector(".game-over-texto");

  if (ganador) {
    // Si el jugador gana
    gameoverTexto.textContent = "You survived!!";
  } else {
    // Si el jugador pierde
    gameoverTexto.textContent =
      "You've run out of attempts! Good luck next time.";
  }

  gameOverModal.style.display = "flex";
  setTimeout(() => {
    gameOverModal.classList.add("visible");
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
document
  .querySelector("#btn-reinicio")
  .addEventListener("click", reparteTarjetas);

// Reiniciamos desde el modal el juego
document
  .querySelector("#btn-reinicio-game-over")
  .addEventListener("click", () => {
    const gameOverImagen = document.getElementById("game-over");
    gameOverImagen.classList.remove("visible");

    setTimeout(() => {
      gameOverImagen.style.display = "none";
    }, 1000);
    reparteTarjetas();
  });

// carga el juego al actualizar pagina
window.onload = reparteTarjetas;



let parejasEncontradas = 0;
let primeraSeleccion = null;
let bloquearClick = false;
let intentosRestantes = 3; // Nuevo: contador de intentos 

const grupoTarjetas = [
  { image: "./assets/img/img_1.webp", valor: "imagen 1" },
  { image: "./assets/img/img_2.jpg", valor: "imagen 2" },
  { image: "./assets/img/img_3.webp", valor: "imagen 3" },
  { image: "./assets/img/img_4.webp", valor: "imagen 4" },
  { image: "./assets/img/img_5.webp", valor: "imagen 5" },
  { image: "./assets/img/img_6.webp", valor: "imagen 6" },
  { image: "./assets/img/img_7.webp", valor: "imagen 7" },
  { image: "./assets/img/img_8.webp", valor: "imagen 8" },
];

const totalBarajas = [...grupoTarjetas, ...grupoTarjetas];

//  para  que los pares  esten desordenados
const barajaTarjetas = () => {
  return totalBarajas.sort(() => Math.random() - 0.5);
};

// Construimos el tablero
const reparteTarjetas = () => {
  // reiniciamos las variables
  let parejasEncontradas = 0;
  let primeraSeleccion = null;
  let bloquearClick = false;
  intentosRestantes = 3; // Reiniciamos los intentos

// funcion para reiniciar el contador de intentos
  const actualizarIntentos = () => {
    document.getElementById("intentos").textContent = `Intentos restantes:${intentosRestantes}`;
  };

// funcion para mostrar game over
const mostrarGameOver = () =>{
   const mensaje  = ganador ?
   "Has ganado el Memory !": 
   "Te has quedado sin intentos ";
  
  setTimeout(() =>{
   alert(mensaje);
   reparteTarjetas();
  },1000);
};



  // seleccionamos el contenedor
  const mesa = document.querySelector("#mesa");
  // limpiamos por si habia cartas
  mesa.innerHTML = " ";

  // obtenemos las cartas mezcladas
  const tarjetasBarajadas = barajaTarjetas();

  tarjetasBarajadas.forEach((imagenCarta) => {
    // Contendra el contenedor de la tarjeta
    const tarjeta = document.createElement("div");
    // para los estilos
    tarjeta.className = "tarjeta";

    // insertamos la imagen dentro con un div interior
    // tarjeta.innerHTML = `<div class="tarjeta_contenido"> ${imagen}</div>`;

    tarjeta.dataset.valor = imagenCarta.valor;
    // insertamos la imagen y su reverso
    tarjeta.innerHTML = `
            <div class="tarjeta_reverso"></div>
            <div class="tarjeta_contenido">
                <img src="${imagenCarta.image}" alt="Carta de memory">
            </div>
        `;

    // Añadimos la carta al DOM
    mesa.appendChild(tarjeta);

    // Agregamos la interactividad a esta tarjeta
    tarjeta.addEventListener("click", () => {
      // Si el juego está bloqueado o esta tarjeta ya está

      if (bloquearClick || tarjeta.classList.contains("descubierta")) {
        return;
      }
      // Mostramos la carta (visualmente)
      tarjeta.classList.add("descubierta");

      if (!primeraSeleccion) {
        // Si no hay otra carta seleccionada, guardamos esta
        primeraSeleccion = tarjeta;
      } else {
        // Ya hay una carta seleccionada → esta es la segunda
        const segundaSeleccion = tarjeta;
        // Obtenemos los imagenes internos de ambas
        // const imagen1 = primeraSeleccion.querySelector(".tarjeta__contenido").innerText;
        // const imagen2 = segundaSeleccion.querySelector(".tarjeta__contenido").innerText;
        if (primeraSeleccion.dataset.valor === segundaSeleccion.dataset.valor) {
          // Coinciden → dejamos ambas descubiertasparejasEncontradas++; // Nuevo: contar parejas acertadas

          parejasEncontradas++;
          primeraSeleccion = null;
          // Comprobamos si el jugador ha ganado
          if (parejasEncontradas === grupoTarjetas.length) {
            setTimeout(() => {
              alert("¡Has ganado el memory!");
              reparteTarjetas(); // Reinicia el juego
            }, 500);
          }
        } else {
          // No coinciden → taparlas tras 1 segundo
          bloquearClick = true;
          setTimeout(() => {
            primeraSeleccion.classList.remove("descubierta");
            segundaSeleccion.classList.remove("descubierta");
            primeraSeleccion = null;
            bloquearClick = false;
          }, 1000);
        }
      }
    });
  });
};

reparteTarjetas();

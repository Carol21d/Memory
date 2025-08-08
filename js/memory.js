const grupoTarjetas = [
  {image : './assets/img/img_1.webp'},
  {image : './assets/img/img_2.webp'},
  {image : './assets/img/img_3.webp'},
  {image : './assets/img/img_4.webp'},
  {image : './assets/img/img_5.webp'},
  {image : './assets/img/img_6.webp'},
  {image : './assets/img/img_7.webp'},
  {image : './assets/img/img_8.webp'},
 


];

const totalBarajas = [ ...grupoTarjetas, ...grupoTarjetas];

//  para  que los pares no esten desordenados
const  barajaTarjetas = () => {
    return totalBarajas.sort(() => Math.random() - 0.5);
};

// Construimos el tablero
const reparteTarjetas = () => {
    // seleccionamos el contenedor
    const mesa = document.querySelector("#mesa");
    // limpiamos por si habia cartas
    mesa.innerHTML = " ";

    // obtenemos las cartas mezcladas
    const tarjetasBarajadas = barajaTarjetas();

    tarjetasBarajadas.forEach( imagen  => {
        // Contendra el contenedor de la tarjeta
        const tarjeta = document.createElement("div");
        // para los estilos 
        tarjeta.className = "tarjeta";

        // insertamos la imagen dentro con un div interior
        tarjeta.innerHTML = `<div class="tarjeta_contenido"> ${imagen}</div>`;

        // Añadimos la carta al DOM
        mesa.appendChild(tarjeta);

        // Agregamos la interactividad a esta tarjeta 
        tarjeta.addEventListener("click", () =>{
            
        })
    })
}
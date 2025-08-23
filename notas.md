/* Estilos básicos del juego */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #e0e0e0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
}

h1 {
    color: #4a4a4a;
    font-size: 2.5rem;
    margin-bottom: 2rem;
}

#mesa {
    display: grid;
    grid-template-columns: repeat(4, 100px);
    gap: 15px;
    perspective: 1000px; /* Para el efecto 3D de volteo */
}

/* Contenedor de la tarjeta que permite el volteo */
.tarjeta {
    width: 100px;
    height: 100px;
    position: relative; /* Para posicionar el reverso y el contenido */
    transform-style: preserve-3d; /* Permite el volteo en 3D */
    transition: transform 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    cursor: pointer;
}

/* Al agregar la clase 'descubierta', la tarjeta se voltea */
.tarjeta.descubierta {
    transform: rotateY(180deg);
}

/* El reverso y el contenido son las dos caras de la tarjeta */
.tarjeta_reverso,
.tarjeta_contenido {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden; /* Oculta la cara trasera del elemento volteado */
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.tarjeta_reverso {
    background: linear-gradient(135deg, #42a5f5, #2979ff);
    color: white;
    font-weight: bold;
    font-size: 3rem;
    /* Puedes usar un ícono, un emoji, o nada. Aquí hay un simple ? */
    content: '?';
}

.tarjeta_contenido {
    background-color: #ffffff;
    transform: rotateY(180deg); /* La cara del contenido está volteada inicialmente */
}

.tarjeta_contenido img {
    max-width: 90%;
    max-height: 90%;
    border-radius: 5px;
}

<!-- Añ -->
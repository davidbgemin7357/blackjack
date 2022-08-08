/*
 * 2C = 2 de tréboles
 * 2D = 2 de diamantes
 * 2H = 2 de corazones
 * 2S = 2 de espadas
 */

let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

// referencias del html:
const btnPedir = document.querySelector("#btnPedir");
const puntosHtml = document.querySelectorAll("small");

// * función para crear una baraja ordenada aletoriamente:
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let especial of especiales) {
            deck.push(especial + tipo);
        }
    }

    // ordena los elementos del array en forma aletaria:
    deck = _.shuffle(deck);
    // console.log(deck);
    return deck;
};

crearDeck();

// * función para pedir carta y luego obtener su valor:
const pedirCarta = () => {
    if (deck.length === 0) {
        throw "No hay cartas en la baraja";
    }
    const carta = deck.pop();
    // console.log(deck);
    // console.log(carta);
    return carta;
};

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : parseInt(valor);
};

// const valor = valorCarta(pedirCarta());
// console.log(valor);

// * turno de la computadora:
let puntosComputadora = 0;
const divCartasComputadora = document.querySelector("#computadora-cartas");
const turnoComputadora = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHtml[1].innerText = puntosComputadora;

        const imgCarta = document.createElement("img");
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add("carta");
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) break;
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
            alert("Nadie gana :c");
        } else if (puntosMinimos > 21) {
            alert("Computadora gana");
        } else if (puntosComputadora > 21) {
            alert("Jugador gana");
        } else {
            alert("Computadora gana");
        }
    }, 100);
};

// * eventos de los botones:
// * pedir carta
let puntosJugador = 0;
const divCartasJugador = document.querySelector("#jugador-cartas");

btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHtml[0].innerHTML = puntosJugador;

    const imgCarta = document.createElement("img");
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn("Lo siento, perdiste");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn("21, genial");
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
});

// * detener juego:
const btnDetener = document.querySelector("#btnDetener");
btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

// * resetear juego:
const btnNuevo = document.querySelector("#btnNuevo");
btnNuevo.addEventListener("click", () => {
    console.clear();
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHtml[0].innerText = 0;
    puntosHtml[1].innerText = 0;
    divCartasJugador.innerHTML = "";
    divCartasComputadora.innerText = "";
    btnPedir.disabled = false;
    btnDetener.disabled = false;
});

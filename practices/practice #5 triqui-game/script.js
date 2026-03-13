const celdas = document.querySelectorAll(".celda");
const resetBtn = document.getElementById("reset");
const turnoMensaje = document.getElementById("turno");
const ganadorMensaje = document.getElementById("ganador");

let jugadorActual = "X";
let tablero = ["", "", "", "", "", "", "", "", ""];
let juegoActivo = true;

const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Filas
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Columnas
  [0, 4, 8],
  [2, 4, 6], // Diagonales
];

// Inicializar mensaje de turno
turnoMensaje.textContent = "Turno de X";

function verificarGanador() {
  for (let combo of winnerCombos) {
    let [a, b, c] = combo;
    if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
      jugadorActual === "X"
        ? (ganadorMensaje.textContent = `¡Jugador 1 gana!`)
        : (ganadorMensaje.textContent = `¡Jugador 2 gana!`);
      turnoMensaje.textContent = ""; // Borra el mensaje de turno
      juegoActivo = false;
      return true; // Se detiene el juego
    }
  }

  // Verificar empate
  if (tablero.every((celda) => celda !== "")) {
    ganadorMensaje.textContent = "¡Empate!";
    turnoMensaje.textContent = ""; // Borra el mensaje de turno
    juegoActivo = false;
    return true;
  }

  return false;
}

function click(event) {
  if (!juegoActivo) return;
  let index = parseInt(event.target.dataset.index); // Convertir a índice del array (0-8)

  if (!tablero[index]) {
    tablero[index] = jugadorActual;
    event.target.textContent = jugadorActual;
    event.target.style.color = jugadorActual === "X" ? "blue" : "red";

    if (!verificarGanador()) {
      jugadorActual = jugadorActual === "X" ? "O" : "X";
      turnoMensaje.textContent = "Turno de " + jugadorActual;
    }
  }
}

function resetGame() {
  tablero.fill("");
  celdas.forEach((celda) => (celda.textContent = ""));
  jugadorActual = "X";
  turnoMensaje.textContent = "Turno de X";
  ganadorMensaje.textContent = "";
  juegoActivo = true;
}

// Asignar eventos
celdas.forEach((celda) => celda.addEventListener("click", click));
resetBtn.addEventListener("click", resetGame);

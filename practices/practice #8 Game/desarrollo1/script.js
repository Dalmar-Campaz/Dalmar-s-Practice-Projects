const player1 = document.getElementById("jugador1");
const player2 = document.getElementById("jugador2");
const plataformas = document.querySelectorAll(".plataforma");
const marco = document.getElementById("marco");
let moveYPlayer1 = marco.clientHeight - jugador1.clientHeight;
let moveXPlayer1 = 6;
let suelo = marco.clientHeight - jugador2.clientHeight;
let moveXPlayer2 = 36;
const gravedad = 8;
const speed = 6;
const keys = {};
let alturaSaltoPlayer1 = moveYPlayer1 - 112;
let jumpPower2 = 20;
let velocityY2 = 0;
let enSueloPlayer1 = true;
let enSueloPlayer2 = true;

document.addEventListener("keydown", (event) => {
  keys[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (event) => {
  delete keys[event.key.toLowerCase()];
});

//player 1

function saltarPlayer1() {
  if (!enSueloPlayer1) return;
  enSueloPlayer1 = false;

  function AnimacionSalto() {
    if (moveYPlayer1 > alturaSaltoPlayer1 && moveYPlayer1 != 0) {
      moveYPlayer1 -= jumpPower;
      player1.style.top = `${moveYPlayer1}px`;
      requestAnimationFrame(AnimacionSalto);
    } else {
      caerPlayer1();
    }
  }
  AnimacionSalto();
}
function caerPlayer1() {
  function animacionCaidaPlayer1() {

    let colision = colisionesConPlataformas(player1, moveYPlayer1)

    if (colision.enSuelo || moveYPlayer1 >= marco.clientHeight - jugador1.clientHeight) {
      moveYPlayer1 = colision.nuevaY;
      enSueloPlayer1 = colision.enSuelo;
      player1.style.top = `${moveYPlayer1}px`;
    } else {
      moveYPlayer1 += gravedad;
      player1.style.top = `${moveYPlayer1}px`;
      requestAnimationFrame(animacionCaidaPlayer1);
    }
    
  }
  animacionCaidaPlayer1();
}

function MoverPlayer1() {
  if (keys["w"]) saltarPlayer1();
  // if (keys["s"] && moveY < 776) moveY += speed;
  if (keys["a"] && moveXPlayer1 > 0) moveXPlayer1 -= speed;
  if (keys["d"] && moveXPlayer1 < 784) moveXPlayer1 += speed;

  player1.style.left = `${moveXPlayer1}px`;
  player1.style.top = `${moveYPlayer1}px`;

  if(!enSueloPlayer1){
    caerPlayer1();
  }

  requestAnimationFrame(MoverPlayer1);
}
MoverPlayer1();

//player 2
function saltarPlayer2() {
  velocityY2 -= jumpPower2
  enSueloPlayer2 = false;

}
function caerPlayer2() {
  function animacionCaidaPlayer2() {
    let colision = colisionesConPlataformas (player2, positionYPlayer2);
    enSueloPlayer2 = colision.enSuelo;

    if (colision.enSuelo || positionYPlayer2 >= marco.clientHeight - jugador2.clientHeight) {
      positionYPlayer2 = colision.nuevaY;
      enSueloPlayer2 = true;
      player2.style.top = `${positionYPlayer2}px`;
    } else {
      positionYPlayer2 += gravedad;
      player2.style.top = `${positionYPlayer2}px`;
      requestAnimationFrame(animacionCaidaPlayer2);
    }
  }
  animacionCaidaPlayer2();
}
function MoverPlayer2() {
  if (keys["arrowup"] && enSueloPlayer2) saltarPlayer2();
  // if (keys["s"] && moveY < 776) moveY += speed;
  if (keys["arrowleft"] && moveXPlayer2 > 0) moveXPlayer2 -= speed;
  if (keys["arrowright"] && moveXPlayer2 < 784) moveXPlayer2 += speed;

  player2.style.left = `${moveXPlayer2}px`;
  player2.style.top = `${positionYPlayer2}px`;

  requestAnimationFrame(MoverPlayer2);
}
MoverPlayer2();

//plataformas

function colisionesConPlataformas(player, moveYPlayer) {
  const playerX = player === player1 ? moveXPlayer1 : moveXPlayer2;
  const playerY = moveYPlayer;
  const playerWidth = player.offsetWidth;
  const playerHeight = player.offsetHeight;

  for (let plataforma of plataformas) {
    const platleft = plataforma.offsetLeft;
    const platright = plataforma.offsetLeft + plataforma.offsetWidth;
    const platTop = plataforma.offsetTop;

    // Solo colisión vertical desde arriba
    if (
      playerY + playerHeight >= platTop &&
      playerY + playerHeight <= platTop + 8 && // margen de colisión ajustado
      playerX + playerWidth > platleft &&
      playerX < platright
    ) {
      return {
        enSuelo: true,
        nuevaY: platTop - playerHeight
      };
    }
  }

  return {
    enSuelo: false,
    nuevaY: moveYPlayer
  };
}
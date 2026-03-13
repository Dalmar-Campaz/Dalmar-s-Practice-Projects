const canvas = document.getElementById("game-canvas");
const contexto = canvas.getContext("2d");
const keys = {};
const gravedad = 1.2;
const fondo = new Image();

fondo.src = "nivel1.jpg";

document.addEventListener("keydown", (e) => {
  keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
  keys[e.key] = false;
});

//colisiones
function colisiones(obj1, obj2) {
  return (
    obj1.x < obj2.x + obj2.width &&
    obj1.x + obj1.width > obj2.x &&
    obj1.y < obj2.y + obj2.height &&
    obj1.y + obj1.height > obj2.y
  );
}

//player 1
const player1 = {
  x: 400,
  y: 0,
  width: 22,
  height: 30,
  color: "grey",
  speed: 6.4,
  dx: 0,
  dy: 0,
  enSuelo: true,
  jumpPower: 17,
  fallSpeed: 0,
};
const sueloPlayer1 = canvas.height - player1.height;
player1.y = sueloPlayer1;

function jumpPlayer1() {
  player1.fallSpeed -= player1.jumpPower;
  player1.enSuelo = false;
}

function updatePosition1() {
  if (keys["w"] && player1.enSuelo) jumpPlayer1();
  //if (keys["w"] && player1.y > 0) player1.y -= player1.speed;
  //if (keys["s"] && player1.y + player1.height < canvas.height) player1.y += player1.speed;
  if (keys["a"]) player1.x -= player1.speed;
  if (keys["d"]) player1.x += player1.speed;

  player1.fallSpeed += gravedad;
  player1.y += player1.fallSpeed;
  player1.enSuelo = false;

  plataformas.forEach((plataforma) => {
    if (colisiones(player1, plataforma)) {
      const isPlayer1OnPlatform =
        player1.y + player1.height - player1.fallSpeed <= plataforma.y;
      if (isPlayer1OnPlatform) {
        player1.y = plataforma.y - player1.height;
        player1.fallSpeed = 0;
        player1.enSuelo = true;
      }
    }
  });

  if (player1.y >= sueloPlayer1) {
    player1.y = sueloPlayer1;
    player1.enSuelo = true;
    player1.fallSpeed = 0;
  }
  //colisiones con las paredes
  if (player1.y <= 0) player1.y = 0;
  if (player1.x <= 0) player1.x = 0;
  if (player1.x + player1.width> canvas.width) player1.x = canvas.width - player1.width;
}

function drawPlayer1() {
  contexto.fillStyle = player1.color;
  contexto.fillRect(player1.x, player1.y, player1.width, player1.height);
}

//player 2
const player2 = {
  x: 80,
  y: 0,
  width: 22,
  height: 30,
  color: "white",
  speed: 6.4,
  dx: 0,
  dy: 0,
  enSuelo: true,
  jumpPower: 17,
  fallSpeed: 0,
};
const sueloPlayer2 = canvas.height - player2.height;
player2.y = sueloPlayer2;
function jumpPlayer2() {
  player2.fallSpeed = -player2.jumpPower;
  player2.enSuelo = false;
}

function updatePosition2() {
  if (keys["ArrowUp"] && player2.enSuelo) jumpPlayer2();
  if (keys["ArrowLeft"] && player2.x > 0) player2.x -= player2.speed;
  if (keys["ArrowRight"] && player2.x + player2.width < canvas.width)
    player2.x += player2.speed;

  player2.fallSpeed += gravedad;
  player2.y += player2.fallSpeed;
  player2.enSuelo = false;

  plataformas.forEach((plataforma) => {
    if (colisiones(player2, plataforma)) {
      const isPlayer2OnPlatform =
        player2.y + player2.height - player2.fallSpeed <= plataforma.y;

      if (isPlayer2OnPlatform) {
        player2.y = plataforma.y - player2.height;
        player2.fallSpeed = 0;
        player2.enSuelo = true;
      }
    }
  });

  if (player2.y >= sueloPlayer2) {
    player2.y = sueloPlayer2;
    player2.enSuelo = true;
    player2.fallSpeed = 0;
  }
  //colisiones con paredes
  if (player2.y <= 0) player2.y = 0;
  if (player2.x <= 0) player2.x = 0;
  if (player2.x + player2.width> canvas.width) player2.x = canvas.width - player2.width;
}

function drawPlayer2() {
  contexto.fillStyle = player2.color;
  contexto.fillRect(player2.x, player2.y, player2.width, player2.height);
}

//plataformas
const plataformas = [
  { x: canvas.width - 209, y: 695, width: 72, height: 3 },
  { x: canvas.width - 109, y: 603, width: 75, height: 3 },
  { x: canvas.width - 277, y: 507, width: 80, height: 3 },
  { x: canvas.width - 407, y: 561, width: 67, height: 3 },
  { x: 417, y: 506, width: 33, height: 3 },
  { x: 247, y: 479, width: 92, height: 3 },
  { x: 144, y: 518, width: 46, height: 3 },
  { x: 58, y: 442, width: 35, height: 3 },
  { x: 147, y: 370, width: 46, height: 3 },
  { x: 248, y: 313, width: 50, height: 3 },
  { x: 356, y: 255, width: 38, height: 3 },
  { x: 482, y: 203, width: 418, height: 3 },
];

function drawPlataformas() {
  contexto.fillStyle = "red";
  plataformas.forEach((p) => {
    contexto.fillRect(p.x, p.y, p.width, p.height);
  });
}

//flujo del juego
function gameLoop() {
  contexto.clearRect(0, 0, canvas.width, canvas.height);
  drawPlataformas();
  contexto.drawImage(fondo, 0, 0, canvas.width, canvas.height);
  updatePosition1();
  drawPlayer1();
  updatePosition2();
  drawPlayer2();
  requestAnimationFrame(gameLoop);
}

gameLoop();

//checkpoint
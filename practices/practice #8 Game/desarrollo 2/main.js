const canvas = document.getElementById("game-canvas");
const contexto = canvas.getContext("2d");
const keys = {};
const gravedad = 2;
const fondo = new Image();

fondo.src = "fondoo.jpg";

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
  x: 45,
  y: 0,
  width: 30,
  height: 45,
  color: "red",
  speed: 9,
  dx: 0,
  dy: 0,
  enSuelo: true,
  jumpPower: 36,
  fallSpeed: 0,
};
const suelo = canvas.height - player1.height - 85;
player1.y = suelo;

function jumpPlayer1() {
  player1.fallSpeed -= player1.jumpPower;
  player1.enSuelo = false;
}

function updatePosition1() {
  if (keys["w"] && player1.enSuelo) jumpPlayer1();
  //if (keys["w"] && player1.y > 0) player1.y -= player1.speed;
  //if (keys["s"] && player1.y + player1.height < canvas.height) player1.y += player1.speed;
  if (keys["a"] && player1.x > 0) player1.x -= player1.speed;
  if (keys["d"] && player1.x + player1.width < canvas.width)
    player1.x += player1.speed;

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

  if (player1.y >= suelo) {
    player1.y = suelo;
    player1.enSuelo = true;
    player1.fallSpeed = 0;
  }
}

function drawPlayer1() {
  contexto.fillStyle = player1.color;
  contexto.fillRect(player1.x, player1.y, player1.width, player1.height);
}

//player 2
const player2 = {
  x: 80,
  y: 0,
  width: 30,
  height: 45,
  color: "white",
  speed: 9,
  dx: 0,
  dy: 0,
  enSuelo: true,
  jumpPower: 36,
  fallSpeed: 0,
};
player2.y = suelo;
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

  if (player2.y >= suelo) {
    player2.y = suelo;
    player2.enSuelo = true;
    player2.fallSpeed = 0;
  }
}

function drawPlayer2() {
  contexto.fillStyle = player2.color;
  contexto.fillRect(player2.x, player2.y, player2.width, player2.height);
}

//plataformas
const plataformas = [
  { x: 0, y: 450, width: 300, height: 10 },
  { x: canvas.width - 450, y: 450, width: 450, height: 10 },
  { x: canvas.width - 180, y: 280, width: 180, height: 10 },
  { x: canvas.width - 246, y: 525, width: 80, height: 10 },
];

function drawPlataformas() {
  contexto.fillStyle = "black";
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

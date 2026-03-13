// IMPORTACIONES
import { drawPlataformas, plataformas } from "./javascript/plataformas.js";
import { animarSprite } from "./javascript/sprites.js";
import { Jugador } from "./javascript/Player.js";
import { keys } from "./javascript/input.js";

const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

const fondo = new Image();
fondo.src = "fondo2.png";

const gravedad = 0.8;
const suelo = canvas.height - 97;




// JUGADOR 1 - CONFIGURACIÓN
const spritesP1 = {
  idle: new Image(),
  run: new Image(),
  jump: new Image(),
  idleData: { frameWidth: 64, frameHeight: 64, totalFrames: 2, currentFrame: 0, drawWidth: 100, drawHeight: 100 },
  runData: { frameWidth: 64, frameHeight: 64, totalFrames: 9, currentFrame: 0, drawWidth: 100, drawHeight: 100 },
  jumpData: { frameWidth: 64, frameHeight: 64, currentFrame: 0, drawWidth: 100, drawHeight: 100 }
};
spritesP1.idle.src = "yuki/idle.png";
spritesP1.run.src = "yuki/running.png";
spritesP1.jump.src = "yuki/jump.png";
if (spritesP1.idle.src.includes("yuki")){
  spritesP1.idleData = {frameWidth: 64, frameHeight: 64, totalFrames: 2, currentFrame: 0, drawWidth: 75, drawHeight: 75}
  spritesP1.runData = {frameWidth: 64, frameHeight: 64, totalFrames: 8, currentFrame: 0, drawWidth: 75, drawHeight: 75}
  spritesP1.jumpData = {frameWidth: 64, frameHeight: 64, currentFrame: 0, drawWidth: 75, drawHeight: 75}
}
// JUGADOR 2 - CONFIGURACIÓN
const spritesP2 = {
  idle: new Image(),
  run: new Image(),
  jump: new Image(),
  idleData: { frameWidth: 64, frameHeight: 64, totalFrames: 2, currentFrame: 0, drawWidth: 100, drawHeight: 100 },
  runData: { frameWidth: 64, frameHeight: 64, totalFrames: 9, currentFrame: 0, drawWidth: 100, drawHeight: 100 },
  jumpData: { frameWidth: 64, frameHeight: 64, currentFrame: 0, drawWidth: 100, drawHeight: 100 }
};
spritesP2.idle.src = "puki/idle.png";
spritesP2.run.src = "puki/running.png";
spritesP2.jump.src = "puki/jump.png";
if (spritesP2.idle.src.includes("yuki")){
  spritesP2.idleData = {frameWidth: 64, frameHeight: 64, totalFrames: 2, currentFrame: 0, drawWidth: 75, drawHeight: 75}
  spritesP2.runData = {frameWidth: 64, frameHeight: 64, totalFrames: 8, currentFrame: 0, drawWidth: 75, drawHeight: 75}
  spritesP2.jumpData = {frameWidth: 64, frameHeight: 64, currentFrame: 0, drawWidth: 75, drawHeight: 75}
}

// ANIMACIONES
animarSprite(spritesP1.idleData, 250);
animarSprite(spritesP1.runData, 40);
animarSprite(spritesP2.idleData, 250);
animarSprite(spritesP2.runData, 40);

// INSTANCIAR JUGADORES
const player1 = new Jugador({
  x: 400, y: suelo,
  width: 10, height: 30,
  color: "grey",
  speed: 3.5,
  jumpPower: 13.5,
  controles: { izquierda: "a", derecha: "d", arriba: "w" },
  sprites: spritesP1,
  contexto: ctx,
  gravedad,
  suelo,
  plataformas,
  spriteOffsetY: spritesP1.idle.src.includes("yuki") ? 12 : 0
});

const player2 = new Jugador({
  x: 120, y: suelo,
  width: 10, height: 30,
  color: "white",
  speed: 3.6,
  jumpPower: 13.5,
  controles: { izquierda: "ArrowLeft", derecha: "ArrowRight", arriba: "ArrowUp" },
  sprites: spritesP2,
  contexto: ctx,
  gravedad,
  suelo,
  plataformas,
  spriteOffsetY: spritesP2.idle.src.includes("yuki") ? 12 : 0
});

// LOOP DEL JUEGO
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlataformas(ctx);
  ctx.drawImage(fondo, 0, 0, 1000, 910, 0, 0, canvas.width, canvas.height);
  player1.actualizarMovimiento(keys);
  player1.dibujar();
  player2.actualizarMovimiento(keys);
  player2.dibujar();
  requestAnimationFrame(gameLoop);
}

gameLoop();

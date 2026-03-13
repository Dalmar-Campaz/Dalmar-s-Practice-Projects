const cruz = document.getElementById("cruz");
let rotar = 0;
let mover = false; // La animación empieza detenida
let direccion = 0; // 0 = sin rotación, -1 = izquierda, 1 = derecha

document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();

  if (key === "x") {
    direccion = -1; // Rotar a la izquierda
    mover = true;
    Rotar();
  }
  if (key === "c") {
    direccion = 1; // Rotar a la derecha
    mover = true;
    Rotar();
  }
  if (key === "z") {
    mover = false; // Detener la rotación
  }
});

function Rotar() {
  if (!mover) return; // Si está detenido, salir de la función

  rotar += direccion * 5; // Rotar en la dirección correspondiente
  cruz.style.transform = `rotate(${rotar}deg)`;

  if (rotar === 360 || rotar === -360) rotar = 0;

  requestAnimationFrame(Rotar);
}

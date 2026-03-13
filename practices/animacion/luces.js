const blue = document.getElementById("azul");
const red = document.getElementById("rojo");
let encendido = false;
let isRedOn = false;
let intervalo;

document.addEventListener("keydown", (event) => {
  if (event.key === "l") {
    encendido = !encendido;
    if (encendido) {
      alumbrar();
    } else {
      apagar();
    }
  }
});

function alumbrar() {
  intervalo = setInterval(() => {
    if (!isRedOn) {
      blue.style.backgroundColor = "rgb(4, 4, 56)";
      red.style.backgroundColor = "red";
      red.style.boxShadow = "0px 0px 100px 50px rgba(255, 0, 0, 0.3)";
      blue.style.boxShadow = "unset";
      isRedOn = true;
    } else {
      red.style.backgroundColor = "rgb(70, 11, 11)";
      blue.style.backgroundColor = "blue";
      blue.style.boxShadow = "0px 0px 100px 50px rgba(0, 0, 255, 0.3)";
      red.style.boxShadow = "unset";
      isRedOn = false;
    }
  }, 500);
}
function apagar(){
    clearInterval(intervalo);
    red.style.backgroundColor = "rgb(70, 11, 11)";
    red.style.boxShadow = "unset";
    blue.style.backgroundColor = "rgb(4, 4, 56)";
    blue.style.boxShadow = "unset";
}

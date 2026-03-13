const pantalla = document.getElementById("pantalla");
const cero = document.getElementById("cero");
const uno = document.getElementById("uno");
const dos = document.getElementById("dos");
const tres = document.getElementById("tres");
const cuatro = document.getElementById("cuatro");
const cinco = document.getElementById("cinco");
const seis = document.getElementById("seis");
const siete = document.getElementById("siete");
const ocho = document.getElementById("ocho");
const nueve = document.getElementById("nueve");
const multiplicar = document.getElementById("multiplicar");
const restar = document.getElementById("restar");
const sumar = document.getElementById("sumar");
const dividir = document.getElementById("dividir");
const porcentaje = document.getElementById("porcentaje");
const cuadrado = document.getElementById("cuadrado");
const clear = document.getElementById("clear");
const back = document.getElementById("back");
const punto = document.getElementById("punto");
const igual = document.getElementById("igual");

cero.addEventListener("click", ()=>{
    pantalla.value += 0;
})
uno.addEventListener("click", ()=>{
    pantalla.value += 1;
})
dos.addEventListener("click", ()=>{
    pantalla.value += 2;
})
tres.addEventListener("click", ()=>{
    pantalla.value += 3;
})
cuatro.addEventListener("click", ()=>{
    pantalla.value += 4;
})
cinco.addEventListener("click", ()=>{
    pantalla.value += 5;
})
seis.addEventListener("click", ()=>{
    pantalla.value += 6;
})
siete.addEventListener("click", ()=>{
    pantalla.value += 7;
})
ocho.addEventListener("click", ()=>{
    pantalla.value += 8;
})
nueve.addEventListener("click", ()=>{
    pantalla.value += 9;
})
punto.addEventListener("click", ()=>{
    pantalla.value += ".";
})
sumar.addEventListener("click", ()=>{
    pantalla.value += "+";
})
restar.addEventListener("click", ()=>{
    pantalla.value += "-";
})
multiplicar.addEventListener("click", ()=>{
    pantalla.value += "x";
})
dividir.addEventListener("click", ()=> {
    pantalla.value += "/";
})
porcentaje.addEventListener("click", ()=> {
    pantalla.value += "%";
})
cuadrado.addEventListener("click", ()=> {
    pantalla.value += "^2";
})
back.addEventListener("click", ()=> {
   pantalla.value = pantalla.value.slice(0, -1);
})
pantalla.addEventListener("keypress", function (event) {
    if(/[*]/.test(event.key)){
        pantalla.value += "x";
    }
})
pantalla.addEventListener("keydown", function (event) {
    if(/[,]/.test(event.key)){
        pantalla.value += ".";
    }
})
window.onload = () => pantalla.focus();
pantalla.addEventListener("blur", ()=> {
    setTimeout(()=> pantalla.focus(), 0)
})
clear.addEventListener("click", ()=>{
    pantalla.value = "";
})

igual.addEventListener ("click", ()=> {
    let expresion = pantalla.value.replace(/x/g, "*").replace(/%/g, "/100").replace(/\^2/g, "**2");
    try {
        pantalla.value = Math.round(eval(expresion) * 10000) / 10000;
    }
     catch(e) {
        pantalla.value = "Error"
}})
pantalla.addEventListener("keydown", (event)=> {
    if(event.key === "Enter"){
    igual.click();
    }
})
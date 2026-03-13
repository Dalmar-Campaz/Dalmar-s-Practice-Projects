let vidaJugador = 100;
let ataqueJugador = 15;
let inventario = ["Poción", "Daga Rústica"];

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("historia").textContent = "Eres un aventurero en busca de la Gema de la Oscuridad. Estás en la entrada del Bosque Sombrío. ¿Qué harás?";
});

function elegirOpcion(opcion) {
    if (opcion === 1) {
        document.getElementById("historia").textContent = "Te adentras en el bosque y te ataca un Sombra Errante.";
        iniciarCombate("Sombra Errante", 50, 10);
    } else {
        document.getElementById("historia").textContent = "Has llegado al pueblo. Aquí puedes comprar pociones o equipamiento.";
        document.getElementById("acciones").innerHTML = `
            <button onclick="comprar('Poción')">Comprar Poción (10 oro)</button>
            <button onclick="comprar('Espada')">Comprar Espada (30 oro)</button>
            <button onclick="volverMenu()">Volver al menú</button>
        `;
    }
}

function iniciarCombate(enemigo, vidaEnemigo, ataqueEnemigo) {
    let turnos = 0;
    let maxTurnos = 50; 

    while (vidaJugador > 0 && vidaEnemigo > 0) {
        if (turnos >= maxTurnos) {
            alert("El combate se ha prolongado demasiado y ambos se retiran.");
            break;
        }

        let accion = prompt(`Estás en combate contra ${enemigo}\n1. Atacar\n2. Defender\n3. Usar poción`);
        if (accion == 1) {
            vidaEnemigo -= ataqueJugador;
            alert(`Atacaste a ${enemigo}, su vida es ahora ${vidaEnemigo}`);
        } else if (accion == 2) {
            alert("Te defiendes y reduces el daño.");
            vidaJugador -= (ataqueEnemigo / 2);
        } else if (accion == 3 && inventario.includes("Poción")) {
            vidaJugador += 20;
            let index = inventario.indexOf("Poción");
            inventario.splice(index, 1);
            alert(`Usaste una poción y recuperaste vida. Ahora tienes ${vidaJugador}`);
        } else {
            alert("Opción inválida o sin pociones disponibles.");
        }

        if (vidaEnemigo > 0) {
            vidaJugador -= ataqueEnemigo;
            alert(`${enemigo} te ataca, tu vida es ahora ${vidaJugador}`);
        }
        turnos++;
    }

    if (vidaJugador <= 0) {
        alert("Has sido derrotado. Fin del juego.");
        location.reload();
    } else if (vidaEnemigo <= 0) {
        alert(`¡Derrotaste a ${enemigo}!`);
    }
}

function comprar(item) {
    if (item === "Poción") {
        inventario.push("Poción");
        alert("Compraste una poción.");
    } else if (item === "Espada") {
        ataqueJugador += 10;
        alert("Compraste una espada. Tu ataque aumenta.");
    }
}

function volverMenu() {
    document.getElementById("historia").textContent = "Estás en la entrada del Bosque Sombrío. ¿Qué harás?";
    document.getElementById("acciones").innerHTML = `
        <button onclick="elegirOpcion(1)">Adentrarse al bosque</button>
        <button onclick="elegirOpcion(2)">Regresar al pueblo</button>
    `;
}

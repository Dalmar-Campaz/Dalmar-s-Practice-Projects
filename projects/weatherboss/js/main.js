const apiKey = "38e6341398624cca4db0e881e99fea6b";
const ciudad = "cali";
const climaBox = document.getElementById("pronosticos-hoy");
const ClimaBoxFuturo = document.getElementById("pronosticos-futuro")

async function getClimaHoy() {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;
    const respuesta = await fetch(url);
    return await respuesta.json()
}

async function getClimaFuturo() {
    const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;
    const respuesta = await fetch(url2);
    const data = await respuesta.json();
    return data;
}

function getTipoClima(main) {
    const map = {
        Clear: "Soleado",
        Clouds: "Nublado",
        Rain: "Lluvioso",
        Drizzle: "Lluvioso",
        Thunderstorm: "Lluvioso",

        Mist: "neutral",
        Smoke: "neutral",
        Haze: "neutral",
        Dust: "neutral",
        Fog: "neutral",
        Sand: "neutral",
    }
    return map[main] || "neutral";
}

function iconClima(tipo) {
    let iconClima;
    switch (tipo) {
        case "Soleado":
            iconClima = "fa-sun";
            break
        case "Nublado":
            iconClima = "fa-cloud";
            break
        case "Lluvioso":
            iconClima = "fa-cloud-rain"
            break
        default:
            iconClima = "fa-sun";
    }
    return iconClima;
}

async function setInfoHoy() {

    const dataHoy = await getClimaHoy();
    const tipo = getTipoClima(dataHoy.weather[0].main);
    const esNoche = dataHoy.weather[0].icon.includes("n");
    let icon = iconClima(tipo);
    let estado;
    if (!esNoche) {
        estado = tipo == "neutral" ? "Soleado" : tipo;
        document.body.style.background = `var(--default-background)`;
        iconClima(tipo);
    } else {
        estado = "Noche"
        iconClima = "fa-moon"
        document.body.style.background = `var(--color-night-bg)`;
    }

    const ahora = (new Date()).toLocaleDateString("es-CO", {
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });



    climaBox.innerHTML = `      
        <div>
        <h2 class="ciudad">${dataHoy.name}</h2>
        <p class="today-date">Hoy, ${ahora}</p>
      </div>
      <div>
        <h2 class="temperatura" >${dataHoy.main.temp}°</h2>

        <div class="clima-div">
          <i class="fa-solid ${icon}"></i>
          <p>${estado}</p>
        </div>

        <p class="sensacion-termica">Sensacion termica ${dataHoy.main.feels_like}°</p>
      </div>`;

    if (esNoche) {
        climaBox.style.backgroundImage = `url(assets/Noche.png)`;
        return;
    }
    switch (tipo) {
        case "Soleado":
            climaBox.style.backgroundImage = `url(assets/Soleado.png)`;
            break
        case "Nublado":
            climaBox.style.backgroundImage = `url(assets/Nublado.png)`;
            break
        case "Lluvioso":
            climaBox.style.backgroundImage = `url(assets/Lluvioso.png)`
            break
        default:
            climaBox.style.backgroundImage = `url(assets/Soleado.png)`;
    }
}

async function setInfoFutura() {
    const infoFutura = await getClimaFuturo();
    const ahora = new Date();
    const dias = {};

    infoFutura.list.forEach(item => {
        const fecha = item.dt_txt.split(" ")[0];
        if (!dias[fecha]) {
            dias[fecha] = [];
        }
        dias[fecha].push(item);
    });

    const hoy = new Date().toISOString().split("T")[0];
    const diasArray = Object.entries(dias).filter(([fecha]) => fecha !== hoy).slice(0, 5);

    diasArray.forEach(([fecha, bloques], index) => {
        let tempMax = -Infinity;
        let tempMin = Infinity;
        let humedadTotal = 0;
        const nombreDia = (new Date(bloques[0].dt_txt)).toLocaleDateString("es-ES", {weekday: "long"});

        bloques.forEach(b => {
            humedadTotal += b.main.humidity;
            if (b.main.temp_max > tempMax) tempMax = b.main.temp_max;
            if (b.main.temp_min < tempMin) tempMin = b.main.temp_min;
        });

        const humedad = Math.round(humedadTotal / bloques.length);
        const clima = bloques[0].weather[0].main; 
        const icon = iconClima(getTipoClima(clima));
            ClimaBoxFuturo.innerHTML += `
        <div class="carta">
            <p>${index === 0? "mañana" : nombreDia}</p>
            <i class="fa-solid ${icon} clima"></i>
            <div class="card-txt">
                <span>${Math.round(tempMax)}°</span>
                <span>${Math.round(tempMin)}°</span>
            </div>
            <div class="card-txt">
                <i class="fa-solid fa-droplet"></i>
                <span>${humedad}%</span>
            </div>
        </div>`
    });

}

window.addEventListener("DOMContentLoaded", () => {
    setInfoHoy();
    setInfoFutura();
})


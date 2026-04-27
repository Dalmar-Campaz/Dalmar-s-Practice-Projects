
const container = document.getElementById("recetas-contenedor");
const mostrarMasBtn = document.getElementById("mostrar-mas");
const buscador = document.getElementById("buscador");
const form = document.getElementById("form-busqueda");

const cajaInstrucciones = document.getElementById("instrucciones");
const cerrarInstruccionesBtn = document.getElementById("cerrar-btn");
const overlay = document.getElementById("instrucciones-overlay");

async function buscarReceta(element) {
    const url1 = `https://www.themealdb.com/api/json/v1/1/search.php?s=${element}`
    const url2 = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${element}`
    try {
        let respuesta = await fetch(url1);
        let data = await respuesta.json();
        if (data.meals === null) {
            respuesta = await fetch(url2);
            data = await respuesta.json();
        }

        return data.meals;
    } catch (error) {
        console.error("Error al consumir la API", error)
    }
}

async function getRecetaRandom() {
    try {
        const respuesta = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = await respuesta.json();

        return data.meals[0];
    } catch (error) {
        console.error("Error al consumir la API", error)
    }
}

async function mostrarRecetasRandom() {
    let paraTi = "";
    for (let i = 0; i < 8; i++) {
        const receta = await getRecetaRandom();
        paraTi += `
            <article class="receta-carta">
            <img src= "${receta.strMealThumb}"/>
            <div class="receta-info">
                <div>
                <h3>${receta.strMeal}</h3>
                <span><i class="fa-solid fa-globe"></i>${receta.strArea}</span>
                <span><i class="fa-solid fa-layer-group"></i>${receta.strCategory}</span>
                </div>
                <button class="ver-receta" data-id="${receta.idMeal}">Ver Receta</button>
            </div>
            </article>`;
    }
    container.innerHTML = paraTi;
    mostrarMasBtn.classList.remove("hidden");
}

async function verReceta(id) {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();

    const receta = data.meals[0];
    return receta;
}

function cargandoRecetas() {
    container.innerHTML = `
        <div class="cargando">
        </div>`;
    mostrarMasBtn.classList.add("hidden");
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const busqueda = buscador.value.trim().toLowerCase();
    if (!busqueda) return;

    cargandoRecetas();
    const recetas = await buscarReceta(busqueda);

    console.log(recetas);
    if (!recetas || recetas.meals === null) {
        container.innerHTML = `<p>No se encontraron recetas :(</p>`
        mostrarMasBtn.classList.remove("hidden");
        return;
    }

    let resultadosBusqueda = ""

    recetas.forEach(receta => {
        resultadosBusqueda += `
                <article class="receta-carta">
            <img src= "${receta.strMealThumb}"/>
            <div class="receta-info">
                <div>
                <h3>${receta.strMeal}</h3>
                <span><i class="fa-solid fa-globe"></i>${receta.strArea}</span>
                <span><i class="fa-solid fa-layer-group"></i>${receta.strCategory}</span>
                </div>
                <button class="ver-receta" data-id="${receta.idMeal}">Ver Receta</button>
            </div>
            </article>`;
    });
    container.innerHTML = resultadosBusqueda;
})

container.addEventListener('click', async (e) => {
    if (!e.target.classList.contains("ver-receta")) return;

    const id = e.target.dataset.id;
    const receta = await verReceta(id);

    let info = `
                <img src="${receta.strMealThumb}"/>
                <h2>${receta.strMeal}</h2>
                <h3>Ingredientes:</h3><ul>`;

    for (let i = 1; i <= 20; i++) {

        const ingrediente = receta[`strIngredient${i}`];
        const medida = receta[`strMeasure${i}`];

        if (ingrediente && ingrediente.trim() !== "") {
            info += `<li>${medida} ${ingrediente}</li>`;
        }
    }
    info += `
            </ul><h3>Instructions</h3>
            <p>${receta.strInstructions}</p>
            <button class="cerrar-btn">Cerrar</button>`;

    cajaInstrucciones.innerHTML = info;
    cajaInstrucciones.classList.remove("hidden");
    overlay.classList.remove("hidden");
});

cajaInstrucciones.addEventListener('click', (e) => {
    if (!e.target.classList.contains("cerrar-btn")) return;
    cajaInstrucciones.classList.add("hidden");
    overlay.classList.add("hidden");
})

overlay.addEventListener('click', () => {
    cajaInstrucciones.classList.add("hidden");
    overlay.classList.add("hidden");
})

mostrarMasBtn.addEventListener('click', () => {
    cargandoRecetas();
    mostrarRecetasRandom();
})
mostrarRecetasRandom();

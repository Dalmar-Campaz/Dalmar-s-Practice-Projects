
const container = document.getElementById("recetas-contenedor");
const mostrarMasBtn = document.getElementById("mostrar-mas");
const buscador = document.getElementById("buscador");
const form = document.getElementById("form-busqueda")

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
                <button>Ver Receta</button>
            </div>
            </article>`;
    }
    container.innerHTML = paraTi;
    mostrarMasBtn.classList.remove("hidden");
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
                <article class="receta-carta" id="${receta.idMeal}">
            <img src= "${receta.strMealThumb}"/>
            <div class="receta-info">
                <div>
                <h3>${receta.strMeal}</h3>
                <span><i class="fa-solid fa-globe"></i>${receta.strArea}</span>
                <span><i class="fa-solid fa-layer-group"></i>${receta.strCategory}</span>
                </div>
                <button>Ver Receta</button>
            </div>
            </article>`;
    });
    container.innerHTML = resultadosBusqueda;
})

mostrarMasBtn.addEventListener('click', () => {
    cargandoRecetas();
    mostrarRecetasRandom();
})

mostrarRecetasRandom();


const container = document.getElementById("recetas-contenedor");

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
}
mostrarRecetasRandom();

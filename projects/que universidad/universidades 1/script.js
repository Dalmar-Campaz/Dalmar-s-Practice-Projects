let currentIndex = 1;  // La API usa indexación desde 1
const resultsPerPage = 10;
let totalResults = 0; // Se actualizará con la cantidad total de resultados devueltos

document.getElementById("toggle-filtros").addEventListener("click", function() {
    const filtros = document.getElementById("filtros");
    filtros.style.display = filtros.style.display === "none" ? "block" : "none";
});

document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
    currentIndex = 1; // Reiniciar la búsqueda desde el primer resultado

    // Limpiar resultados anteriores
    document.getElementById("lista-resultados").innerHTML = "";
    document.getElementById("navegacion-container").innerHTML = "";

    buscarResultados();
});

function buscarResultados() {
    const carrera = document.getElementById("carrera").value;
    const ubicacion = document.getElementById("ubicacion").value;
    const nivel = document.querySelector('input[name="nivel"]:checked')?.value || "";
    const modalidad = document.querySelector('input[name="modalidad"]:checked')?.value || "";
    const tipo = document.querySelector('input[name="tipo"]:checked')?.value || "";

    let query = `${carrera} ${ubicacion} ${nivel} ${modalidad} ${tipo} site:.edu.co OR site:.edu`;

    const apiKey = "AIzaSyBejZeek6TKAt9YzTvRqmwklBqH8W_rW2s";
    const cx = "e588ec9bee15e4f68";

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cx}&start=${currentIndex}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            totalResults = data.searchInformation.totalResults; // Actualizar el total de resultados
            mostrarResultados(data.items || []);
        })
        .catch(error => console.error("Error en la búsqueda:", error));
}

function mostrarResultados(items) {
    const resultadosDiv = document.getElementById("lista-resultados");
    const navegacionDiv = document.getElementById("navegacion-container");

    resultadosDiv.innerHTML = "";

    items.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("resultado");

        // Obtener el logo de la universidad con Clearbit
        const urlUniversidad = new URL(item.link);
        const dominio = urlUniversidad.hostname.replace("www.", "");
        const clearbitLogo = `https://logo.clearbit.com/${dominio}`;

        let logoUrl = item.pagemap?.cse_image?.[0]?.src 
                    || item.pagemap?.cse_thumbnail?.[0]?.src 
                    || clearbitLogo 
                    || "https://via.placeholder.com/60";

        div.innerHTML = 
            `<img src="${logoUrl}" alt="Logo" style="width: 50px; height: 50px; margin-right: 10px;">
            <div>
                <h3><a href="${item.link}" target="_blank" style="color: black; text-decoration: none;">${item.title}</a></h3>
                <p style="color: gray;">${item.snippet}</p>
            </div>`;

        resultadosDiv.appendChild(div);
    });

    // Crear botones de navegación
    navegacionDiv.innerHTML = "";
    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "< Anterior";
    btnAnterior.classList.add("nav-btn");
    btnAnterior.disabled = currentIndex === 1; // Deshabilitado si estamos en la primera página

    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "Siguiente >";
    btnSiguiente.classList.add("nav-btn");
    btnSiguiente.disabled = currentIndex + resultsPerPage > totalResults; // Deshabilitado si no hay más resultados

    // Eventos de los botones
    btnAnterior.addEventListener("click", function() {
        if (currentIndex > 1) {
            currentIndex -= resultsPerPage;
            buscarResultados();
        }
    });

    btnSiguiente.addEventListener("click", function() {
        if (currentIndex + resultsPerPage <= totalResults) {
            currentIndex += resultsPerPage;
            buscarResultados();
        }
    });

    // Agregar botones a la navegación
    navegacionDiv.appendChild(btnAnterior);
    navegacionDiv.appendChild(btnSiguiente);
}

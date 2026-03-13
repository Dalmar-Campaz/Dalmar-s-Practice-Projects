let currentResultIndex = 0;  // Índice de resultados actual

document.getElementById("search-form").addEventListener("submit", function(event) {
    event.preventDefault();
//estaba teniendo problemas con esta parte del javascript asi que la modifique, si la pagina falla es problable que sea por esta parte
    const nivel = document.querySelector('input[name="nivel"]:checked').value;
    const modalidad = document.querySelector('input[name="modalidad"]:checked').value;
    const ubicacion = document.getElementById("ubicacion").value;
    const carrera = document.getElementById("carrera").value;

    let query = `${carrera} ${ubicacion} ${nivel} ${modalidad} site:.edu.co OR site:.edu`; // Filtrar universidades

    const apiKey = "AIzaSyBejZeek6TKAt9YzTvRqmwklBqH8W_rW2s"; // Tu clave de API
    const cx = "e588ec9bee15e4f68"; // Tu identificador de motor de búsqueda

    // Actualizamos la URL para obtener todos los resultados
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${apiKey}&cx=${cx}`;

    fetch(url)
        .then(response => response.json())
        .then(data => mostrarResultados(data))
        .catch(error => console.error("Error en la búsqueda:", error));
});

function mostrarResultados(data) {
    const resultadosDiv = document.getElementById("lista-resultados");
    resultadosDiv.innerHTML = "";  // Limpiar resultados anteriores

    if (data.items) {
        // Mostrar los primeros 10 resultados
        const currentResults = data.items.slice(currentResultIndex, currentResultIndex + 10);
        currentResults.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("resultado");

            const logoUrl = item.pagemap?.cse_image?.[0]?.src || "https://via.placeholder.com/60";

            div.innerHTML = `
                <img src="${logoUrl}" alt="Logo">
                <div>
                    <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
                    <p>${item.snippet}</p>
                </div>
            `;

            resultadosDiv.appendChild(div);
        });

        // Si hay más resultados, mostrar el botón de "Ver más"
        if (currentResultIndex + 10 < data.items.length) {
            const verMasButton = document.createElement("button");
            verMasButton.textContent = "Ver más resultados";
            verMasButton.classList.add("ver-mas-btn");

            verMasButton.addEventListener("click", function() {
                currentResultIndex += 10;
                mostrarResultados(data); // Cargar más resultados
            });

            document.getElementById("page-numbers").appendChild(verMasButton);
        } else {
            // Si ya no hay más resultados, mostrar el mensaje correspondiente
            const noMoreResults = document.createElement("p");
            noMoreResults.textContent = "No hay más resultados.";
            document.getElementById("page-numbers").appendChild(noMoreResults);
        }
    } else {
        resultadosDiv.innerHTML = "<p>No se encontraron resultados.</p>";
    }
}

// mira oe, este es el script del boton
const filtrosBoton = document.getElementById('filtros-boton');
const searchForm = document.getElementById('search-form');
filtrosBoton.addEventListener('click', () => {
    searchForm.classList.toggle('active'); 
});

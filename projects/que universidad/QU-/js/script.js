const API_KEY = "AIzaSyBjP0F6UxXP-8-LKxwQcizY1dw2pmCneDo";  // Tu API Key
const CX = "e588ec9bee15e4f68";  // Tu ID del motor de búsqueda (CX)

// Inicializamos la variable de página para la paginación
let startIndex = 1;  // Comienza desde el primer resultado
let currentQuery = "";  // Almacena la consulta actual para reutilizarla en la paginación

// Función para manejar el formulario de búsqueda
document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();  // Evita que el formulario recargue la página

  const query = document.getElementById('query').value;  // Captura la búsqueda del usuario
  const privatePublic = document.getElementById('privatePublic').value;  // Captura el tipo de universidad
  const mode = document.getElementById('mode').value;  // Captura modalidad (presencial/virtual)
  const location = document.getElementById('location').value;  // Captura ubicación
  const price = document.getElementById('price').value;  // Captura precio (opcional)

  currentQuery = query;  // Guarda la consulta actual
  startIndex = 1;  // Reinicia la paginación para la nueva búsqueda
  search(query, privatePublic, mode, location, price);  // Llama a la función de búsqueda con los filtros
});

// Función para realizar la búsqueda en Google Custom Search
function search(query, privatePublic, mode, location, price) {
  let filters = '';

  // Construir la cadena de filtros según los valores seleccionados
  if (privatePublic) filters += ` ${privatePublic}`;
  if (mode) filters += ` ${mode}`;
  if (location) filters += ` ${location}`;
  if (price) filters += ` precio:${price}`;
  
  // Filtro para asegurar que solo se busquen universidades
  filters += " universidad";

  const url = `https://www.googleapis.com/customsearch/v1?q=${query + filters}&key=${API_KEY}&cx=${CX}&start=${startIndex}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';  // Limpia los resultados anteriores

      // Recorre los resultados y muestra la información
      if (data.items) {
        data.items.forEach(item => {
          const result = document.createElement('div');
          result.classList.add('result');
          result.innerHTML = `
            <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
            <p>${item.snippet}</p>
            <a href="${item.link}" target="_blank">Ver más</a>
          `;
          resultsDiv.appendChild(result);
        });
        // Agregar botones de paginación
        const paginationDiv = document.createElement('div');
        paginationDiv.classList.add('pagination');
        
        // Si hay más resultados, agrega el botón de siguiente página
        if (data.queries.nextPage) {
          const nextButton = document.createElement('button');
          nextButton.innerText = 'Siguiente';
          nextButton.onclick = () => {
            startIndex += 10;  // Aumenta el índice de inicio para la siguiente página
            search(currentQuery, privatePublic, mode, location, price);  // Realiza la siguiente búsqueda
          };
          paginationDiv.appendChild(nextButton);
        }
        
        // Si estamos en una página posterior a la primera, agrega el botón de página anterior
        if (data.queries.previousPage) {
          const prevButton = document.createElement('button');
          prevButton.innerText = 'Anterior';
          prevButton.onclick = () => {
            startIndex -= 10;  // Disminuye el índice de inicio para la página anterior
            search(currentQuery, privatePublic, mode, location, price);  // Realiza la búsqueda anterior
          };
          paginationDiv.appendChild(prevButton);
        }
        
        resultsDiv.appendChild(paginationDiv);
      } else {
        resultsDiv.innerHTML = '<p class="no-results">No se encontraron resultados.</p>';
      }
    })
    .catch(error => {
      console.error('Error al realizar la búsqueda:', error);
    });
}

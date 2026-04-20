
let songs = [];
const container = document.getElementById("display-songs");


async function getSongs() {
    try {
        const url = "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=eminem&entity=song";
        const respuesta = await fetch(url);
        const songs = await respuesta.json();

        return songs;
    } catch (error) {
        console.error("Error al consumir la API", error)
    }
}

async function mostrarSongs() {
    songs = await getSongs();
    container.innerHTML = "";
    
    songs.results.forEach((element) => {
        let cancion = `
            <div class="flex-r song" id="${element.trackId}">
              <img src="${element.artworkUrl100}" />
              <p>${element.trackName}</p>
            </div>
        `;

        container.innerHTML += cancion;
    });
}

mostrarSongs();

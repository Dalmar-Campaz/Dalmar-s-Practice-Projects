
let songs = [];
const container = document.getElementById("display-songs");
const urls = [
    {
        url: "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=badbunny&entity=song"
    },
    {
        url: "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=eminem&entity=song"
    },

    {
        url: "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=the+weeknd&entity=song"
    },
    {
        url: "https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?term=drake&entity=song"
    }
]

async function getSongs() {
    try {
        let songs = [];

        for(const element of urls){
        const respuesta = await fetch(element.url);
        const data = await respuesta.json();

        songs.push(...data.results);

        }

        return songs;
    } catch (error) {
        console.error("Error al consumir la API", error)
    }
}

async function mostrarSongs() {
    songs = await getSongs();

    let html = "";

    songs.forEach((element) => {
        html += `
            <div class="flex-r song" data-id="${element.trackId}">
              <img src="${element.artworkUrl100}" />
              <p>${element.trackName}</p>
            </div>
        `;
    });
    container.innerHTML = html;
}

function loadPlayer(song) {
    const cover = document.getElementById("cover");
    const title = document.getElementById("title");
    const artist = document.getElementById("artist");

    cover.src = song.artworkUrl100;
    title.textContent = song.trackName;
    artist.textContent = song.artistName;
}


container.addEventListener('click', (e) => {
    const songDiv = e.target.closest(".song");
    if (!songDiv) return;

    const id = songDiv.dataset.id;
    const song = songs.find(s => s.trackId == id);
    document.querySelectorAll(".song").forEach(s => s.classList.remove("active"));
    songDiv.classList.add("active");

    loadPlayer(song);
})

mostrarSongs();
import { toggleSongsMenu, togglePlayer, initUI } from "./sizeBasedBehavior.js";

window.addEventListener("DOMContentLoaded", () => {


    initUI();
    let songs = [];
    const container = document.getElementById("display-songs");

    async function getSongs() {
        try {
            const respuesta = await fetch("https://dajo-player.onrender.com/songs");
            const data = await respuesta.json();

            return data;
        } catch (error) {
            console.error("Error al consumir el backend", error)
        }
    }

    async function mostrarSongs() {
        songs = await getSongs();

        if (!songs) {
            container.innerHTML = "<p>Error cargando canciones</p>";
            return;
        }

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
        document.getElementById("cover").classList.replace("default-cover", "cover");
        const songDiv = e.target.closest(".song");
        if (!songDiv) return;

        const id = songDiv.dataset.id;
        const song = songs.find(s => s.trackId == id);
        document.querySelectorAll(".song").forEach(s => s.classList.remove("active"));
        songDiv.classList.add("active");

        loadPlayer(song);
        if (window.innerWidth <= 920 && window.innerWidth > 450) {
            toggleSongsMenu();
        }
        if (window.innerWidth <= 450) {
            togglePlayer();
        }
    })

    mostrarSongs();
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";
    }, 1000);
});

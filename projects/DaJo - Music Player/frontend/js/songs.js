import { toggleSongsMenu, togglePlayer, initUI } from "./sizeBasedBehavior.js";
window.addEventListener("DOMContentLoaded", () => {


    initUI();
    let songs = [];
    let currentIndex = 0;
    let audio = document.getElementById("audio");
    let isUpdating = false;

    const search = document.getElementById("search");
    const container = document.getElementById("display-songs");
    const btn = document.getElementById("play-pause");
    const forward = document.getElementById("forward");
    const backward = document.getElementById("backward");
    const volume = document.getElementById("volume-bar");
    const volumeBtn = document.getElementById("volume-btn");
    const songProgress = document.getElementById("song-time")

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
        renderSongs(songs);
    }

    function renderSongs(list) {
        let html = "";

        list.forEach((element) => {
            html += `
            <div class="flex-r song" data-id="${element.trackId}">
              <img src="${element.artworkUrl100}" />
              <p>${element.trackName}</p>
            </div>
        `;
        });
        container.innerHTML = html;
    }

    function updateProgressBar(value) {
        songProgress.style.background = `
        linear-gradient(to right, #ff3b3b ${value}%, #252525 ${value}%)
    `;
    }

    function loadPlayer(song, index) {
        const cover = document.getElementById("cover");
        const title = document.getElementById("title");
        const artist = document.getElementById("artist");

        songProgress.value = 0;
        updateProgressBar(0)
        currentIndex = index;

        audio.src = song.previewUrl;
        cover.src = song.artworkUrl100;
        title.textContent = song.trackName;
        artist.textContent = song.artistName;

        document.getElementById("play-pause").classList.remove("fa-play")
        document.getElementById("play-pause").classList.add("fa-pause")

        audio.play()
        isUpdating = true;
        requestAnimationFrame(updateLoop);
    }


    btn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            btn.classList.replace("fa-play", "fa-pause");
            isUpdating = true;
        } else {
            audio.pause();
            btn.classList.replace("fa-pause", "fa-play");
            isUpdating = false;
        }
    })

    forward.addEventListener('click', () => {
        if (currentIndex < songs.length - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        const songsDOM = document.querySelectorAll(".song");

        songsDOM.forEach(s => s.classList.remove("active"));

        songsDOM[currentIndex].classList.add("active");

        loadPlayer(songs[currentIndex], currentIndex)
    })

    backward.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            const songsDOM = document.querySelectorAll(".song");

            songsDOM.forEach(s => s.classList.remove("active"));

            songsDOM[currentIndex].classList.add("active");

            loadPlayer(songs[currentIndex], currentIndex)
        }
    })

    audio.addEventListener('ended', () => {
        isUpdating = false;
        if (currentIndex < songs.length - 1) {
            currentIndex++;

            const songsDOM = document.querySelectorAll(".song");

            songsDOM.forEach(s => s.classList.remove("active"));

            songsDOM[currentIndex].classList.add("active");

            loadPlayer(songs[currentIndex], currentIndex)
        }
    })

    function updateLoop() {
        if (!isUpdating) return;

        const percent = (audio.currentTime / audio.duration) * 100;

        songProgress.value = percent;
        updateProgressBar(percent);

        requestAnimationFrame(updateLoop);
    }

    audio.addEventListener('play', () => {
        requestAnimationFrame(updateLoop);
    });

    container.addEventListener('click', (e) => {
        const songDiv = e.target.closest(".song");
        if (!songDiv) return;

        const id = songDiv.dataset.id;
        const index = songs.findIndex(s => s.trackId == id);
        currentIndex = index;
        const song = songs[currentIndex];

        document.querySelectorAll(".song").forEach(s => s.classList.remove("active"));
        songDiv.classList.add("active");

        document.getElementById("cover").classList.replace("default-cover", "cover");

        loadPlayer(song, currentIndex);

        if (window.innerWidth <= 920 && window.innerWidth > 450) {
            toggleSongsMenu();
        }
        if (window.innerWidth <= 450) {
            togglePlayer();
        }
    })

    volume.addEventListener('input', () => {
        audio.volume = volume.value;
        if (volume.value < 0.50 && volume.value != 0) {
            volumeBtn.classList.add("fa-volume-low")
            volumeBtn.classList.remove("fa-volume-high")
            volumeBtn.classList.remove("fa-volume-xmark")

        } else if (volume.value == 0) {
            volumeBtn.classList.remove("fa-volume-low")
            volumeBtn.classList.remove("fa-volume-high")
            volumeBtn.classList.add("fa-volume-xmark")
        } else {
            volumeBtn.classList.remove("fa-volume-low")
            volumeBtn.classList.add("fa-volume-high")
            volumeBtn.classList.remove("fa-volume-xmark")
        }
    })

    volumeBtn.addEventListener('click', () => {
        document.getElementById("volume-bar-box").classList.toggle("hidden");
    })

    search.addEventListener('input', () => {
        const text = search.value.toLowerCase();

        const filtered = songs.filter(song =>
            song.trackName.toLowerCase().includes(text) ||
            song.artistName.toLowerCase().includes(text)
        );

        renderSongs(filtered);
    })

    mostrarSongs();
    setTimeout(() => {
        document.getElementById("loading").style.display = "none";
    }, 1000);
});

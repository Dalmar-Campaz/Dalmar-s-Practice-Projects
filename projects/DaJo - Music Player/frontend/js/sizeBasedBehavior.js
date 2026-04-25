let musicBox, songsOverlay, openSongsBtn, playerBox, closePlayer;

export function initUI() {
    musicBox = document.getElementById("music-box");
    songsOverlay = document.getElementById("songs-overlay");
    openSongsBtn = document.getElementById("show-songs-btn");
    playerBox = document.getElementById("player-box");
    closePlayer = document.getElementById("close-player");

    openSongsBtn.addEventListener('click', toggleSongsMenu);
    songsOverlay.addEventListener('click', toggleSongsMenu);
    closePlayer.addEventListener('click', () => {
        playerBox.classList.add("hidden");
    });

    window.addEventListener("resize", sizeBasedBehavior);

    sizeBasedBehavior();
}

export function toggleSongsMenu() {
    musicBox.classList.toggle("hidden");
    openSongsBtn.classList.toggle("hidden");
    songsOverlay.classList.toggle("hidden");
}

export function togglePlayer() {
    playerBox.classList.toggle("hidden");
}

function sizeBasedBehavior() {
    const width = window.innerWidth;
    const height = window.innerHeight

    document.getElementById("volume-bar-box").classList.add("hidden");
    songsOverlay.classList.add("hidden");

    if (width <= 920 && width > 450) {
        closePlayer.classList.add("hidden");
        musicBox.classList.add("hidden");
        openSongsBtn.classList.remove("hidden");
        playerBox.classList.remove("hidden");

    } else if (width <= 450) {
        closePlayer.classList.remove("hidden");
        playerBox.classList.add("hidden");
        musicBox.classList.remove("hidden");
        openSongsBtn.classList.add("hidden");

    } else {
        closePlayer.classList.add("hidden");
        openSongsBtn.classList.add("hidden");
        musicBox.classList.remove("hidden");
        playerBox.classList.remove("hidden");
    }
}
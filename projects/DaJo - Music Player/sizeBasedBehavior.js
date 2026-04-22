const musicBox = document.getElementById("music-box");
const songsOverlay = document.getElementById("songs-overlay");
const openSongsBtn = document.getElementById("show-songs-btn");
const playerBox = document.getElementById("player-box");
const closePlayer = document.getElementById("close-player");

function sizeBasedBehavior() {
    const width = window.innerWidth;
    songsOverlay.classList.add("hidden")
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
window.addEventListener("load", () => {
    sizeBasedBehavior();
    document.body.classList.remove("preload");
})

window.addEventListener("resize", () => {
    songsOverlay.classList.add("hidden")
    sizeBasedBehavior();
})
export function toggleSongsMenu() {
    musicBox.classList.toggle("hidden");
    openSongsBtn.classList.toggle("hidden");
    songsOverlay.classList.toggle("hidden");
}
export function togglePlayer() {
    playerBox.classList.toggle("hidden");
}

openSongsBtn.addEventListener('click', () => {
    toggleSongsMenu();
})

songsOverlay.addEventListener('click', () => {
    toggleSongsMenu();
})

closePlayer.addEventListener('click', () => {
    playerBox.classList.add("hidden");
})
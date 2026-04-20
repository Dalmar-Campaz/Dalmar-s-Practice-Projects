const btn = document.getElementById("pp");

function playPause () {
    if (btn.classList.contains("fa-play")) {
        btn.classList.remove("fa-play")
        btn.classList.add("fa-pause")
    } else {
        btn.classList.remove("fa-pause")
        btn.classList.add("fa-play")
    }
}
btn.addEventListener('click', () => {
    playPause();
})
const btn = document.getElementById("pp");

btn.addEventListener('click', () => {
    if (btn.classList.contains("fa-play")) {
        btn.classList.remove("fa-play")
        btn.classList.add("fa-pause")
    } else {
        btn.classList.remove("fa-pause")
        btn.classList.add("fa-play")
    }
})
const shortSideBar = document.getElementById("short-sb");
const sideBar = document.getElementById("side-bar");
const menu = document.getElementById("hamburger-menu");
const videosContainer = document.getElementById('videos-container');
const tags = document.getElementById('tags');

menu.addEventListener('click', () => {
    sideBar.classList.toggle('active');
    shortSideBar.classList.toggle('active');
    videosContainer.classList.toggle('active');
    tags.classList.toggle('active');
});
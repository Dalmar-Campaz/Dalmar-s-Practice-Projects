document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const hamburger = document.getElementById('hamburger');
    const menu = document.getElementById('menu');
    const menuOverlay = document.getElementById('menu-overlay');
    const filterBtn = document.getElementById('filter-btn');
    const filterPanel = document.getElementById('filter-panel');

    // Toggle menu
    function toggleMenu() {
        hamburger.classList.toggle('active');
        menu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', toggleMenu);

    // Toggle filter panel
    filterBtn.addEventListener('click', () => {
        filterPanel.classList.toggle('active');
    });

    // Close filter panel when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-container')) {
            filterPanel.classList.remove('active');
        }
    });

    // Prevent filter panel from closing when clicking inside
    filterPanel.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});
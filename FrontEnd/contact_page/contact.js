document.addEventListener("DOMContentLoaded", function () {
    // Your Office Latitude & Longitude
    const officeCoords = [32.99027949083207, -96.75144103994629]; // Change this to your location

    // Initialize the Map
    const map = L.map('map').setView(officeCoords, 14);

    const navLinks = document.querySelectorAll(".nav-menu a");

    // Add event listeners to each link for redirection
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default anchor behavior

            const page = this.getAttribute("href"); // Get the href value
            if (page) {
                window.location.href = page; // Redirect to the respective page
            }
        });
    });

    // Load OpenStreetMap Tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add Marker
    L.marker(officeCoords).addTo(map)
        .bindPopup("<b>We're</b><br>Here :)")
        .openPopup();
});

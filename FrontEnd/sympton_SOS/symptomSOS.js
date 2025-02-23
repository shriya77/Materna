document.addEventListener("DOMContentLoaded", function() {
    // Select all navigation links
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
});

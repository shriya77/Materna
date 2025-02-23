document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const recipeCards = document.querySelectorAll(".recipe-card");
    const foodItems = document.querySelectorAll(".food-item");
    const popup = document.getElementById("popup");
    const popupTitle = document.getElementById("popup-title");
    const popupText = document.getElementById("popup-text");
    const closeButton = document.getElementById("popup-close");
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

    console.log("Food items found:", foodItems.length); // Debugging

    let activeFilters = new Set(); // Store selected filters

    // ✅ Recipe filter logic
    filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const filter = this.getAttribute("data-filter");

            if (activeFilters.has(filter)) {
                activeFilters.delete(filter);
                this.classList.remove("active");
            } else {
                activeFilters.add(filter);
                this.classList.add("active");
            }

            applyFilters();
        });
    });

    function applyFilters() {
        if (activeFilters.size === 0) {
            recipeCards.forEach(card => card.style.display = "block");
        } else {
            recipeCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                card.style.display = activeFilters.has(cardCategory) ? "block" : "none";
            });
        }
    }

    // ✅ Open Popup Function
    function openPopup(title, text) {
        console.log("Opening Popup:", title, text);

        if (popupTitle && popupText && popup) {
            popupTitle.innerText = title;
            popupText.innerHTML = text;
            popup.style.display = 'flex';
        } else {
            console.error("Popup elements not found!");
        }
    }

    // ✅ Close Popup Function
    function closePopup() {
        console.log("Closing Popup");
        if (popup) {
            popup.style.display = 'none';
        }
    }

    // ✅ Attach click event to food items
    foodItems.forEach(item => {
        item.addEventListener("click", function () {
            const title = this.innerText.trim() || "Food Item"; // Fix: Get the text inside the div
            const description = this.getAttribute("onclick").match(/'([^']*)'/g)?.[1] || "No description available.";
            openPopup(title, description);
        });
    });

    // ✅ Ensure the close button works
    if (closeButton) {
        closeButton.addEventListener("click", function (event) {
            event.stopPropagation();
            closePopup();
        });
    }

    // ✅ Close popup when clicking outside of it
    if (popup) {
        popup.addEventListener("click", function (event) {
            if (event.target === popup) {
                closePopup();
            }
        });
    }
});

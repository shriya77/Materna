document.addEventListener("DOMContentLoaded", function () {
    const recipes = [
        "WellnessHub_P1R1.html",
        "WellnessHub_P2R2.html",
        "WellnessHub_P3R3.html",
        "WellnessHub_P4R4.html",
        "WellnessHub_P5R5.html",
        "WellnessHub_P6R6.html"
    ];

    // Ensure correct path based on location
    const basePath = "../WellnessHub_RecipieCard/";  // Adjust as needed

    const currentPage = window.location.pathname.split("/").pop();
    const currentIndex = recipes.findIndex(page => currentPage.includes(page.split("/").pop()));

    // Select the correct buttons
    const backButton = document.querySelector(".back-button");
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");

    // Fix Back Button (return to main page)
    if (backButton) {
        backButton.addEventListener("click", function () {
            window.location.href = basePath + "../WellnessHub_Main/WellnessHub.html";
        });
    }
    

    if (prevButton) {
        if (currentIndex > 0) {
            prevButton.addEventListener("click", function () {
                window.location.href = basePath + recipes[currentIndex - 1];
            });
        } else {
            prevButton.classList.add("disabled");
            prevButton.disabled = true;
        }
    }

    // Next Button
    if (nextButton) {
        if (currentIndex < recipes.length - 1) {
            nextButton.addEventListener("click", function () {
                window.location.href = basePath + recipes[currentIndex + 1];
            });
        } else {
            nextButton.classList.add("disabled");
            nextButton.disabled = true;
        }
    }
}
);

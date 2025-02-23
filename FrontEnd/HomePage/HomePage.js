document.addEventListener("DOMContentLoaded", function() {
    // Select all navigation links
    const navLinks = document.querySelectorAll(".nav-menu a");

    // Add event listeners to each link
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent default anchor behavior

            const page = this.getAttribute("href"); // Get the href value
            if (page) {
                window.location.href = page; // Redirect to the respective page
            }
        });
    });

    // Handle Symptom SOS button click
    document.getElementById("sos-btn").addEventListener("click", function() {
        window.location.href = "../sympton_SOS/symptomSOS.html"; // Redirect to Symptom SOS page
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotContainer = document.getElementById("chatbot-container");
    const chatbotClose = document.getElementById("chatbot-close");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotSend = document.getElementById("chatbot-send");
    const chatbotMessages = document.getElementById("chatbot-messages");

    // Toggle Chatbot
    chatbotToggle.addEventListener("click", function () {
        chatbotContainer.style.display = chatbotContainer.style.display === "none" ? "flex" : "none";
    });

    // Close Chatbot
    chatbotClose.addEventListener("click", function () {
        chatbotContainer.style.display = "none";
    });

    // Send Message
    chatbotSend.addEventListener("click", function () {
        sendMessage();
    });

    chatbotInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message === "") return;

    appendMessage("You", message);
    chatbotInput.value = "";

    fetch("http://127.0.0.1:5000/chatbot", {  // Make sure this URL is correct
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message })
    })
    .then(response => response.json())
    .then(data => {
        appendMessage("Materna AI", data.response);
    })
    .catch(error => {
        console.error("API Error:", error);  // Debugging
        appendMessage("Materna AI", "Sorry, something went wrong.");
    });
}


    function appendMessage(sender, message) {
        const messageDiv = document.createElement("div");
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
});

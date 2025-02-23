document.addEventListener("DOMContentLoaded", function () {
    const signupBtn = document.getElementById("signup-btn");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");

    // Securely store users using localStorage (DO NOT store real passwords in plain text in production)
    function hashPassword(password) {
        return btoa(password); // Basic hashing (convert to Base64) - use a stronger hashing in production
    }

    // Signup function
    function signUp() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Please enter both email and password.");
            return;
        }

        if (localStorage.getItem(email)) {
            alert("User already exists! Try logging in.");
            return;
        }

        // Store user credentials
        const hashedPassword = hashPassword(password);
        localStorage.setItem(email, hashedPassword);

        alert("Signup successful! You can now log in.");
    }

    // Login function
    function login() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const storedPassword = localStorage.getItem(email);

        if (!storedPassword || storedPassword !== hashPassword(password)) {
            alert("Invalid email or password!");
            return;
        }

        // Save session (user is logged in)
        sessionStorage.setItem("loggedInUser", email);
        alert("Login successful!");
        window.location.href = "mypreg.html"; // Redirect after login
    }

    // Logout function
    function logout() {
        sessionStorage.removeItem("loggedInUser");
        alert("Logged out successfully!");
        window.location.href = "auth.html"; // Redirect to login
    }

    // Event listeners
    signupBtn.addEventListener("click", signUp);
    loginBtn.addEventListener("click", login);
    logoutBtn.addEventListener("click", logout);

    // Show logout button if user is logged in
    if (sessionStorage.getItem("loggedInUser")) {
        logoutBtn.style.display = "block";
    }
});

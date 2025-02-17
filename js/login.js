document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const messageContainer = document.getElementById("message-container");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent default form submission

            // Get input values
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            // Validation: Ensure email and password are provided
            if (!email || !password) {
                displayMessage("error", "Please fill in all fields.");
                return;
            }

            // Construct request data
            const requestData = { email, password };

            // API URL
            const apiUrl = "https://v2.api.noroff.dev/auth/login";

            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestData)
                });

                const responseData = await response.json();

                if (response.ok) {
                    // Save user details & token to localStorage
                    localStorage.setItem("token", responseData.data.accessToken);
                    localStorage.setItem("username", responseData.data.name);
                    localStorage.setItem("email", responseData.data.email);

                    displayMessage("success", "Login successful! Redirecting in 2 seconds...");
                    
                    setTimeout(() => {
                        window.location.href = "/index.html"; 
                    }, 2000);
                } else {
                    displayMessage("error", responseData.errors ? responseData.errors[0].message : "Invalid credentials. Please try again.");
                }
            } catch (error) {
                displayMessage("error", "An error occurred. Please try again.");
                console.error("Login Error:", error);
            }
        });
    }

    // Function to display messages dynamically
    function displayMessage(type, text) {
        messageContainer.innerHTML = `<p class="${type}">${text}</p>`;
        messageContainer.style.display = "block";
    }
});
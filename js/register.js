document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const messageContainer = document.getElementById("message-container");

    if (registerForm) {
        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault(); 

            // Get input 
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            // check if username type is correct
            if (!/^[a-zA-Z0-9_]+$/.test(name)) {
                displayMessage("error", "Username can only contain letters, numbers, and underscores (_). Spaces are NOT allowed.");
                return;
            }

            // check if mail type is correct
            if (!/^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/.test(email)) {
                displayMessage("error", "You must use a valid stud.noroff.no email address.");
                return;
            }

            // Check the lenght of the password
            if (password.length < 8) {
                displayMessage("error", "Password must be at least 8 characters long.");
                return;
            }

            const requestData = { name, email, password };

            // API URL
            const apiUrl = "https://v2.api.noroff.dev/auth/register";

            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(requestData)
                });

                const responseData = await response.json();

                if (response.ok) {
                    displayMessage("success", "Registration successful! Redirecting in 2 seconds...");
                    setTimeout(() => {
                        window.location.href = "/account/login.html"; // Redirect after 2-3 sec
                    }, 2000);
                } else {
                    displayMessage("error", responseData.errors ? responseData.errors[0].message : responseData.message);
                }
            } catch (error) {
                displayMessage("error", "An error occurred. Please try again.");
                console.error("Registration Error:", error);
            }
        });
    }
    // Function to display messages to the user and admin
    function displayMessage(type, text) {
        messageContainer.innerHTML = `<p class="${type}">${text}</p>`;
        messageContainer.style.display = "block";
    }
});
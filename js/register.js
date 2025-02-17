document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("register-form");
    const messageContainer = document.getElementById("message-container");

    if (registerForm) {
        registerForm.addEventListener("submit", async function (event) {
            event.preventDefault(); // Prevent default form submission

            // Get input values
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value.trim();

            // Validation: Check username format (letters, numbers, and underscores only)
            if (!/^[a-zA-Z0-9_]+$/.test(name)) {
                displayMessage("error", "Username can only contain letters, numbers, and underscores (_). Spaces are NOT allowed.");
                return;
            }

            // Validation: Check email format (@stud.noroff.no required)
            if (!/^[a-zA-Z0-9._%+-]+@stud\.noroff\.no$/.test(email)) {
                displayMessage("error", "You must use a valid stud.noroff.no email address.");
                return;
            }

            // Validation: Check password length
            if (password.length < 8) {
                displayMessage("error", "Password must be at least 8 characters long.");
                return;
            }

            // Construct request data
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
                        window.location.href = "/account/login.html"; // Redirect after 2 seconds
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
    // Function to display messages dynamically
    function displayMessage(type, text) {
        messageContainer.innerHTML = `<p class="${type}">${text}</p>`;
        messageContainer.style.display = "block";
    }
});
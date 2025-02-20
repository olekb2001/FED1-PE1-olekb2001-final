document.addEventListener("DOMContentLoaded", function () {
    const registerContainer = document.getElementById("register-container");
    const loginContainer = document.getElementById("login-container");
    const logoutContainer = document.getElementById("logout-container");
    const createPostContainer = document.getElementById("create-post-container");

    const token = localStorage.getItem("token"); 

    if (token) {
        
        if (registerContainer) registerContainer.style.display = "none";
        if (loginContainer) loginContainer.style.display = "none";

        
        if (logoutContainer) logoutContainer.style.display = "block";
        if (createPostContainer) createPostContainer.style.display = "block";
    } else {
        
        if (registerContainer) registerContainer.style.display = "block";
        if (loginContainer) loginContainer.style.display = "block";

        
        if (logoutContainer) logoutContainer.style.display = "none";
        if (createPostContainer) createPostContainer.style.display = "none";
    }
    if (logoutContainer) {
        logoutContainer.addEventListener("click", function () {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("email");

            window.location.href = "/account/login.html"; 
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You must be logged in to create a post!");
        window.location.href = "/account/login.html"; 
    }
});
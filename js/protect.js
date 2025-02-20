document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    if (!token) {
        alert("You must be logged in to create a post!");
        window.location.href = "/account/login.html"; 
    }
});
// This snippet is from the protect.js file. It checks if the user is logged in by checking if there is a token in the local storage. If there is no token, the user is alerted that they must be logged in to create a post and then redirected to the login page. This is a good way to protect the create post functionality from unauthorized users.
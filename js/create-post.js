document.addEventListener("DOMContentLoaded", function () {
    const createPostForm = document.getElementById("create-post-form");
    const messageContainer = document.getElementById("message-container");
    
    createPostForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent page reload

        // Get  inpu
        const title = document.getElementById("title").value.trim();
        const body = document.getElementById("body").value.trim();
        const mediaUrl = document.getElementById("media-url").value.trim();
        const token = localStorage.getItem("token"); // Get token for auth
        const username = localStorage.getItem("username"); // Get username 

        // Check if is logged in
        if (!token || !username) {
            messageContainer.innerHTML = `<span style="color: red;">Error: You must be logged in to create a post.</span>`;
            return;
        }
        const postData = {
            title,
            body,
            media: mediaUrl ? { url: mediaUrl, alt: title } : undefined
        };

        // API URL
        const apiUrl = `https://v2.api.noroff.dev/blog/posts/${username}`;

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Send token for auth
                },
                body: JSON.stringify(postData)
            });

            const responseData = await response.json();

            if (response.ok) {
                messageContainer.innerHTML = `<span style="color: green;">Post created successfully! Redirecting...</span>`;
                setTimeout(() => {
                    window.location.href = "/index.html"; // Redirect to the Blog Feed after 2 sec
                }, 2000);
            } else {
                messageContainer.innerHTML = `<span style="color: red;">Error: ${responseData.errors ? responseData.errors[0].message : "Something went wrong"}</span>`;
            }
        } catch (error) {
            messageContainer.innerHTML = `<span style="color: red;">An error occurred. Please try again.</span>`;
            console.error("Error creating post:", error);
        }
    });
});
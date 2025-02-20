document.addEventListener("DOMContentLoaded", async function () {
    const editForm = document.getElementById("edit-post-form");
    const deleteBtn = document.getElementById("delete-btn");
    const messageContainer = document.getElementById("message-container");

    // Get post ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) {
        messageContainer.innerHTML = "<p style='color: red;'>Error: No post found.</p>";
        return;
    }

    const username = "Ole_Kristian"; 
    const token = localStorage.getItem("token"); // Ensure user is logged in
    const apiUrl = `https://v2.api.noroff.dev/blog/posts/${username}/${postId}`;

    if (!token) {
        messageContainer.innerHTML = "<p style='color: red;'>You must be logged in to edit posts.</p>";
        return;
    }

    // 🔹 Load post data
    async function loadPost() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Post not found");

            const data = await response.json();
            const post = data.data;

            document.getElementById("title").value = post.title;
            document.getElementById("body").value = post.body;
            document.getElementById("media-url").value = post.media?.url || "";

        } catch (error) {
            messageContainer.innerHTML = `<p style='color: red;'>Error loading post: ${error.message}</p>`;
            console.error("Error fetching post:", error);
        }
    }

    loadPost(); // Load the post when the page loads

    // 🔹 Handle form submission (Update Post)
    editForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent page reload

        const updatedPost = {
            title: document.getElementById("title").value.trim(),
            body: document.getElementById("body").value.trim(),
            media: {
                url: document.getElementById("media-url").value.trim(),
                alt: document.getElementById("title").value.trim(),
            }
        };

        try {
            const response = await fetch(apiUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedPost)
            });

            if (!response.ok) throw new Error("Failed to update post");

            messageContainer.innerHTML = "<p style='color: green;'>Post updated successfully!</p>";

            setTimeout(() => {
                window.location.href = `/post/index.html?id=${postId}`; // Redirect to post page
            }, 2000);

        } catch (error) {
            messageContainer.innerHTML = `<p style='color: red;'>Error updating post: ${error.message}</p>`;
            console.error("Error updating post:", error);
        }
    });

    // 🔹 Handle delete post
    deleteBtn.addEventListener("click", async function () {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            const response = await fetch(apiUrl, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error("Failed to delete post");

            messageContainer.innerHTML = "<p style='color: green;'>Post deleted successfully!</p>";

            setTimeout(() => {
                window.location.href = "/index.html"; // Redirect to homepage after deletion
            }, 2000);

        } catch (error) {
            messageContainer.innerHTML = `<p style='color: red;'>Error deleting post: ${error.message}</p>`;
            console.error("Error deleting post:", error);
        }
    });
});

document.addEventListener("DOMContentLoaded", async function () {
    const postContainer = document.getElementById("post-container");
    const postActions = document.getElementById("post-actions");

    // 🔹 Get post ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) {
        postContainer.innerHTML = "<p>Error: No post found.</p>";
        return;
    }

    const username = "Ole_Kristian"; 
    const apiUrl = `https://v2.api.noroff.dev/blog/posts/${username}/${postId}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Post not found");

        const data = await response.json();
        const post = data.data;

        postContainer.innerHTML = `
            <article class="post">
                <h1>${post.title}</h1>
                <img src="${post.media?.url || 'https://via.placeholder.com/800x400'}" alt="${post.title}">
                <p>${post.body}</p>
                <p><strong>Published:</strong> ${new Date(post.created).toLocaleDateString()}</p>
            </article>
        `;

        // 🔹 Check if user is logged in
        const token = localStorage.getItem("token");
        if (token) {
            postActions.innerHTML = `
                <a href="/post/edit.html?id=${postId}" class="edit-post-btn">Edit Post</a>
            `;
        }

    } catch (error) {
        postContainer.innerHTML = `<p>Error loading post: ${error.message}</p>`;
        console.error("Error fetching post:", error);
    }
});
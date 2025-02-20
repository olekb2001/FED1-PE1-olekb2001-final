document.addEventListener("DOMContentLoaded", async function () {
    const postContainer = document.getElementById("post-container");
    const postActions = document.createElement("div"); 
    postActions.classList.add("post-actions");

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

        const shareButton = document.createElement("button");
        shareButton.innerText = "Share Post";
        shareButton.classList.add("share-btn");

        shareButton.addEventListener("click", () => {
            const postUrl = window.location.href;
            navigator.clipboard.writeText(postUrl).then(() => {
                alert("Post URL copied to clipboard!");
            });
        });

        postActions.appendChild(shareButton); 

        const token = localStorage.getItem("token");
        const loggedInUser = localStorage.getItem("username"); 

        if (token && loggedInUser === post.author.name) {
            const editButton = document.createElement("a");
            editButton.href = `/post/edit.html?id=${postId}`;
            editButton.classList.add("edit-post-btn");
            editButton.innerText = "Edit Post";

            postActions.appendChild(editButton); 
        }

        postContainer.appendChild(postActions); 

    } catch (error) {
        postContainer.innerHTML = `<p>Error loading post: ${error.message}</p>`;
        console.error("Error fetching post:", error);
    }
});

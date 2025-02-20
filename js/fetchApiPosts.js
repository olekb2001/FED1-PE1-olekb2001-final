document.addEventListener("DOMContentLoaded", async function () {
    const username = "Ole_Kristian"; 
    const apiUrl = `https://v2.api.noroff.dev/blog/posts/${username}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        let posts = data.data;

        if (!posts || posts.length === 0) {
            console.log("No posts available.");
            return;
        }
        posts.sort((a, b) => new Date(b.created) - new Date(a.created));

        
        const latestThreePosts = posts.slice(0, 3);
        const latestTwelvePosts = posts.slice(3, 15);

        displayCarousel(latestThreePosts);
        displayGrid(latestTwelvePosts);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
});

function displayCarousel(posts) {
    const carousel = document.getElementById("carousel");
    carousel.innerHTML = ""; 

    posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("carousel-item");
        if (index === 0) postElement.classList.add("active");

        postElement.innerHTML = `
            <img src="${post.media?.url || 'https://via.placeholder.com/800x400'}" alt="${post.title}">
            <div class="carousel-caption">
                <h3>${post.title}</h3>
                <p>${post.body.substring(0, 100)}...</p>
                <a href="/post/index.html?id=${post.id}" class="read-more">Read More</a>
            </div>
        `;
        carousel.appendChild(postElement);
    });

    setupCarousel();
}

function displayGrid(posts) {
    const gridContainer = document.getElementById("blog-feed-grid");
    gridContainer.innerHTML = ""; 

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("blog-card");

        postElement.innerHTML = `
            <a href="/post/index.html?id=${post.id}">
                <img src="${post.media?.url || 'https://via.placeholder.com/300x200'}" alt="${post.title}">
                <h3>${post.title}</h3>
                <p>${post.body.substring(0, 100)}...</p>
            </a>
        `;
        gridContainer.appendChild(postElement);
    });
}

function setupCarousel() {
    let index = 0;
    const items = document.querySelectorAll(".carousel-item");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    function showSlide(n) {
        items.forEach(item => item.classList.remove("active"));
        items[n].classList.add("active");
    }

    nextBtn.addEventListener("click", () => {
        index = (index + 1) % items.length;
        showSlide(index);
    });

    prevBtn.addEventListener("click", () => {
        index = (index - 1 + items.length) % items.length;
        showSlide(index);
    });

    setInterval(() => {
        index = (index + 1) % items.length;
        showSlide(index);
    }, 5000); // Auto-slide every 5 sec
}
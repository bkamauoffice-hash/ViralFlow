// ===============================
// ViralFlow Script
// ===============================

const videos = document.querySelectorAll(".video");
const likeButtons = document.querySelectorAll(".like-btn");

// -------------------------------
// Auto Play / Pause
// -------------------------------

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        const video = entry.target;

        if (entry.isIntersecting) {

            video.play().catch(() => {});

        } else {

            video.pause();

        }

    });

}, {

    threshold: 0.75

});

videos.forEach(video => {

    observer.observe(video);

});

// -------------------------------
// Tap Video = Mute / Unmute
// -------------------------------

videos.forEach(video => {

    video.addEventListener("click", () => {

        video.muted = !video.muted;

        showToast(video.muted ? "🔇 Muted" : "🔊 Sound On");

    });

});

// -------------------------------
// Double Click = Like
// -------------------------------

videos.forEach(video => {

    video.addEventListener("dblclick", () => {

        const button = video.parentElement.querySelector(".like-btn");

        if (button) {

            button.classList.add("active");

            button.innerHTML = "❤️<span>Liked</span>";

            showToast("❤️ Liked");

        }

    });

});

// -------------------------------
// Like Button
// -------------------------------

likeButtons.forEach(button => {

    let liked = false;

    button.addEventListener("click", () => {

        liked = !liked;

        if (liked) {

            button.classList.add("active");
            button.innerHTML = "❤️<span>Liked</span>";

        } else {

            button.classList.remove("active");
            button.innerHTML = "🤍<span>Like</span>";

        }

    });

});

// -------------------------------
// Infinite Scroll Demo
// -------------------------------

const feed = document.querySelector(".feed");

feed.addEventListener("scroll", () => {

    if (

        feed.scrollTop + feed.clientHeight >=

        feed.scrollHeight - 50

    ) {

        duplicateFeed();

    }

});

function duplicateFeed() {

    const cards = document.querySelectorAll(".video-card");

    cards.forEach(card => {

        const clone = card.cloneNode(true);

        feed.appendChild(clone);

        const newVideo = clone.querySelector(".video");

        observer.observe(newVideo);

        // Reattach mute toggle
        newVideo.addEventListener("click", () => {
            newVideo.muted = !newVideo.muted;
            showToast(newVideo.muted ? "🔇 Muted" : "🔊 Sound On");
        });

        // Reattach double-click like
        newVideo.addEventListener("dblclick", () => {
            const btn = clone.querySelector(".like-btn");
            btn.classList.add("active");
            btn.innerHTML = "❤️<span>Liked</span>";
            showToast("❤️ Liked");
        });

    });

}

// -------------------------------
// Toast Message
// -------------------------------

function showToast(message) {

    let toast = document.getElementById("toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.id = "toast";

        toast.style.position = "fixed";
        toast.style.bottom = "100px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.background = "rgba(0,0,0,.75)";
        toast.style.color = "#fff";
        toast.style.padding = "12px 18px";
        toast.style.borderRadius = "20px";
        toast.style.fontSize = "14px";
        toast.style.zIndex = "9999";
        toast.style.transition = "opacity 0.3s";

        document.body.appendChild(toast);

    }

    toast.textContent = message;
    toast.style.opacity = "1";

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {

        toast.style.opacity = "0";

    }, 1500);

}

// -------------------------------
// Keyboard Controls
// -------------------------------

document.addEventListener("keydown", e => {

    const current = [...videos].find(v => !v.paused);

    if (!current) return;

    if (e.code === "Space") {

        e.preventDefault();

        if (current.paused) {

            current.play();

        } else {

            current.pause();

        }

    }

    if (e.key.toLowerCase() === "m") {

        current.muted = !current.muted;

        showToast(current.muted ? "🔇 Muted" : "🔊 Sound On");

    }

});

// -------------------------------
// Start First Video
// -------------------------------

window.addEventListener("load", () => {

    if (videos.length > 0) {

        videos[0].play().catch(() => {});

    }

});

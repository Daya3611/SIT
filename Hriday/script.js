const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 96;
const currentFrame = index => (
    `./ezgif-46f62a4b7f27dfdb-png-split/ezgif-frame-${index.toString().padStart(3, '0')}.png`
);

const preloadImages = () => {
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
    }
};

const img = new Image();
img.src = currentFrame(1);
canvas.width = 1920;
canvas.height = 1080;
img.onload = function () {
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
}

const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
}

window.addEventListener('scroll', () => {
    // The video container is the main scrolling area for the canvas animation.
    // We calculate scroll progress relative to the `.video-section`
    const videoSection = document.querySelector('.video-section');
    const sectionRect = videoSection.getBoundingClientRect();

    // Calculate how far we've scrolled inside the section
    const maxScroll = videoSection.offsetHeight - window.innerHeight;
    let scrollProgress = -sectionRect.top / maxScroll;

    if (scrollProgress < 0) scrollProgress = 0;
    if (scrollProgress > 1) scrollProgress = 1;

    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollProgress * frameCount)
    );

    requestAnimationFrame(() => updateImage(frameIndex + 1));
});

preloadImages();

// Intersection Observer for the cards sliding up
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
});

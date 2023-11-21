const galleryItems = document.querySelectorAll('.gallery-item'),
    overlay = document.querySelector('.overlay'),
    overlayImage = document.querySelector('#overlay-image'),
    closeButton = document.querySelector('#close-button');

galleryItems.forEach(item => {
    item.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default behavior of the anchor element
        const anchor = item.querySelector('a');
        const pageUrl = anchor.getAttribute('href');
        window.location.href = pageUrl;
    });
});

// Check if closeButton and overlay are not null before adding the event listener
if (closeButton && overlay) {
    closeButton.addEventListener('click', () => {
        overlay.style.display = 'none';
    });
}

const imageContainer = document.querySelector('.image-container'),
    scrollImages = function () {
        const firstImage = imageContainer.firstElementChild;
        imageContainer.appendChild(firstImage);
    };

setInterval(scrollImages, 2000);

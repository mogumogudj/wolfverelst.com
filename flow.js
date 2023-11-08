let h1 = document.querySelector("#title");
function addLol() {
    alert("hallo");
}
h1.addEventListener('click');

const galleryItems = document.querySelectorAll('.gallery-item');
const overlay = document.querySelector('.overlay');
const overlayImage = document.querySelector('#overlay-image');
const closeButton = document.querySelector('#close-button');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const anchor = item.querySelector('a');
        const pageUrl = anchor.getAttribute('href');

        // Redirect to the selected page
        window.location.href = pageUrl;
    });
});

// Close the overlay
closeButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});







const imageContainer = document.querySelector('.image-container');

function scrollImages() {
    const firstImage = imageContainer.firstElementChild;
    imageContainer.appendChild(firstImage);
}

setInterval(scrollImages, 2000); // Adjust the interval to control scrolling speed

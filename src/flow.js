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

setInterval(scrollImages, 20000);
console.log(scrollImages);

document.addEventListener('DOMContentLoaded', function () {
    const emailIcon = document.getElementById('sidebar-left-email-icon');
    const popup = document.getElementById('copyPopup');
    const emailAddress = 'wolfverelst@gmail.com'; // Replace with your actual email address

    emailIcon.addEventListener('click', function () {
        const tempInput = document.createElement('input');
        tempInput.value = emailAddress;
        document.body.appendChild(tempInput);

        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);

        // Show the styled popup
        popup.style.display = 'block';

        // Hide the popup after 2 seconds (adjust as needed)
        setTimeout(function () {
            popup.style.display = 'none';
        }, 2000);
    });
});
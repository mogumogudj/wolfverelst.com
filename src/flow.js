document.addEventListener('DOMContentLoaded', function () {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const overlay = document.querySelector('.overlay');
    const closeButton = document.querySelector('#close-button');
    const imageContainer = document.querySelector('.image-container');
    const emailIcon = document.getElementById('sidebar-left-email-icon');
    const popup = document.getElementById('copyPopup');
    const emailAddress = 'wolfverelst@gmail.com'; // Replace with your actual email address

    // Function to scroll images in the gallery
    const scrollImages = function () {
        const firstImage = imageContainer.firstElementChild;
        imageContainer.appendChild(firstImage);
    };

    // Function to handle gallery item click
    const handleGalleryItemClick = function (event) {
        event.preventDefault();
        const anchor = event.currentTarget.querySelector('a');
        const pageUrl = anchor.getAttribute('href');
        window.location.href = pageUrl;
    };

    // Event listener for gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', handleGalleryItemClick);
    });

    // Event listener for closeButton and overlay (if they exist)
    if (closeButton && overlay) {
        closeButton.addEventListener('click', () => {
            overlay.style.display = 'none';
        });
    }

    // Event listener for copying email address to clipboard
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

    // Set interval for scrolling images
    setInterval(scrollImages, 38000);
});

document.addEventListener('DOMContentLoaded', function() {
    fetch('sidebar.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('sidebarContainer').innerHTML = html;

            const toggleButton = document.getElementById('toggleSidebar');
            const sidebar = document.querySelector('#sidebarContainer .sidebar-right'); // Target the sidebar within #sidebarContainer

            if (toggleButton && sidebar) {
                toggleButton.addEventListener('click', function() {
                    sidebar.classList.toggle('show-sidebar');
                });
            } else {
                console.error('Toggle button or sidebar element not found.');
            }
        });

    const scrollImages = function() {
        const imageContainer = document.querySelector('.image-container');
        const firstImage = imageContainer.firstElementChild;
        imageContainer.appendChild(firstImage);
    };

    setInterval(scrollImages, 38000);
});









document.addEventListener('DOMContentLoaded', function () {
    const emailIcon = document.getElementById('sidebar-left-email-icon');
    const popup = document.getElementById('copyPopup');
    const emailAddress = 'wolfverelst@gmail.com'; 

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
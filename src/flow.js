






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
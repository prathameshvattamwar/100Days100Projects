document.addEventListener("DOMContentLoaded", function() {
    const loadingText = document.querySelector('.loading-text');
    const loaderWrapper = document.querySelector('.loader-wrapper');

    // Array of loading messages
    const loadingMessages = [
        "Loading...",
        "Almost there...",
        "Preparing...",
        "Just a moment...",
        "Getting things ready..."
    ];

    // Function to change the loading text
    let messageIndex = 0;
    function updateLoadingText() {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        loadingText.textContent = loadingMessages[messageIndex];
    }

    // Change text every 2 seconds
    setInterval(updateLoadingText, 2000);

    // Function to hide the loader after a delay (e.g., 10 seconds)
    function hideLoader() {
        loaderWrapper.style.transition = "opacity 1s ease-out";
        loaderWrapper.style.opacity = 0;
        setTimeout(() => {
            loaderWrapper.style.display = "none";
        }, 1000); // Match the transition duration
    }

    // Hide the loader after 10 seconds
    setTimeout(hideLoader, 10000);
});

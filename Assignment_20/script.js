// script.js
document.addEventListener('DOMContentLoaded', () => {
    const editableText = document.getElementById('editableText');
    const boldButton = document.getElementById('boldButton');
    const italicButton = document.getElementById('italicButton');
    const strikeButton = document.getElementById('strikeButton');

    // Function to apply formatting
    function formatText(command) {
        document.execCommand(command);
        editableText.focus(); // Keep focus on the editable area
    }

    // Event listeners for buttons
    boldButton.addEventListener('click', () => formatText('bold'));
    italicButton.addEventListener('click', () => formatText('italic'));
    strikeButton.addEventListener('click', () => formatText('strikeThrough'));
});
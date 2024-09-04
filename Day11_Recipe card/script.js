document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle Instructions';
    toggleButton.style.display = 'block';
    toggleButton.style.margin = '20px auto';
    toggleButton.style.padding = '10px 20px';
    toggleButton.style.backgroundColor = '#ff6b6b';
    toggleButton.style.color = '#fff';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '5px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.fontSize = '16px';
    document.querySelector('.recipe-card').appendChild(toggleButton);

    const instructions = document.querySelector('ol');
    toggleButton.addEventListener('click', function() {
        if (instructions.style.display === 'none') {
            instructions.style.display = 'block';
        } else {
            instructions.style.display = 'none';
        }
    });
});

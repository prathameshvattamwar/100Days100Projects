document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const fontStyleInput = document.getElementById('fontStyleInput');
    const fontSizeInput = document.getElementById('fontSizeInput');
    const textColorInput = document.getElementById('textColorInput');
    const colorInput1 = document.getElementById('colorInput1');
    const colorInput2 = document.getElementById('colorInput2');
    const glowInput = document.getElementById('glowInput');
    const blurInput = document.getElementById('blurInput');
    const opacityInput = document.getElementById('opacityInput');
    const flickerInput = document.getElementById('flickerInput');
    const neonText = document.getElementById('neonText');

    textInput.addEventListener('input', function() {
        neonText.textContent = textInput.value || "Prathamesh";
        neonText.setAttribute('data-text', neonText.textContent);
    });

    fontStyleInput.addEventListener('change', function() {
        neonText.style.setProperty('--font-family', fontStyleInput.value);
    });

    fontSizeInput.addEventListener('input', function() {
        neonText.style.setProperty('--font-size', fontSizeInput.value + 'px');
    });

    textColorInput.addEventListener('input', function() {
        neonText.style.setProperty('--text-color', textColorInput.value);
    });

    colorInput1.addEventListener('input', updateNeonEffect);
    colorInput2.addEventListener('input', updateNeonEffect);
    glowInput.addEventListener('input', updateNeonEffect);
    blurInput.addEventListener('input', updateNeonEffect);
    opacityInput.addEventListener('input', updateNeonEffect);
    flickerInput.addEventListener('input', function() {
        neonText.style.setProperty('--flicker-speed', flickerInput.value + 's');
    });

    function updateNeonEffect() {
        neonText.style.setProperty('--color1', colorInput1.value);
        neonText.style.setProperty('--color2', colorInput2.value);
        neonText.style.setProperty('--glow-intensity', glowInput.value + 'px');
        neonText.style.setProperty('--blur', blurInput.value + 'px');
        neonText.style.setProperty('--opacity', opacityInput.value);
    }

    updateNeonEffect();
});

let colors = ['#ff0000', '#0000ff'];
let isExpanded = false;

const circle = document.getElementById('circle');
const options = document.getElementById('options');
const gradientPreview = document.getElementById('gradientPreview');
const colorPickers = document.getElementById('colorPickers');
const addColorBtn = document.getElementById('addColorBtn');
const removeColorBtn = document.getElementById('removeColorBtn');
const copyBtn = document.getElementById('copyBtn');
const closeBtn = document.getElementById('closeBtn');

function updateGradient() {
    const gradient = `linear-gradient(to right, ${colors.join(', ')})`;
    document.body.style.background = gradient;
    gradientPreview.style.background = gradient;
}

function renderColorPickers() {
    colorPickers.innerHTML = '';
    colors.forEach((color, index) => {
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = color;
        colorInput.classList.add('color-picker');
        colorInput.addEventListener('input', (e) => {
            colors[index] = e.target.value;
            updateGradient();
        });
        colorPickers.appendChild(colorInput);
    });
}

function toggleCircle() {
    if (!isExpanded) {
        circle.classList.remove('minimized');
        circle.classList.add('expanded');
        options.classList.remove('hidden');
        isExpanded = true;
    }
}

function closeOptions() {
    if (isExpanded) {
        circle.classList.add('minimizing');  // Add a class to handle transition
        setTimeout(() => {
            circle.classList.remove('expanded');
            circle.classList.add('minimized');
            options.classList.add('hidden');
            circle.classList.remove('minimizing');  // Clean up the transition class
            isExpanded = false;
        }, 1000);  // Delay to allow the transition to complete
    }
}

function addColor() {
    if (colors.length < 10) {  
        colors.push('#ffffff');
        renderColorPickers();
        updateGradient();
    }
}

function removeColor() {
    if (colors.length > 2) {  
        colors.pop();
        renderColorPickers();
        updateGradient();
    }
}

function copyCSS() {
    const cssCode = `background: linear-gradient(to right, ${colors.join(', ')});`;
    navigator.clipboard.writeText(cssCode).then(() => {
        alert('CSS code copied to clipboard!');
    });
}

circle.addEventListener('click', toggleCircle);
closeBtn.addEventListener('click', closeOptions);
addColorBtn.addEventListener('click', addColor);
removeColorBtn.addEventListener('click', removeColor);
copyBtn.addEventListener('click', copyCSS);

renderColorPickers();
updateGradient();

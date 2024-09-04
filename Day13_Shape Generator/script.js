function changeShape(shape) {
    const shapeElement = document.getElementById('shape');
    shapeElement.className = 'shape'; // Reset shape class
    shapeElement.style.borderRadius = ''; // Reset border radius
    shapeElement.style.transform = ''; // Reset transform

    switch(shape) {
        case 'square':
            shapeElement.classList.add('square');
            break;
        case 'circle':
            shapeElement.classList.add('circle');
            break;
        case 'triangle':
            shapeElement.classList.add('triangle');
            break;
        case 'oval':
            shapeElement.classList.add('oval');
            break;
        case 'pentagon':
            shapeElement.classList.add('pentagon');
            break;
        case 'hexagon':
            shapeElement.classList.add('hexagon');
            break;
    }
}

function changeShapeColor() {
    const shapeElement = document.getElementById('shape');
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    shapeElement.style.backgroundColor = randomColor;

    if (shapeElement.classList.contains('triangle')) {
        shapeElement.style.borderBottomColor = randomColor;
    }
}

function changeSize(size) {
    const shapeElement = document.getElementById('shape');
    shapeElement.style.width = size + 'px';
    shapeElement.style.height = size + 'px';

    // Adjust for non-square shapes
    if (shapeElement.classList.contains('oval')) {
        shapeElement.style.height = (size * 0.6) + 'px';
    }
    if (shapeElement.classList.contains('triangle')) {
        shapeElement.style.borderLeftWidth = (size / 2) + 'px';
        shapeElement.style.borderRightWidth = (size / 2) + 'px';
        shapeElement.style.borderBottomWidth = size + 'px';
        shapeElement.style.width = '0';
        shapeElement.style.height = '0';
    }
}

function changeBorderRadius(radius) {
    const shapeElement = document.getElementById('shape');
    shapeElement.style.borderRadius = radius + '%';
}

function rotateShape(degrees) {
    const shapeElement = document.getElementById('shape');
    shapeElement.style.transform = `rotate(${degrees}deg)`;
}

function scaleShape(scale) {
    const shapeElement = document.getElementById('shape');
    shapeElement.style.transform = `scale(${scale})`;
}

const image = document.getElementById('image');
const filters = {
    blur: document.getElementById('blur'),
    brightness: document.getElementById('brightness'),
    contrast: document.getElementById('contrast'),
    saturate: document.getElementById('saturate'),
    sepia: document.getElementById('sepia'),
};

const filterValues = {
    blur: 0,
    brightness: 1,
    contrast: 1,
    saturate: 1,
    sepia: 0,
};

const filterDefaults = {...filterValues};
const filterHistory = [];
let historyIndex = -1;

document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            image.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
});

Object.keys(filters).forEach(filter => {
    filters[filter].addEventListener('input', function() {
        updateFilterValue(filter);
        applyFilters();
    });
});

function updateFilterValue(filter) {
    filterValues[filter] = filters[filter].value;
    document.getElementById(`${filter}Value`).textContent = getFilterValueDisplay(filter);
    saveHistory();
}

function getFilterValueDisplay(filter) {
    switch (filter) {
        case 'blur':
            return `${filterValues.blur}px`;
        case 'brightness':
        case 'contrast':
        case 'saturate':
            return `${Math.round(filterValues[filter] * 100)}%`;
        case 'sepia':
            return `${Math.round(filterValues.sepia * 100)}%`;
        default:
            return '';
    }
}

function applyFilters() {
    const filterString = `
        blur(${filterValues.blur}px)
        brightness(${filterValues.brightness})
        contrast(${filterValues.contrast})
        saturate(${filterValues.saturate})
        sepia(${filterValues.sepia})
    `;
    image.style.filter = filterString;
}

function saveHistory() {
    if (historyIndex < filterHistory.length - 1) {
        filterHistory.splice(historyIndex + 1);
    }
    filterHistory.push({...filterValues});
    historyIndex++;
}

function undo() {
    if (historyIndex > 0) {
        historyIndex--;
        setFiltersFromHistory();
    }
}

function redo() {
    if (historyIndex < filterHistory.length - 1) {
        historyIndex++;
        setFiltersFromHistory();
    }
}

function resetAll() {
    filterValues.blur = filterDefaults.blur;
    filterValues.brightness = filterDefaults.brightness;
    filterValues.contrast = filterDefaults.contrast;
    filterValues.saturate = filterDefaults.saturate;
    filterValues.sepia = filterDefaults.sepia;

    Object.keys(filters).forEach(filter => {
        filters[filter].value = filterValues[filter];
        document.getElementById(`${filter}Value`).textContent = getFilterValueDisplay(filter);
    });

    applyFilters();
    saveHistory();
}

function setFiltersFromHistory() {
    const historyItem = filterHistory[historyIndex];
    Object.keys(historyItem).forEach(filter => {
        filterValues[filter] = historyItem[filter];
        filters[filter].value = historyItem[filter];
        document.getElementById(`${filter}Value`).textContent = getFilterValueDisplay(filter);
    });
    applyFilters();
}

function downloadImage() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    // Apply filters before drawing image onto canvas
    context.filter = `
        blur(${filterValues.blur}px)
        brightness(${filterValues.brightness})
        contrast(${filterValues.contrast})
        saturate(${filterValues.saturate})
        sepia(${filterValues.sepia})
    `;

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Create a link to download the image
    const link = document.createElement('a');
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
    link.click();
}

document.getElementById('undo').addEventListener('click', undo);
document.getElementById('redo').addEventListener('click', redo);
document.getElementById('reset').addEventListener('click', resetAll);
document.getElementById('download').addEventListener('click', downloadImage);

// Initialize first history save
saveHistory();

document.addEventListener("DOMContentLoaded", function () {
    const startTourBtn = document.getElementById("startTour");
    const colorPicker = document.getElementById("colorPicker");
    const colorName = document.getElementById("colorName");
    const addColorBtn = document.getElementById("addColor");
    const savePaletteBtn = document.getElementById("savePalette");
    const loadPaletteBtn = document.getElementById("loadPalette");
    const exportPaletteBtn = document.getElementById("exportPalette");
    const colorPalette = document.getElementById("colorPalette");
    const toggleModeBtn = document.getElementById("toggleMode");
    const previewText = document.querySelector(".preview-box p");
    const previewButton = document.querySelector(".preview-box button");
    const applyBgColorBtn = document.getElementById("applyBgColor");
    const resetBgColorBtn = document.getElementById("resetBgColor");

    let palette = [];
    let selectedColor = null;  // Track the currently selected color

    // Start the guided tour using Intro.js
    startTourBtn.addEventListener("click", function () {
        introJs().setOptions({
            steps: [
                {
                    intro: "Welcome to the Color Palette Designer! Let's take a quick tour to understand how to use this tool."
                },
                {
                    element: document.querySelector('#toggleMode'),
                    intro: "Here you can toggle between Dark and Light modes to see your colors in different themes."
                },
                {
                    element: document.querySelector('#colorPicker'),
                    intro: "First, pick a color using this color picker. You can choose any color you like."
                },
                {
                    element: document.querySelector('#colorName'),
                    intro: "Next, give your selected color a name. You can choose any name that helps you remember the color."
                },
                {
                    element: document.querySelector('#addColor'),
                    intro: "After picking a color and giving it a name, click this 'Add Color' button to add it to your palette."
                },
                {
                    element: document.querySelector('#savePalette'),
                    intro: "After adding all colors what you wants you have to click here to Save that all colors in your memory."
                },
                {
                    element: document.querySelector('#step3'),
                    intro: "Here you can see the colors you've added to your palette. If you want to remove a color, click the 'x' button on the color box."
                },
                {
                    element: document.querySelector('#savePalette'),
                    intro: "Once you've created a palette you like, click 'Save Palette' to save your colors. This saves your palette so you can load it later."
                },
                {
                    element: document.querySelector('#loadPalette'),
                    intro: "To retrieve a saved palette, click 'Load Palette'. This will bring back all the colors you previously saved."
                },
                {
                    element: document.querySelector('#exportPalette'),
                    intro: "If you want to save your palette as a text file, click 'Export Palette'. This lets you download a file with all your color names and codes."
                },
                {
                    element: document.querySelector('#step4'),
                    intro: "In this preview section, you can see how your selected colors look when applied to text and buttons."
                },
                {
                    element: document.querySelector('#applyBgColor'),
                    intro: "Want to see your color as the background? Click 'Apply Background Color' to set the last selected color as the background."
                },
                {
                    element: document.querySelector('#resetBgColor'),
                    intro: "If you want to reset the background to its original state, click 'Reset Background Color'."
                },
                {
                    intro: "That's it! You are now ready to use the Color Palette Designer. Start creating your own color palettes and enjoy!"
                }
            ]
        }).start();
    });
    

    function updatePaletteDisplay() {
        colorPalette.innerHTML = '';  // Clear current palette display
        palette.forEach((color, index) => {
            const colorBox = document.createElement('div');
            colorBox.className = 'color-box';
            colorBox.style.backgroundColor = color.color;
            
            // Create the "x" icon to remove the color
            const removeIcon = document.createElement('span');
            removeIcon.className = 'remove-icon';
            removeIcon.innerHTML = '&times;';
            
            // Add event listener to remove the color
            removeIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                palette.splice(index, 1);
                updatePaletteDisplay();
            });
            
            colorBox.appendChild(removeIcon);
            
            // Add event listener for applying color to preview and select the color
            colorBox.addEventListener('click', function() {
                previewText.style.color = color.color;
                previewButton.style.backgroundColor = color.color;
                selectedColor = color.color;  // Set the selected color
            });
            
            colorPalette.appendChild(colorBox);
        });
    }

    addColorBtn.addEventListener("click", function () {
        const color = colorPicker.value;
        const name = colorName.value || "Unnamed Color";
        palette.push({ name, color });
        updatePaletteDisplay();
        colorName.value = '';
    });

    savePaletteBtn.addEventListener("click", function () {
        localStorage.setItem('savedPalette', JSON.stringify(palette));
        alert('Palette saved!');
    });

    loadPaletteBtn.addEventListener("click", function () {
        const savedPalette = localStorage.getItem('savedPalette');
        if (savedPalette) {
            palette = JSON.parse(savedPalette);
            updatePaletteDisplay();
        } else {
            alert('No saved palette found.');
        }
    });

    exportPaletteBtn.addEventListener("click", function () {
        const paletteStr = palette.map(c => `${c.name}: ${c.color}`).join('\n');
        const blob = new Blob([paletteStr], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'palette.txt';
        link.click();
    });

    toggleModeBtn.addEventListener("click", function () {
        document.body.classList.toggle('light-mode');
    });

    applyBgColorBtn.addEventListener("click", function () {
        if (selectedColor) {
            document.body.style.backgroundColor = selectedColor;
        } else {
            alert("Please select a color from the palette first!");
        }
    });

    resetBgColorBtn.addEventListener("click", function () {
        document.body.style.backgroundColor = '';
        selectedColor = null;  // Clear the selected color
    });

    updatePaletteDisplay();
});

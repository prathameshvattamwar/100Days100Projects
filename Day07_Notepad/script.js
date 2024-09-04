document.getElementById('add-note').addEventListener('click', addNote);
document.getElementById('toggle-mode').addEventListener('click', toggleMode);

let noteCounter = 0; // To handle unique IDs for each note
let currentZIndex = 100; // Initial z-index for notes

// Load notes from local storage on page load
window.onload = function() {
    loadNotesFromStorage();
};

function addNote(content = '', top = null, left = null, backgroundColor = 'white', textColor = 'black') {
    const notesContainer = document.querySelector('.notes-container');
    const note = document.createElement('div');
    note.classList.add('notepad');
    note.setAttribute('id', `note-${++noteCounter}`); // Assign a unique ID

    if (top !== null && left !== null) {
        note.style.top = top;
        note.style.left = left;
    } else {
        note.style.top = `${noteCounter * 10}px`; // Slight offset for each note
        note.style.left = `${noteCounter * 10}px`;
    }

    note.style.backgroundColor = backgroundColor;
    note.style.color = textColor;
    note.style.zIndex = currentZIndex;

    note.innerHTML = `
        <div class="drag-handle" style="cursor: move;"><i class="fas fa-grip-lines"></i></div>
        <textarea style="color: ${textColor}">${content}</textarea>
        <div class="buttons">
            <i class="fas fa-save btn-icon" onclick="saveNote(this)"></i>
            <i class="fas fa-edit btn-icon" onclick="editNote(this)"></i>
            <i class="fas fa-trash btn-icon" onclick="deleteNote(this)"></i>
            <i class="fas fa-copy btn-icon" onclick="copyNote(this)"></i>
            <i class="fas fa-download btn-icon" onclick="downloadNote(this)"></i>
            <i class="fas fa-palette btn-icon" onclick="toggleColorPicker(this)"></i>
        </div>
        <input type="color" class="color-picker background-color-picker" style="display: none;" onchange="changeBackgroundColor(this)">
        <input type="color" class="color-picker text-color-picker" style="display: none; margin-left: 10px;" onchange="changeTextColor(this)">
    `;
    notesContainer.appendChild(note);
    makeDraggable(note);
    saveNotesToStorage();
}

function saveNote(button) {
    const note = button.closest('.notepad');
    const textarea = note.querySelector('textarea');
    const content = textarea.value;  // Capture the content before replacing innerHTML
    note.innerHTML = `
        <div class="drag-handle" style="cursor: move;"><i class="fas fa-grip-lines"></i></div>
        <div class="content" style="color: ${note.style.color}">${content}</div>
        <div class="timestamp">${getCurrentDateTime()}</div>
        <div class="buttons">
            <i class="fas fa-edit btn-icon" onclick="editNote(this)"></i>
            <i class="fas fa-trash btn-icon" onclick="deleteNote(this)"></i>
            <i class="fas fa-copy btn-icon" onclick="copyNote(this)"></i>
            <i class="fas fa-download btn-icon" onclick="downloadNote(this)"></i>
            <i class="fas fa-palette btn-icon" onclick="toggleColorPicker(this)"></i>
        </div>
        <input type="color" class="color-picker background-color-picker" style="display: none;" onchange="changeBackgroundColor(this)">
        <input type="color" class="color-picker text-color-picker" style="display: none; margin-left: 10px;" onchange="changeTextColor(this)">
    `;
    makeDraggable(note);
    saveNotesToStorage();
}

function editNote(button) {
    const note = button.closest('.notepad');
    const content = note.querySelector('.content').innerText;  // Extract text content safely
    note.innerHTML = `
        <div class="drag-handle" style="cursor: move;"><i class="fas fa-grip-lines"></i></div>
        <textarea style="color: ${note.style.color}">${content}</textarea>
        <div class="buttons">
            <i class="fas fa-save btn-icon" onclick="saveNote(this)"></i>
            <i class="fas fa-edit btn-icon" onclick="editNote(this)"></i>
            <i class="fas fa-trash btn-icon" onclick="deleteNote(this)"></i>
            <i class="fas fa-copy btn-icon" onclick="copyNote(this)"></i>
            <i class="fas fa-download btn-icon" onclick="downloadNote(this)"></i>
            <i class="fas fa-palette btn-icon" onclick="toggleColorPicker(this)"></i>
        </div>
        <input type="color" class="color-picker background-color-picker" style="display: none;" onchange="changeBackgroundColor(this)">
        <input type="color" class="color-picker text-color-picker" style="display: none; margin-left: 10px;" onchange="changeTextColor(this)">
    `;
    saveNotesToStorage();
}

function deleteNote(button) {
    const note = button.closest('.notepad');
    note.remove();
    saveNotesToStorage();
}

function copyNote(button) {
    const note = button.closest('.notepad');
    const clone = note.cloneNode(true);
    const offset = 20; // Offset new note position by 20px
    const rect = note.getBoundingClientRect();
    clone.style.top = `${rect.top + offset}px`;
    clone.style.left = `${rect.left + offset}px`;
    note.parentElement.appendChild(clone);
    makeDraggable(clone);
    saveNotesToStorage();
}

function downloadNote(button) {
    const note = button.closest('.notepad');
    const content = note.querySelector('.content').innerText;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "note.txt";
    link.click();
}

function toggleColorPicker(button) {
    const note = button.closest('.notepad');
    const backgroundColorPicker = note.querySelector('.background-color-picker');
    const textColorPicker = note.querySelector('.text-color-picker');

    backgroundColorPicker.style.display = backgroundColorPicker.style.display === 'block' ? 'none' : 'block';
    textColorPicker.style.display = textColorPicker.style.display === 'block' ? 'none' : 'block';
}

function changeBackgroundColor(input) {
    const note = input.closest('.notepad');
    note.style.backgroundColor = input.value;
    saveNotesToStorage();
}

function changeTextColor(input) {
    const note = input.closest('.notepad');
    note.style.color = input.value;
    const contentElement = note.querySelector('.content');
    const textareaElement = note.querySelector('textarea');
    
    if (contentElement) {
        contentElement.style.color = input.value;
    } else if (textareaElement) {
        textareaElement.style.color = input.value;
    }
    
    saveNotesToStorage();
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
}

function makeDraggable(element) {
    let isDragging = false;
    let xOffset = 0, yOffset = 0;

    const dragHandle = element.querySelector('.drag-handle');

    dragHandle.onmousedown = function (e) {
        isDragging = true;
        element.style.zIndex = ++currentZIndex; // Bring the element to the top
        xOffset = e.clientX - element.offsetLeft;
        yOffset = e.clientY - element.offsetTop;

        // Prevent default action to avoid text selection or other default behaviors
        e.preventDefault();
    };

    document.onmousemove = function (e) {
        if (isDragging) {
            const maxX = window.innerWidth - element.offsetWidth;
            const maxY = window.innerHeight - element.offsetHeight;
            let newLeft = e.clientX - xOffset;
            let newTop = e.clientY - yOffset;
            
            // Prevent dragging out of bounds
            if (newLeft < 0) newLeft = 0;
            if (newTop < 0) newTop = 0;
            if (newLeft > maxX) newLeft = maxX;
            if (newTop > maxY) newTop = maxY;

            element.style.left = `${newLeft}px`;
            element.style.top = `${newTop}px`;
            element.style.position = 'absolute';
        }
    };

    document.onmouseup = function () {
        if (isDragging) {
            isDragging = false;
            saveNotesToStorage();
        }
    };
}

function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString('en-GB');
    const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    return `${date} ${time}`;
}

function saveNotesToStorage() {
    const notes = document.querySelectorAll('.notepad');
    const notesData = [];

    notes.forEach(note => {
        const content = note.querySelector('.content') ? note.querySelector('.content').innerText : note.querySelector('textarea').value;
        const top = note.style.top;
        const left = note.style.left;
        const backgroundColor = note.style.backgroundColor;
        const textColor = note.style.color;
        notesData.push({ content, top, left, backgroundColor, textColor });
    });

    localStorage.setItem('notes', JSON.stringify(notesData));
}

function loadNotesFromStorage() {
    const notesData = JSON.parse(localStorage.getItem('notes')) || [];

    notesData.forEach(noteData => {
        addNote(noteData.content, noteData.top, noteData.left, noteData.backgroundColor, noteData.textColor);
    });
}

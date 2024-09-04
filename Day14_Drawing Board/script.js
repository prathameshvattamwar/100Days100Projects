$(document).ready(function() {
    const canvas = new fabric.Canvas('drawingBoard');
    let gridVisible = true;
    let isDrawingMode = false;
    let state = [];
    let mods = 0;

    function resizeCanvas() {
        canvas.setHeight(window.innerHeight - 60);
        canvas.setWidth(window.innerWidth);
        canvas.renderAll();
    }

    resizeCanvas();

    function saveState() {
        state.push(JSON.stringify(canvas));
        mods = state.length - 1;
    }

    saveState();

    function resetEventHandlers() {
        canvas.off('mouse:down');
        canvas.off('mouse:move');
        canvas.off('mouse:up');
        canvas.isDrawingMode = false;
    }

    function disableTextInput() {
        $("#textInput").hide();
        $("#fontSize").hide();
        canvas.isDrawingMode = false;
    }

    $("#draw").on('click', function() {
        resetEventHandlers();
        disableTextInput();
        isDrawingMode = true;
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
        canvas.freeDrawingBrush.color = $("#colorPicker").val();
        canvas.freeDrawingBrush.width = parseInt($("#brushSize").val(), 10);
    });

    $("#erase").on('click', function() {
        resetEventHandlers();
        disableTextInput();
        canvas.on('mouse:down', function(options) {
            if (options.target) {
                canvas.remove(options.target);
                saveState();
            }
        });
    });

    $("#rect").on('click', function() {
        resetEventHandlers();
        disableTextInput();
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: $("#colorPicker").val(),
            width: 100,
            height: 100,
            selectable: true
        });
        canvas.add(rect);
        saveState();
    });

    $("#circle").on('click', function() {
        resetEventHandlers();
        disableTextInput();
        const circle = new fabric.Circle({
            left: 100,
            top: 100,
            fill: $("#colorPicker").val(),
            radius: 50,
            selectable: true
        });
        canvas.add(circle);
        saveState();
    });

    $("#drawLine").on('click', function() {
        resetEventHandlers();
        disableTextInput();
        let line, isDrawing = false;

        canvas.on('mouse:down', function(o) {
            isDrawing = true;
            const pointer = canvas.getPointer(o.e);
            const points = [pointer.x, pointer.y, pointer.x, pointer.y];
            line = new fabric.Line(points, {
                strokeWidth: parseInt($("#brushSize").val(), 10),
                fill: $("#colorPicker").val(),
                stroke: $("#colorPicker").val(),
                originX: 'center',
                originY: 'center'
            });
            canvas.add(line);
        });

        canvas.on('mouse:move', function(o) {
            if (!isDrawing) return;
            const pointer = canvas.getPointer(o.e);
            line.set({ x2: pointer.x, y2: pointer.y });
            canvas.renderAll();
        });

        canvas.on('mouse:up', function() {
            isDrawing = false;
            saveState();
        });
    });

    $("#drawPolygon").on('click', function() {
        resetEventHandlers();
        disableTextInput();
        let polygon, isDrawing = false;
        let points = [];

        canvas.on('mouse:down', function(o) {
            const pointer = canvas.getPointer(o.e);
            points.push({ x: pointer.x, y: pointer.y });

            if (points.length > 1) {
                canvas.remove(polygon);
            }

            polygon = new fabric.Polygon(points, {
                fill: $("#colorPicker").val(),
                stroke: $("#colorPicker").val(),
                strokeWidth: parseInt($("#brushSize").val(), 10),
                selectable: true,
                objectCaching: false
            });

            canvas.add(polygon);
            saveState();
        });
    });

    $("#addText").on('click', function() {
        resetEventHandlers();
        $("#textInput, #fontSize").show();
        canvas.on('mouse:down', function(options) {
            const text = new fabric.IText('', {
                left: options.pointer.x,
                top: options.pointer.y,
                fill: $("#colorPicker").val(),
                fontSize: parseInt($("#fontSize").val(), 10),
                selectable: true
            });
            canvas.add(text).setActiveObject(text);
            text.enterEditing();
            text.hiddenTextarea.focus();
            saveState();
        });
    });

    $("#uploadImage").on('click', function() {
        resetEventHandlers();
        disableTextInput();
        $("#imageUpload").click();
    });

    $("#imageUpload").on('change', function(e) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = function() {
                const img = new fabric.Image(imgObj);
                img.set({
                    left: 100,
                    top: 100,
                    angle: 0,
                    padding: 10,
                    cornersize: 10,
                    selectable: true
                });
                canvas.add(img);
                saveState();
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    });

    $("#cropImage").on('click', function() {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'image') {
            activeObject.set({
                clipPath: new fabric.Rect({
                    left: activeObject.left,
                    top: activeObject.top,
                    width: activeObject.width,
                    height: activeObject.height,
                    absolutePositioned: true
                })
            });
            saveState();
        }
    });

    $("#clear").on('click', function() {
        canvas.clear();
        if (gridVisible) drawGrid();
        canvas.backgroundColor = $('#bgColorPicker').val();
        saveState();
    });

    $("#undo").on('click', function() {
        if (mods > 0) {
            mods -= 1;
            canvas.clear();
            canvas.loadFromJSON(state[mods], canvas.renderAll.bind(canvas));
            if (gridVisible) drawGrid();
        }
    });

    $("#redo").on('click', function() {
        if (mods < state.length - 1) {
            mods += 1;
            canvas.clear();
            canvas.loadFromJSON(state[mods], canvas.renderAll.bind(canvas));
            if (gridVisible) drawGrid();
        }
    });

    $("#group").on('click', function() {
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects.length > 1) {
            const group = new fabric.Group(activeObjects);
            canvas.discardActiveObject();
            canvas.add(group);
            saveState();
        }
    });

    $("#ungroup").on('click', function() {
        const activeObject = canvas.getActiveObject();
        if (activeObject && activeObject.type === 'group') {
            const items = activeObject._objects;
            activeObject._restoreObjectsState();
            canvas.remove(activeObject);
            items.forEach(function(item) {
                canvas.add(item);
            });
            canvas.renderAll();
            saveState();
        }
    });

    function drawGrid() {
        const gridSize = 50;
        for (let i = 0; i < (canvas.width / gridSize); i++) {
            canvas.add(new fabric.Line([i * gridSize, 0, i * gridSize, canvas.height], {
                stroke: '#ccc',
                selectable: false
            }));
            canvas.add(new fabric.Line([0, i * gridSize, canvas.width, i * gridSize], {
                stroke: '#ccc',
                selectable: false
            }));
        }
    }

    drawGrid();

    $("#toggleGrid").on('click', function() {
        gridVisible = !gridVisible;
        canvas.clear();
        if (gridVisible) {
            drawGrid();
        }
        canvas.loadFromJSON(state[mods], canvas.renderAll.bind(canvas));
    });

    $("#exportPNG").on('click', function() {
        const dataURL = canvas.toDataURL({ format: 'png', quality: 0.8 });
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'drawing.png';
        link.click();
    });

    $("#exportJPEG").on('click', function() {
        const dataURL = canvas.toDataURL({ format: 'jpeg', quality: 0.8 });
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'drawing.jpeg';
        link.click();
    });

    $("#exportSVG").on('click', function() {
        const svgData = canvas.toSVG();
        const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'drawing.svg';
        link.click();
    });

    $("#bgColorPicker").on('change', function() {
        canvas.backgroundColor = $(this).val();
        canvas.renderAll();
    });

    $(window).resize(function() {
        resizeCanvas();
    });

    canvas.on('object:added', function() {
        saveState();
    });

    canvas.on('object:modified', function() {
        saveState();
    });

    canvas.on('object:removed', function() {
        saveState();
    });

    canvas.on('mouse:up', function(options) {
        if (options.target) {
            options.target.setCoords();
        }
    });

    canvas.on('mouse:wheel', function(opt) {
        const delta = opt.e.deltaY;
        let zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 20) zoom = 20;
        if (zoom < 0.01) zoom = 0.01;
        canvas.setZoom(zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
    });

    let panning = false;

    canvas.on('mouse:down', function(opt) {
        const evt = opt.e;
        if (evt.altKey === true) {
            panning = true;
            canvas.selection = false;
        }
    });

    canvas.on('mouse:move', function(opt) {
        if (panning) {
            const e = opt.e;
            canvas.relativePan(new fabric.Point(e.movementX, e.movementY));
            canvas.renderAll();
        }
    });

    canvas.on('mouse:up', function() {
        panning = false;
        canvas.selection = true;
    });

    $("#settings").on('click', function() {
        $("#settingsMenu").toggle();
    });

    $("#toggleDraw").on('change', function() {
        $("#draw").toggle(this.checked);
    });

    $("#toggleText").on('change', function() {
        $("#addText, #textInput, #fontSize").toggle(this.checked);
    });

    $("#toggleImage").on('change', function() {
        $("#uploadImage").toggle(this.checked);
    });
});

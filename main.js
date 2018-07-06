// Sorry for the mess!

let canvas = document.getElementById("canvas");
let modal = document.getElementById("modal");
let can = new InputCanvas();
let currentWidth = 24;
let currentHeight = 24;

buildPaletteControls();
randomizePalette();
makeCanvas();

document.getElementById("clear-button").addEventListener("click", () => {
    makeCanvas();
});

document.getElementById("randomize-palette-button").addEventListener("click", () => {
    randomizePalette();
    can.fillPalette(can.getColors(colorInputClassName));
});

document.getElementById("imageify-art-button").addEventListener("click", () => {
    let renderingCanvas = document.getElementById("rendering-canvas");

    if (can.isBuilt() && renderingCanvas != null) {
        renderingCanvas.height = can.height;
        renderingCanvas.width = can.width;

        let ctx = renderingCanvas.getContext("2d");

        renderingCanvas.style.display = "block";

        //ctx.fillStyle = "#FF0000";
        //ctx.fillRect(0, 0, 2, 2);

        //console.log(can.width, can.height);
        let color;

        can.forEach((x, y) => {
            color = can.get(x, y).dataset.color;
            if (color == "") {
                color = "white";
            }
            ctx.fillStyle = color;
            ctx.fillRect(x, y, 1, 1);
        });
    }
});

canvas.addEventListener("keypress", (event) => {
    if (event.key == "r") {
        randomizePalette();
        can.fillPalette(can.getColors(colorInputClassName));
    }
});

document.getElementById("set-size-button").addEventListener("click", () => {
    modal.style.display = "flex";
    document.getElementById("error-message").style.display = "none";
});

document.getElementById("set-size-submit-button").addEventListener("click", () => {
    let widthInput = document.getElementById("width-input");
    let heightInput = document.getElementById("height-input")
    let errorMessage = document.getElementById("error-message");
    let width = Number(widthInput.value);
    let height = Number(heightInput.value);

    if (!checkDimension(width) || !checkDimension(height)) {
        widthInput.value = "";
        heightInput.value = "";
        errorMessage.style.display = "block";
        errorMessage.textContent = "The specified dimensions are invalid.";
    } else {
        makeCanvas(width, height);
        currentWidth = width;
        currentHeight = height;
        modal.style.display = "none";
    }
});

document.getElementById("set-size-cancel-button").addEventListener("click", () => {
    modal.style.display = "none";
});
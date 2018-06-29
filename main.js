// Sorry for the mess!

let br;
let span;
let div;
let colorInput;
let paletteDiv = document.getElementById("palette");
let color = "";
let colorsUsed = {};
let colorInputClassName = "color";

function buildPaletteControls() {
    for (let i = 0; i < 9; i++) {
        br = document.createElement("br");
        span = document.createElement("span");
        div = document.createElement("div");

        span.textContent = /*"Num " +*/ (i + 1) + ": ";
        colorInput = document.createElement("input");
        colorInput.type = "color";
        colorInput.className = colorInputClassName;

        div.appendChild(span);
        div.appendChild(colorInput);
        div.appendChild(br);

        paletteDiv.appendChild(div);
    }
}

function randomizePalette() {
    let colorElements = document.getElementsByClassName(colorInputClassName);
    for (let i = 0; i < colorElements.length; i++) {
        assignColor(colorElements[i]);
    }
}

function assignColor(ele) {
    color = generateHex();

    while (colorsUsed[color]) {
        color = generateHex();
    }

    ele.value = color;
    colorsUsed[color] = true;
}

function generateHex() {
    let str = "#";
    let hexCharArr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    let length = 6;

    for (let i = 0; i < length; i++) {
        let char = hexCharArr[Math.floor(Math.random() * (hexCharArr.length))];
        str += char;
    }
    return str;
}

buildPaletteControls();
randomizePalette();

let canvas = document.getElementById("canvas");

let can = new InputCanvas();

can.build(24, 24);
can.bind(canvas);
can.get(0, 0).focus();

document.getElementById("clear-button").addEventListener("click", () => {
    can.build(24, 24);
    can.bind("canvas");
});

document.getElementById("randomize-palette-button").addEventListener("click", () => {
    randomizePalette();
    can.fillPalette(can.getColors(colorInputClassName));
});

function getColor() {

}

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
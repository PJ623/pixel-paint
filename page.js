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

        span.textContent = (i + 1) + ": ";
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

function makeCanvas(width, height) {
    if (width > 0 && height > 0) {
        can.build(width, height)
    } else {
        can.build(currentWidth, currentHeight);
    }
    can.bind(canvas);
    can.get(0, 0).focus();
}

function checkDimension(num) {
    if (Number.isNaN(num) || num < 1 || num % 1 != 0) {
        return false;
    } else {
        return true;
    }
}
/*
    TODOS:
    * ClearCanvas()
    * Render onto canvas and save as image.
    * Save in local storage?
    * addRow()
    * addCol()
    * Provide instructions on how to use the app
    * Let user determine size of canvas
    * Set pixel size?
*/

class InputCanvas extends Canvas {
    constructor() {
        super();

        this.width = 0;
        this.height = 0;
        this.contents = []; // basically the canvas itself

        // Uses event.keyCode
        this.movementMap = {
            // arrow keys
            38: new this.Vector(0, -1), // up
            40: new this.Vector(0, 1), // down
            37: new this.Vector(-1, 0), // left
            39: new this.Vector(1, 0), // right

            // wasd
            87: new this.Vector(0, -1), // w
            83: new this.Vector(0, 1), // a
            65: new this.Vector(-1, 0), // s
            68: new this.Vector(1, 0) // d
        }

        // Uses event.keyCode
        this.deleteMap = {
            8: true, // Backspace
            32: true, // Space
            96: true // 0
        }

        // Default palette
        // Uses event.key
        // Can be reassigned in InputCanvas.build()
        this.palette = {}
    }

    // Execute this before doing anything else
    build(width, height, palette) {
        this.width = width;
        this.height = height;

        if (palette instanceof Array) {
            this.fillPalette(palette);
        } else if (typeof palette == "object" && palette != null) {
            this.palette = palette;
        } else {
            this.fillPalette(this.getColors("color"));
        }

        this.contents = [];

        // Populate contents.
        for (let y = 0; y < this.height; y++) {
            this.contents.push(new Array(this.width));
            for (let x = 0; x < this.width; x++) {
                this.insert(x, y, this.createCell(x, y));
            }
        }
    }

    // Also serves as function to clear InputCanvas.
    bind(element) { // Rename? bind isn't completely accurate
        if (typeof element == "string") {
            element = document.getElementById(element);
        }

        element.innerHTML = "";

        let row;
        let previousY = -1;

        this.forEach((x, y) => {
            if (y != previousY) {
                row = this.createRow(y);
                previousY = y;
            }
            row.appendChild(this.get(x, y));
            if (x == this.width - 1) {
                element.appendChild(row);
            }
        });
    }

    moveSelector(x, y) {
        if (x instanceof this.Vector) {
            y = x.y;
            x = x.x;
        }
        if (this.check(x, y)) {
            this.get(x, y).focus();
        }
    }

    getColors(className) {
        let colorElements = document.getElementsByClassName(className);
        let palette = [];

        for (let i = 0; i < colorElements.length; i++) {
            palette.push(colorElements[i].value);

            colorElements[i].addEventListener("change", () => {
                palette[i] = colorElements[i].value;
                this.fillPalette(palette);
            });
        }

        return palette;
    }

    fillPalette(palette) {
        for (let i = 0; i < palette.length; i++) {
            this.palette[i + 1] = palette[i];
        }
    }

    createCell(x, y) {
        if (x instanceof this.Vector) {
            y = x.y;
            x = x.x;
        }

        let ele = document.createElement("image");
        ele.tabIndex = x + (this.width * y);

        let color;

        //ele.type = "text";
        ele.className = "cell";
        ele.dataset.position = new this.Vector(x, y);
        ele.dataset.color = "";

        ele.addEventListener("keypress", (event) => {
            color = this.palette[event.key];
            if (color) {
                this.paintCell(ele, color);
            }
        });

        ele.addEventListener("keydown", (event) => {
            if (this.movementMap[event.keyCode]) {
                let parsedPosition = JSON.parse(ele.dataset.position);
                let position = new this.Vector(parsedPosition.x, parsedPosition.y);
                let vec = this.movementMap[event.keyCode];

                // wrap backwards
                if (position.x == 0 && (vec.toString() == new this.Vector(-1, 0).toString())) {
                    vec = new this.Vector((this.width - 1), 0);

                    // wrap forwards
                } else if (position.x == this.width - 1 && vec.toString() == new this.Vector(1, 0).toString()) {
                    vec = new this.Vector(-(this.width - 1), 0);

                    // wrap upwards
                } else if (position.y == 0 && vec.toString() == new this.Vector(0, -1).toString()) {
                    vec = new this.Vector(0, (this.height - 1));

                    // wrap downwards
                } else if (position.y == this.height - 1 && vec.toString() == new this.Vector(0, 1).toString()) {
                    vec = new this.Vector(0, -(this.height - 1));
                }

                this.moveSelector(position.add(vec));
            } else if (this.deleteMap[event.keyCode]) {
                this.clearCell(ele);
            }
        });

        return ele;
    }

    paintCell(ele, color) {
        ele.dataset.color = color;
        ele.style.backgroundColor = ele.dataset.color;
    }

    clearCell(ele) {
        ele.dataset.color = "";
        ele.style.backgroundColor = ele.dataset.color;
    }

    createRow(y) {
        if (y instanceof this.Vector) {
            y = y.y;
        }

        let row = document.createElement("div");
        row.className = "row";
        row.dataset.y = y;
        return row;
    }

    isBuilt() {
        if (this.contents) {
            return true;
        } else {
            return false;
        }
    }
}

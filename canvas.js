class Canvas {
    constructor() {
        this.width;
        this.height;
        this.contents = [];
        this.Vector = class Vector {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }

            add(x, y) {
                if (x instanceof Vector) {
                    y = x.y;
                    x = x.x;
                }
                return new Vector(this.x + x, this.y + y);
            }

            toString() {
                return JSON.stringify(this);
            }
        }
    }

    build(width, height) {
        this.width = width;
        this.height = height;

        for (let y = 0; y < this.height; y++) {
            this.contents.push(new Array(this.width));
            for (let x = 0; x < this.width; x++) {
                this.insert(x, y, null);
            }
        }
    }

    forEach(cb) {
        if (typeof cb != "function") {
            return false;
        }

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                cb(x, y);
            }
        }
    }

    check(x, y) {
        if (x instanceof this.Vector) {
            y = x.y;
            x = x.x;
        }

        if (x >= this.width || x < 0 || y >= this.height || y < 0) {
            return false;
        } else {
            return true;
        }
    }

    get(x, y) {
        if (x instanceof this.Vector) {
            y = x.y;
            x = x.x;
        }

        if (this.check(x, y)) {
            return this.contents[y][x];
        }
    }

    insert(x, y, cell) {
        if (x instanceof this.Vector) {
            cell = y;
            y = x.y;
            x = x.x;
        }

        if (this.check(x, y)) {
            this.contents[y][x] = cell;
        }
    }

    delete(x, y) {
        if (x instanceof this.Vector) {
            y = x.y;
            x = x.x;
        }

        if (this.check(x, y)) {
            this.contents[y][x] = null;
        }
    }
}
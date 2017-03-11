class Hero {
    constructor(hex) {
        this.hex = hex;
        this.position = grid.getHexCenter(this.hex);
        this.path = [];
        this.speed = 1; //hexes per second
        this.moveProgress = 0;
        this.nextHex = hex;
    }

    step(dt) {
        let polygon = grid.getHexPolygon(this.hex);
        context.strokeStyle = 'blue';
        context.strokePolygon(polygon);

        polygon = grid.getHexPolygon(this.nextHex);
        context.strokeStyle = 'aqua';
        context.strokePolygon(polygon);

        context.strokeStyle = 'green';
        context.strokePoint(this.position);

        if (this.hex[0] != this.nextHex[0] || this.hex[1] != this.nextHex[1]) {
            if (this.moveProgress < 1) {
                this.moveProgress += dt * this.speed;
                let m = new Vector(grid.getHexCenter(this.hex), grid.getHexCenter(this.nextHex));
                m.multi(dt * this.speed);
                this.position.add(m);
            } else {
                this.hex[0] = this.nextHex[0];
                this.hex[1] = this.nextHex[1];
                this.moveProgress = 0;

                this.position = grid.getHexCenter(this.hex);
            }
        }

        if (this.path.length > 0) {
            if (this.hex[0] == this.nextHex[0] && this.hex[1] == this.nextHex[1]) {
                this.nextHex = this.path.shift();
            }
            let polygon = grid.getHexPolygon(this.path[this.path.length - 1]);
            if (polygon) {
                context.strokeStyle = 'orange';
                context.strokePolygon(polygon);
            }
        }
    }

    move(hex) {
        let path = grid.findPath(hero.nextHex, hex, matrix);
        if (path) this.path = path;        
    }
}

function start() {
    mouse = new Mouse(canvas);
    canvas.addEventListener('click', click);

    this.grid = new HexGrid(25, 15, 16);

    this.matrix = grid.getEmptyMatrix();

    matrix[5][2] = 1;
    matrix[5][3] = 1;
    matrix[5][4] = 1;
    matrix[5][5] = 1;
    matrix[5][6] = 1;
    matrix[5][7] = 1;
    matrix[5][8] = 1;
    matrix[6][8] = 1;
    matrix[7][8] = 1;
    matrix[8][8] = 1;
    matrix[9][8] = 1;
    matrix[9][8] = 1;
    matrix[11][8] = 1;
    matrix[11][7] = 1;
    matrix[11][6] = 1;

    this.hero = new Hero([7,5]);
}

function step(dt) {
    context.fillStyle = 'white';
    context.fillRect(0, 0, 640, 480);

    for (let q = 0; q < matrix.length; q++) for (let r = 0; r < matrix[q].length; r++) {
        if (!matrix[q][r]) continue;
        let polygon = grid.getHexPolygon([q, r]);
        context.fillStyle = 'gray';
        context.fillPolygon(polygon);
    }

    let hex = grid.findHex(mouse.position);
    if (hex) {
        let polygon = grid.getHexPolygon(hex);

        context.lineWidth = 2;
        context.strokeStyle = 'red';
        context.strokePolygon(polygon);
    }

    this.hero.step(dt);
}

function click()  {
    hero.move(grid.findHex(mouse.position));
}
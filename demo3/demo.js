function start() {
    canvas.addEventListener('click', click);
    this.mouse = new Mouse(canvas);

    this.tiles = {};
    this.tiles.grass = new Image();
    this.tiles.grass.src = './tiles/grass.png';
    this.tiles.ground = new Image();
    this.tiles.ground.src = './tiles/ground.png';
    this.tiles.water = new Image();
    this.tiles.water.src = './tiles/water.png';

    this.grid = new IsoGrid(new Size(10,10), new Size(32, 16), new Point(16, 240));

    this.tileMap = [];
    for (let x = 0; x < 10; x++) {
        this.tileMap[x] = [];
        for (let y = 0; y < 10; y++) {
            if (x == 0 || y == 0 || x == 9 || y == 9) {
                this.tileMap[x][y] = this.tiles.water;
            } else {
                this.tileMap[x][y] = this.tiles.grass;
            }
        }
    }
}

function step(dt) {
    context.strokeStyle = 'gray';
    for (let x = 0; x < 10; x++) for (let y = 0; y < 10; y++) {
        let center = this.grid.getCellCenter(new Point(x, y));
        context.drawImage(this.tileMap[x][y], center.x - 16, center.y - 8);
        let polygon = this.grid.getCellPolygon(new Point(x, y));
        context.strokePolygon(polygon);
    }

    let cell = grid.pointToCell(mouse.position);
    if (cell) {
        let polygon = this.grid.getCellPolygon(cell);
        context.strokeStyle = 'red';
        context.strokePolygon(polygon);
    }
}

function click() {
    let cell = grid.pointToCell(mouse.position);
    if (!cell) return false;
    window.tileMap[cell.x][cell.y] = window.tiles.ground;
}
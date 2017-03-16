const SQRT2 = Math.sqrt(2);

class IsoGrid {
    constructor(size, cellSize, start) {
        this.size = size;
        this.cellSize = cellSize;
        this.start = start;
    }

    check(cell) {
        if (!(cell instanceof Point) ||
            cell.x < 0 || cell.x > this.size.width - 1 || 
            cell.y < 0 || cell.y > this.size.height - 1 ||
            isNaN(cell.x) || isNaN(cell.y)) return false;
        return true;
    }

    getCellCenter(cell) {
        let x = cell.x;
        let y = cell.y;
        let w = this.cellSize.width;
        let h = this.cellSize.height;
        let center = new Point(w/2 * (x + y), h/2 * (y - x));
        center.add(this.start);
        return center;
    }

    getCellPolygon(cell) {
        let center = this.getCellCenter(cell);
        let w = this.cellSize.width;
        let h = this.cellSize.height;

        let vertices = [];

        vertices.push(new Point(center));
        vertices[0].x += w/2;

        vertices.push(new Point(center));
        vertices[1].y += h/2;

        vertices.push(new Point(center));
        vertices[2].x -= w/2;

        vertices.push(new Point(center));
        vertices[3].y -= h/2;

        return new Polygon(vertices);
    }

    pointToCell(point) {
        let w = this.cellSize.width;
        let h = this.cellSize.height;

        let pos = new Point(point);
        pos.sub(this.start);
        pos.x += w / 2;

        let tX = pos.x * SQRT2/2 - pos.y * (w / h) * SQRT2/2;
        let tY = pos.y * (w / h) * SQRT2/2 + pos.x * SQRT2/2;

        let x = Math.floor(tX / w * SQRT2);
        let y = Math.floor(tY / w * SQRT2);

        let cell = new Point(x, y);

        if (!this.check(cell)) return false;

        return cell;
    }

}
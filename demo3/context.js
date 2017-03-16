CanvasRenderingContext2D.prototype.strokeEllipse = function(centerX, centerY, width, height) {
    this.beginPath();
  
    this.moveTo(centerX, centerY - height/2); // A1
  
    this.bezierCurveTo(
        centerX + width/2, centerY - height/2, // C1
        centerX + width/2, centerY + height/2, // C2
        centerX, centerY + height/2); // A2

    this.bezierCurveTo(
        centerX - width/2, centerY + height/2, // C3
        centerX - width/2, centerY - height/2, // C4
        centerX, centerY - height/2); // A1
 
    this.stroke();
    this.closePath();	
}

CanvasRenderingContext2D.prototype.fillEllipse = function(centerX, centerY, width, height) {
    this.beginPath();
  
    this.moveTo(centerX, centerY - height/2); // A1
  
    this.bezierCurveTo(
        centerX + width/2, centerY - height/2, // C1
        centerX + width/2, centerY + height/2, // C2
        centerX, centerY + height/2); // A2

    this.bezierCurveTo(
        centerX - width/2, centerY + height/2, // C3
        centerX - width/2, centerY - height/2, // C4
        centerX, centerY - height/2); // A1
 
    this.fill();
    this.closePath();	
}

CanvasRenderingContext2D.prototype.strokePoint = function(point) {
    this.beginPath();
    this.moveTo(point.x - 10, point.y);
    this.lineTo(point.x + 10, point.y);
    this.moveTo(point.x, point.y - 10);
    this.lineTo(point.x, point.y + 10);
    this.closePath();
    this.stroke();
}

CanvasRenderingContext2D.prototype.strokePolygon = function(polygon) {
    this.beginPath();
    this.moveTo(polygon.vertices[0].x, polygon.vertices[0].y);
    for (let i = 1; i < polygon.vertices.length; i++) {
        this.lineTo(polygon.vertices[i].x, polygon.vertices[i].y);
    }
    this.closePath();
    this.stroke();
}

CanvasRenderingContext2D.prototype.fillPolygon = function(polygon) {
    this.beginPath();
    this.moveTo(polygon.vertices[0].x, polygon.vertices[0].y);
    for (let i = 1; i < polygon.vertices.length; i++) {
        this.lineTo(polygon.vertices[i].x, polygon.vertices[i].y);
    }
    this.closePath();
    this.fill();
}

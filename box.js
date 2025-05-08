class Box {
    constructor(x1, y1, x2, y2) {
      if (y1!=null && x2 != null && y2 != null) {
        //provide 4 discrete cord
        this.x1 = Math.min(x1, x2);
        this.y1 = Math.min(y1, y2);
        this.x2 = Math.max(x1, x2);
        this.y2 = Math.max(y1, y2);
      }else{
        //array mode
        this.x1 = Math.min(x1[0], x1[2]);
        this.y1 = Math.min(x1[1], x1[3]);
        this.x2 = Math.max(x1[0], x1[2]);
        this.y2 = Math.max(x1[1], x1[3]);
      }
    }
  
    isInBox(x, y) {
      return x >= this.x1 && x <= this.x2 && y >= this.y1 && y <= this.y2;
    }
}
function isInBox(x1, y1, x2, y2, x, y){
    // Normalize the coordinates to ensure (x1, y1) is the top-left and (x2, y2) is the bottom-right
    const minX = Math.min(x1, x2);
    const minY = Math.min(y1, y2);
    const maxX = Math.max(x1, x2);
    const maxY = Math.max(y1, y2);

    // Check if (x, y) is within the bounds
    return x >= minX && x <= maxX && y >= minY && y <= maxY;
}
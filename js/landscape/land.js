class Land extends Terrain {
    constructor(x, y, w, h, padding = 0) {
    super(x, y, w, h, padding);
    this.backgroundColor = color(0, 100, 0); 
  }

  show() {
  
    super.show();


  }
  drawBounds() {
   fill(this.backgroundColor);
   //stroke(0, 255, 0);
   
    rectMode(CENTER);
    rect(0, 0, this.w + this.offset * 2, this.h + this.offset * 2);
    // fill(50, 150, 50);
    //rect(0, 0, this.w, this.h);
    noStroke();
  }
}
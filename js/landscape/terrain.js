class Terrain {
    constructor(x, y, w, h,padding=0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.offset = padding;
        this.backgroundColor = color(200, 0, 200);
    }
    show() {
        push();
        translate(this.x, this.y);
        this.drawBounds();
        pop(); 
    }

    drawBounds(){
      
        fill(this.backgroundColor);
        stroke(255,0,0);
        rectMode(CENTER);
        rect(0,0,this.w+this.offset*2,this.h+this.offset*2);
       // fill(50, 150, 50);
        //rect(0, 0, this.w, this.h);
        noStroke();
    
    }
    // Check if a point (px, py) is within the terrain boundaries, 
    //considering the offset
    contains(px, py) {
        return (px > this.x - this.w / 2 - this.offset &&
            px < this.x + this.w / 2 + this.offset &&
            py > this.y - this.h / 2 - this.offset &&
            py < this.y + this.h / 2 + this.offset);
    }
}
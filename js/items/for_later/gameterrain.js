// Changed this to a different namespace.
// This can be useful later. 
// Remember: this was the initial terrain class
// that I used in sketch.js
// Now I can use it in any scene file.


class Terrain {
    constructor(x, y, w, h,padding=0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.offset = padding;
    }
    show() {
        push();
        translate(this.x, this.y);
        fill(100, 0, 100);
        rectMode(CENTER);
        rect(0, 0, this.w + this.offset * 2, this.h + this.offset * 2);
        fill(50, 150, 50);
        rect(0, 0, this.w, this.h);
        // noFill();
        // stroke(255,0,0);
        // rect(0,0,this.w+this.offset*2,this.h+this.offset*2);
        // noStroke();
       // translate(-this.x, -this.y);   
       pop(); 
    }

    drawBounds(){
        push();
        translate(this.x, this.y);
        noFill();
        stroke(255,0,0);
        rectMode(CENTER);
        rect(0,0,this.w,this.h);
       // fill(50, 150, 50);
        //rect(0, 0, this.w, this.h);
        noStroke();
       pop(); 
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
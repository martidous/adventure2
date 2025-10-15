class Fish extends Item {
    constructor(x, y, size,name="Fish") {
        super(name, x, y, size);
        this.itemType = name;
        this.fillColor = color(255, 100, 100);
        this.eyeColor = color(200, 50, 50);
        this.tailColor = null;
    }
    show() {
        super.show();
        
    }

    glow(color = "blue") {
        super.setGlow(color);
        this.glowness = sin(frameCount * 0.03) * 10 + 70;
        fill(red(color), green(color), blue(color), 50);
        ellipse(this.x, this.y, this.glowness, this.glowness);    
   
    }
    create() {
        ellipseMode(CENTER);
        fill(this.fillColor);
        ellipse(0, 0, this.size, this.size / 2);
        fill(this.tailColor || this.fillColor);
        triangle(-this.size / 2, 0, -this.size / 2 - this.size / 4, -this.size / 4, -this.size / 2 - this.size / 4, this.size / 4);
        fill(this.eyeColor);
        ellipse(this.size / 8, -this.size / 8, this.size / 10, this.size / 10);
        
    }
}
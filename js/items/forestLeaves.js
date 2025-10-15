class ForestLeaves extends Item {
    constructor(x, y, size) {
        super("FoliageBush", x, y, size);
        this.foliageColor = color(40, 110, 45, 180);
        this.itemType = "forestLeaves";
    }
    
    show() {
        super.show();
    }
    
    create() {
        fill(this.foliageColor);
        noStroke();
        
        // Use bezier to create organic bush shape
        beginShape();
        vertex(0, 0);
        bezierVertex(-this.size * 0.4, -this.size * 0.3, 
                    -this.size * 0.3, -this.size * 0.6, 
                    0, -this.size * 0.7);
        bezierVertex(this.size * 0.3, -this.size * 0.6, 
                    this.size * 0.4, -this.size * 0.3, 
                    this.size * 0.5, 0);
        endShape(CLOSE);
    }
    
    glow(color = "green") {
        super.setGlow(color);
        this.glowness = sin(frameCount * 0.03) * 8 + 20;
        
        push();
        fill(red(color), green(color), blue(color), 40);
        noStroke();
        
        // Glow around bush
        beginShape();
        vertex(this.x, this.y);
        bezierVertex(this.x - (this.size + this.glowness) * 0.4, this.y - (this.size + this.glowness) * 0.3, 
                    this.x - (this.size + this.glowness) * 0.3, this.y - (this.size + this.glowness) * 0.6, 
                    this.x, this.y - (this.size + this.glowness) * 0.7);
        bezierVertex(this.x + (this.size + this.glowness) * 0.3, this.y - (this.size + this.glowness) * 0.6, 
                    this.x + (this.size + this.glowness) * 0.4, this.y - (this.size + this.glowness) * 0.3, 
                    this.x + (this.size + this.glowness) * 0.5, this.y);
        endShape(CLOSE);
        pop();
    }
}
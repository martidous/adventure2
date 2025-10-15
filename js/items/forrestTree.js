class ForestTree extends Item {
    constructor(x, y, size) {
        super("RainforestTree", x, y, size);
        this.trunkColor = color(60, 40, 20);
        this.canopyColor = color(30, 120, 40, 200);
        this.scaleFactor = this.size / 100; // Base size of 100
        this.itemType = "forestTree";
    }
    
    show() {
        super.show();
    }
    
    create() {
        let scale = this.scaleFactor;
        
        // Trunk. add a little noise for texture
        noStroke();
        fill(this.trunkColor);
        beginShape();
        curveVertex(-8 * scale, 0);
        curveVertex(-8 * scale, 0);
        curveVertex(-6 * scale, -30 * scale);
        curveVertex(-4 * scale, -50 * scale);
        curveVertex(4 * scale, -50 * scale);
        curveVertex(6 * scale, -30 * scale);
        curveVertex(8 * scale, 0);
        curveVertex(8 * scale, 0);
        endShape(CLOSE);
        
        // Canopy make it a bit wavy with noise
        fill(this.canopyColor);
        for (let i = 0; i < 3; i++) {
            let size = (60 - i * 15) * scale;
            let offsetY = i * 15 * scale;
            let noiseOffset = noise(frameCount * 0.01, i) * 5;
            ellipse(noiseOffset, -40 * scale - offsetY, size, size * 0.8);
        }
    }
    
    glow(color = "green") {
        super.setGlow(color);
        this.glowness = sin(frameCount * 0.03) * 10 + 30;
        
        push();
        fill(red(color), green(color), blue(color), 50);
        noStroke();
        
        // On the gorund
        for (let i = 0; i < 3; i++) {
            let size = (60 - i * 15) * this.scaleFactor + this.glowness;
            let offsetY = i * 15 * this.scaleFactor;
            ellipse(this.x, this.y - 40 * this.scaleFactor - offsetY, size, size * 0.8);
        }
        pop();
    }
}
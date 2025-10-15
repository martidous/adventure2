class Stones extends Item {
    constructor(x, y, size) {
        super("Stones", x, y, size);
        this.itemType = "stones";
    }
    show() {
        super.show();
       
    }
    glow(color = "gray") {
        super.setGlow(color);
        this.glowness = sin(frameCount * 0.03) * 10 + 50;
        fill(red(color), green(color), blue(color), 50);
        for (let i = -2; i <= 2; i++) {
            ellipse(this.x + i * this.glowness / 4, this.y, this.glowness / 3, this.glowness / 4);
        }
       
    }  
    create() {
        let stoneColors = [140, 160, 130, 150, 135];
        ellipseMode(CENTER);
        for (let i = -2; i <= 2; i++) {
            // shadow
            fill(100);
            ellipse(i * this.size / 4 + 1, 1, this.size / 3, this.size / 4);
            
            //  different color
            fill(stoneColors[i + 2]);
            ellipse(i * this.size / 4, 0, this.size / 3, this.size / 4);
            
            // highlight
            fill(255, 150);
            ellipse(i * this.size / 4 - 2, -1, this.size / 8, this.size / 10);
        }
        
    }     
}
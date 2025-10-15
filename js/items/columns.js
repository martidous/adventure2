class KinglyColumns extends Item {
    constructor(x, y, size) {
        super("Kingly Columns", x, y, size);
        this.itemType = "kinglyColumns";
        this.red=180;
        this.green=140;
        this.blue=100;
        this.fillColor=color(this.red,this.green,this.blue);
        this.canGlow=true;
    }
    show() {
        super.show();
       
    }
    glow(color = "purple") {
        push();
        super.setGlow(color);
        this.glowness = sin(frameCount * 0.03) * 10 + 70;
        fill(red(color), green(color), blue(color));
        rect(this.x, this.y, this.glowness / 4, this.glowness);
        rect(this.x, this.y - this.size / 2 + this.size / 20, this.glowness / 3, this.glowness / 10);
        rect(this.x, this.y + this.size / 2 - this.size / 20, this.glowness / 3, this.glowness / 10);
        pop();
    }
    create() {
        rectMode(CENTER);
        fill(this.red, this.green, this.blue);
        rect(0, 0, this.size / 4, this.size);
        rect(0, -this.size / 2 + this.size / 20, this.size / 3, this.size / 10);
        rect(0, this.size / 2 - this.size / 20, this.size / 3, this.size / 10);
       
    }
}
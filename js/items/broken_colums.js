class BrokenColumns extends Item {
    constructor(x, y, size) {
        super("BrokenColumns", x, y, size);
        this.itemType = "brokenColumns";
    }
    show() {
        super.show();
       
    }
    create() {
        rectMode(CENTER);
        fill(this.fillColor);
        // Draw broken column pieces
        rect(0, -this.size / 4, this.size / 4, this.size / 2);
        rect(0, this.size / 8, this.size / 3, this.size / 6);
        rect(0, this.size / 3, this.size / 5, this.size / 8);
    }     
}       
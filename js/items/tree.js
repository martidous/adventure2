class Tree extends Item {
    constructor(x, y, size) {
        super("Tree", x, y, size);
        this.itemType = "tree";
    }
    show() {
        super.show();
    }
    glow(color = "green") {
        super.setGlow(color);
        
    }
    create(){
        noStroke();
        
        // trunk of the tree. can be beter
        fill(101, 67, 33); // Brown . Doesn't look very good. On Green background
        rectMode(CENTER);
        rect(0, this.size/3, this.size/5, this.size/2);
        
     
        fill(34, 139, 34);// sort of green
        ellipseMode(CENTER);
        
        //Must scale otherwise tree looks weird when size changes
        let leafScale = this.size / 60; // Assuming default size around 60
        
        // Top
        ellipse(0, -this.size/4, this.size * 0.8, this.size * 0.4);
        // Left
        ellipse(-this.size/3, -this.size/8, this.size * 0.6, this.size * 0.3);
        // Right
        ellipse(this.size/3, -this.size/8, this.size * 0.6, this.size * 0.3);
        // Left
        ellipse(-this.size/6, -this.size/3, this.size * 0.5, this.size * 0.25);
        // Right
        ellipse(this.size/6, -this.size/3, this.size * 0.5, this.size * 0.25); 
    }
}
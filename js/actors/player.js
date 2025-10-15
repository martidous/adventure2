class Player extends Role {
    constructor(x, y) {
        super("Player", x, y);
        this.score = 0;
        this.health = 100;
        this.items_collected = [];
        this.speed = 5;
        this.decreaseSizeOnMovement=false;
        this.do_rotate=false;
        this.rotationAngle=PI/2;
       
    
    }
    show() {
        push();
        translate(this.x, this.y);
        if (this.do_rotate) {
            rotate(this.rotationAngle);
        }
        translate(-this.x, -this.y);
        super.show();
        pop();
        
    }
}
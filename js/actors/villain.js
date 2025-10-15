class Villain extends Role {
    constructor(x, y) {
        super("Villain", x, y);
        this.health = 100;
        this.damage = 10;
        this.speed = 3;
        this.magnigication = 2.0; // magnification factor
        this.leg_color = "green";
        this.body_color = "red";
        this.head_color = "purple";
        this.arm_color = "green";
        this.pant_color = "red";
       // this.leg_size = 20;
    }
    show() {
        super.show();
    
    }
   

}
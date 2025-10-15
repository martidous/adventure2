class Diamond extends Item {
  constructor(x, y, size) {
    super("Diamond", x, y, size);
    this.itemType = "diamond";
  }
  show() {
    super.show();
   
  }
  glow(color = "red") {
    push();
    super.setGlow(color);
    
    this.glowness = sin(frameCount * 0.03) * 10 + 70;
    fill(red(color), green(color), blue(color), 50);
    triangle(this.x, this.y - this.glowness/2, 
             this.x + this.glowness/2, this.y, 
             this.x, this.y + this.glowness/2);
    pop();
  }
  create() {
    ellipseMode(CENTER);
    fill(255, 223, 0);
    triangle(0, -this.size / 2, this.size / 2, 0, 0, this.size / 2);
   
  }
}

class HowtoPlay extends Item {
  constructor(
    name,
    x,
    y,
    size,
    message = "Use Arrow Keys to Move. Press Space to Interact."
  ) {
    super(name, x, y, size);
    this.message = message;
    this.itemType = "howtoplay";
    this.glowColor = "lightblue";
    this.backgroundColor = color(200, 200, 255, 150);
    this.textColor = color(0);
    this.textSize = this.size * 0.1;
    this.title = "How to Play";
  }
  show() {
    super.show();
  }
  create() {
    push
    fill(255);
    textAlign(CENTER, TOP);
    textSize(this.textSize * 0.8); 
    textStyle(BOLD);
    text("🎮 Controls", 0, this.size * 0.08); 
    pop();

    // Control items
    push();
    fill(255);
    textSize(this.textSize * 0.4); 
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);

    let controlsText = `N = Next Scene    R = Restart
B = Go Back       M = Music On/Off
WASD = Move      SPACE = Collect`;

    text(controlsText, 0, this.size * 0.25, this.size * 2.6); // ✅ Adjusted position
    pop();
  }
}

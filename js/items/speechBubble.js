class SpeechBubble extends Item {
    constructor(name, x, y, size, message) {
        super(name, x, y, size);
        this.message = message || "Hello!";
        this.itemType = "speechBubble"; 
        this.glowColor = "lightblue"; 
        this.bubbleColor = color(100, 230, 255, 200); // transparent
        this.maxWidth = this.size * 4; // Max width of the bubble
    }

    show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    if (typeof this.create === "function") this.create();

    // Basic text setup
    let txtSize = this.size * 0.25;
    textSize(txtSize);
    textAlign(CENTER, CENTER);


    let padding = this.size * 0.15;
    let textW = textWidth(this.message);
    let w =  Math.min(textW + padding * 2, this.maxWidth);
    let h = this.size * 1.3;
    /// when text is too long it looks bad. 
    // 1.9
    if (textW > this.maxWidth - padding * 2) {
            h = this.size * 1.8; 
    }
    fill(this.bubbleColor);
   // stroke(0);
   // strokeWeight(1);
    ellipse(0, 0, w, h);

    // Tail
    let tailW = this.size * 0.6;
    let tailH = this.size * 0.5;
    triangle(
        -tailW / 2, h / 2,
        tailW / 2, h / 2,
        0, h / 2 + tailH
    );

    // Text
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    text(this.message, 0, 0, w - padding * 2, h - padding * 2);

    pop();
    }

    create() {
        push();
        noFill();
        stroke(this.glowColor);
        strokeWeight(0);
        pop();
    }

   
}
class Stars{
    constructor(x,y,numStars, maxWidth, maxHeight) {
        this.x = x;
        this.y = y;
        this.numStars = numStars;
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.stars = [];
        this.generateStars();
    }
    generateStars() {
        for (let i = 0; i < this.numStars; i++) {
            let x = random(0, this.maxWidth);
            let y = random(0, this.maxHeight);
            let size = random(1, 3);
            this.stars.push({ x: x, y: y, size: size });
        }
    }
    show() {
        let alpha = map(sin(frameCount * 0.05), -1, 1, 100, 255);
        push();
        noStroke();
        fill(255, 255, 255, alpha);
        for (let star of this.stars) {
            ellipse(star.x, star.y, star.size);
        }
        pop();
    }
}
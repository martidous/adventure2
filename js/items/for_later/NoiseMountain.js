class NoiseMountain extends Item {
    constructor(name, x, y, size, detail = 0.01) {
        super(name, x, y, size);
        this.detail = detail;
        this.color = color(100, 90, 80, 180);
    }

    create() {
        noStroke();
        fill(this.color);

        beginShape();
        vertex(0, this.size); // bottom-left

        for (let i = 0; i <= this.size * 3; i++) {
            let y = -noise((this.x + i) * this.detail) * this.size;
            vertex(i, y);
        }

        vertex(this.size * 3, this.size); // bottom-right
        endShape(CLOSE);
    }
}
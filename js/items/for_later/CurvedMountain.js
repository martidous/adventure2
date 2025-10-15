class CurvedMountain extends Item {
    constructor(name, x, y, size, peakCount = 6) {
        super(name, x, y, size);
        this.peakCount = peakCount;
        this.color = color(140, 110, 90, 220);
    }

    create() {
        noStroke();
        fill(this.color);

        beginShape();
        vertex(0, this.size);
        vertex(0, 0);

        let step = this.size * 2 / (this.peakCount - 1);
        for (let i = 0; i < this.peakCount; i++) {
            let px = i * step;
            let py = -random(this.size * 0.3, this.size * 0.8);
            curveVertex(px, py);
        }

        vertex(this.size * 2, 0);
        vertex(this.size * 2, this.size);
        endShape(CLOSE);
    }
}
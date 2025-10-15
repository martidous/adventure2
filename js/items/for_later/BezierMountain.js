class BezierMountain extends Item {
    constructor(name, x, y, size) {
        super(name, x, y, size);
        this.color = color(160, 130, 100, 255);
    }

    create() {
        noStroke();
        fill(this.color);

        let w = this.size * 2;
        let h = this.size;

        beginShape();
        vertex(0, h);
        vertex(0, 0);

        let cp1x = w * 0.3;
        let cp1y = -h * 0.8;
        let cp2x = w * 0.7;
        let cp2y = -h * 0.8;

        bezierVertex(cp1x, cp1y, cp2x, cp2y, w, 0);

        vertex(w, h);
        endShape(CLOSE);
    }
}
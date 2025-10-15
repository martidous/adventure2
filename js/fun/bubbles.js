class Bubbles extends Sprayer {
    constructor(x, y) {
        super(x, y);
        this.gravity = createVector(0, -0.02);
    }
    createParticles() {
        let settings = {
            color: color(135, 206, 250, 150), 
            size: random(10, 30),
            shape: 'circle'
        };
        const p = new Particle(this.origin.x, this.origin.y, settings);
        p.velocity = createVector(random(-0.5, 0.5), random(-1, -3)); 
        return p;
    }
}
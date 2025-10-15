class Fire extends Sprayer {
    constructor(x, y) {
        super(x, y);
        this.gravity = createVector(0, -0.02); // Fire rises up, so negative gravity
    }
    createParticles() {
        let settings = {
            color: color(255, random(100, 200), 0), // Orange to yellowish
            size: random(5, 10),
            shape: 'circle'
        };
        // where ever the translated origin is
        const p = new Particle(this.origin.x, this.origin.y, settings);
        p.velocity = createVector(random(-0.5, 0.5), random(-3, -1)); 
        return p;
    }
    
}
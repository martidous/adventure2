class Lava extends Sprayer {
    constructor(x, y) {
        super(x, y);
       
        this.gravity = createVector(0, 0.1);
    }
    createParticles() {
        let settings = {
            color: color(255, random(50, 150), 0), 
            size: random(5, 15),
            shape: 'circle'
        };
        const p = new Particle(this.origin.x, this.origin.y, settings);
        // Lava shoots mostly upwards with a random y
        // x does not move as mucch
        p.velocity = createVector(random(-1, 1), random(-5, -2)); 
        return p;
    }
    

}
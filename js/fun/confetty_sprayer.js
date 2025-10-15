class Confetti extends Sprayer {
    constructor(x, y) {
        super(x, y);
        this.gravity = createVector(0, 0.01);
    }

    createParticles() {
        let colors = [
            color(255, 100, 100), // Pink
            color(100, 255, 100), // Green  
            color(100, 100, 255), // Blue
            color(255, 255, 100), // Yellow
            color(255, 100, 255), // Sor of red
            color(100, 255, 255)  // bliesh
        ];
        
        let shapes = ['circle', 'square'];
        
        let settings = {
            color: random(colors),
            size: random(5, 12),
            shape: random(shapes)
        };
        
        const p = new Particle(this.origin.x, this.origin.y, settings);
        // in what direcion and how fast it should shoot
        let angle = random(TWO_PI);
        let speed = random(3, 8);
        // sin and cosine gives #'s between -1 and 1 so that it goes in all directions
        p.velocity = createVector(cos(angle) * speed, sin(angle) * speed);
        return p;
    }
}
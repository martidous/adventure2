class Rain extends Sprayer {
    constructor(x, y, width = 800) {
        super(x, y);
        this.width = width; 
        this.gravity = createVector(0, 0.3); 
       // this.wind = createVector(random(-0.05, 0.05), 0); 
    }

    applyForces(particle) {
        particle.applyForce(this.gravity);
       // particle.applyForce(this.wind);
    }

    createParticles() {
        let settings = {
            color: color(100, 150, 255, 150), 
            shape: 'line' 
        };
        // Spawn across the width
        let spawnX = this.origin.x + random(-this.width/2, this.width/2);
        const p = new Particle(spawnX, this.origin.y, settings);
        
         p.velocity = createVector(random(-0.5, 0.5), random(3, 6));
        
        return p;
    }
}
class SandParticles extends Sprayer { 
    constructor(x, y, w, h, particleCount = 500) {
        super(x, y);
        this.w = w;
        this.h = h;
        this.particleCount = particleCount;
        this.particles = [];
        this.gravity = createVector(0, 0.01); //tiny downward force
        this.wind = createVector(2, 0); // Initial wind to the right
    }

    createParticles() {
        let settings = {
            color: color(250, 255, 128, 20),
            size: random(1, 2),
            shape: 'circle'
        };
        
        //Use terrain left edge, same as SandDunes
        const p = new Particle(
            this.origin.x + random(0, this.w), // Start from left edge, span full width
            this.origin.y + random(-this.h/2, this.h/2),
            settings
        );
        
        p.velocity = createVector(random(0.5, 1.5), random(-0.3, 0.3)); 
        return p;
    }

    update() {
        // Add new particles if below the desired count
        while (this.particles.length < this.particleCount) {
            this.particles.push(this.createParticles());
        }

        //appluy forces and update particles
        //remove if out of bounds
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
         //wind
            p.applyForce(this.wind);            
            //grav
            p.applyForce(this.gravity);       
            p.update();
            // Remove particles that go out of bounds
            if (p.position.x > this.origin.x + this.w + 100 || 
                p.position.y > this.origin.y + this.h/2 + 50) {
                this.particles.splice(i, 1);
            }
        }
    }

    show() {
        push();
        for (const p of this.particles) {
            p.show();
        }
        pop();
    }
    
    //change wind direction and strength
    setWind(direction, strength) {
        this.wind = createVector(direction * strength, 0);
    }
}
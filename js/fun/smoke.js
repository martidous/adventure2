class Smoke extends Sprayer{
    constructor(x,y){
        super(x,y);
        this.gravity = createVector(0, -0.01); // Lighter gravity for floating effect
        this.wind = createVector(random(-0.02, 0.02), 0); // Add wind drift
    }
    
    createParticles(){
        // we can customize the particle settings here
        // increase size and lifespan(lives longer)
        let settings = {
            color: color(200, 200, 200, random(50, 100)), 
            size: random(5, 15),  
            shape: 'circle',
            lifespan: random(60, 120) 
        };
        const p = new Particle(this.origin.x + random(-5, 5), this.origin.y, settings); // Spread the origin
        
        // Create upward velocity with some random
        p.velocity = createVector(random(-0.3, 0.3), random(-0.5, -1.5)); 
        p.acceleration = createVector(random(-0.01, 0.01), random(-0.005, 0.005)); // Add turbulence
        
      
        p.age = 1;
        p.initialSize = settings.size; // Store initial size
        
        return p;
    }
    
    update() {
        super.update();
        
        // Apply wind to all particles
        for (let particle of this.particles) {
            particle.velocity.add(this.wind);
            particle.velocity.add(this.gravity);
            
            // As the lifespan increases, increase age and fade out
            if (particle.age) {
                particle.age++;
                
                // increase the size slowly . Making it look more smoky
                if (particle.settings && particle.settings.size !== undefined) {
                    particle.settings.size *= 1.01; // Grow slightly
                } else if (particle.size !== undefined) {
                    particle.size *= 1.01; // Alternative size property
                } else if (particle.initialSize !== undefined) {
                    particle.size = particle.initialSize * (1 + particle.age * 0.01);
                }
                
                // Facde them out
                if (particle.settings && particle.settings.color) {
                    //_getAlpha is a p5.js function to get the alpha value of a color
                    // 
                    let currentAlpha = particle.settings.color._getAlpha();
                    particle.settings.color.setAlpha(max(0, currentAlpha - 2));
                }
            } else {
                particle.age = 1;
            }
        }
        
        // Change wind every 60 frames  like per second
        if (frameCount % 60 === 0) {
            // this pushes the wind to a new random value every second
            // Update for other needs.
            this.wind = createVector(random(-0.03, 0.03), random(-0.01, 0.01));
        }
    }
}
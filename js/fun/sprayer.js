class Sprayer {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        // where it should start from. 
        this.origin = createVector(this.x, this.y);
        // Default for now
        // Just to have something for now as default .
        // Just does not fit 
        this.gravity=createVector(0,0);
    }

    show() {
        for(let i=0; i<this.particles.length; i++) {
            const p = this.particles[i];
            p.show();
        }   
    }
    
    update() {
        // get the 
        for(let i=this.particles.length-1; i>=0; i--) {
            const p = this.particles[i];
            // Apply a force to each particle
            p.applyForce(this.gravity);
            p.update();
            // Remove dead particles Faded out
            if(p.isDead()) {
                this.particles.splice(i,1);
            }
        }
    }
    //start() {} // may be later
   // stop() {}//
    spray(howMany) {
        for(let i=0; i<howMany; i++) {
            const p = this.createParticles();
            this.particles.push(p);
        }
    }
    // Subclasses should implement this better
    //@todo i guess
    createParticles(){
        let settings={
            color:color(255,100,0),
            size:random(5,15),
            shape:'circle'
        };
        const p = new Particle(this.origin.x, this.origin.y,settings);
        return p;
    }

}
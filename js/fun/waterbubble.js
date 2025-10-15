
class WaterBubble  {
    constructor(x, y) {
        
        this.x = x;
        this.y = y;
        this.radius = random(5, 7);
        
        this.waterBubbles=[];
        this.howMany=30;
        this.acceleration = createVector(0, 0);
        this.waveForce = createVector(0, -0.01); // forve to simulate rising
        this.gravity = createVector(0, 0.01); // No gravity. A tiny downward force
        this.fadeStartY = 100; // Start fading when reaching 30% of the canvas height
        this.fadeEndY = 50; // Fully faded when reaching the top
    }

    createBuble(){
        this.particle_settings = {
            color: color(173, 216, 230), // Light blue color
            size: this.radius,
            shape: 'circle'
        };
        const b= new Particle(this.x+random(0,width), this.y+random(0,-height/2), this.particle_settings);
        // Set an initial upward velocity
        b.velocity = createVector(random(-0.5, 0.5), random(-1, -2));

        return b;
    }
    update() {
        //creae new bubbles if below the desired count
        while (this.waterBubbles.length < this.howMany) {
            this.waterBubbles.push(this.createBuble());
        }

        // Now loop through existing bubbles to update them
        for (let i =this.waterBubbles.length - 1; i >= 0; i--) {
            const b = this.waterBubbles[i];
            b.applyForce(this.waveForce); // Apply upward force
            b.applyForce(this.gravity); // Apply gravity force
            b.update();
            if (b.isDead() || b.position.y < 0) {
                this.waterBubbles.splice(i, 1); // Remove dead or out-of-bounds bubbles
            }
        }
    }
    
    show() {
        push();
        for (const b of this.waterBubbles) {
            b.show();
        }
        pop();
    }
}
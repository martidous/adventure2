class Particle {
  constructor(x, y, particle_settings) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    // magnitude and direction
    this.acceleration = createVector(0, 0);
    this.radius = 5;
    this.timeToLive = 255;
    // Later I should move everuything to a settings object
    this.color = particle_settings.color;
    this.size = particle_settings.size;
    this.shape = particle_settings.shape;
  }
  // this is a force to be applied to the particle
  // It will change the acceleration
  // F=ma  a=F/m  m=1 for now
  // we can apply any force we want to make it move in a certain way
  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    //start Fading
    this.timeToLive -= 2.0;
    // reset acceleration each cycle
    this.acceleration.mult(0);
  }
 isDead() {
        return this.timeToLive < 0;
    }
    show() {
        push();
        //fades as it dies
        let alpha = map(this.timeToLive, 0, 255, 0, 255);
        this.color.setAlpha(alpha);
        fill(this.color);
        noStroke();
        this.drawShape(this.shape);
        pop();
    }// To be implemented in subclasses

    drawShape(shape) {
        if (shape === 'circle') {
            ellipse(this.position.x, this.position.y, this.size);
        } else if (shape === 'square') {
            rectMode(CENTER);
            rect(this.position.x, this.position.y, this.size, this.size);
        } else if (shape === 'triangle') {
            let half = this.size / 2;
            triangle(
                this.position.x, this.position.y - half,
                this.position.x - half, this.position.y + half,
                this.position.x + half, this.position.y + half
            );
        }
        else if (shape === 'line') {
            stroke(this.color);
            strokeWeight(2);
            line(this.position.x, this.position.y, this.position.x, this.position.y + 10);
        }
    }
}

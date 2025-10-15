class Wave {
    constructor(x, y, width, amplitude = 20) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.amplitude = amplitude;
        // Array to hold  wave settinbgs
        this.waves = []; 
        //spacing between wave points
        this.offset = 0;
    }
    
    update() {
        // Update phase for each wave to create animation. Multiply speed by frameCount to animate
        for (let i = 0; i < this.waves.length; i++) {
            //phase is how much the wave has moved. declared in each wave object
            this.waves[i].phase = frameCount * this.waves[i].speed;
        }
    }
    
    show() {
        push();
        this.setupDrawing(); 
        
        for (let i = 0; i < this.waves.length; i++) {
            let wave = this.waves[i];
            this.drawWave(wave, i); 
        }
        pop();
    }
    
    setupDrawing() {
        // Default drawing setup
        noFill();
        strokeWeight(3);
    }
    // frequency: how many waves in a given length
    // speed: how fast the wave moves
    // amplitude: height of the wave
    // offset: vertical offset to stack multiple waves
    // color: color of the wave
    drawWave(wave, index) {
        // Default wave drawing - override in subclasses
        stroke(0, 100, 255);
        beginShape();
        // for each x position, calculate the y using sine function
        for (let x = 0; x <= this.width; x += 2) {
            let waveY = this.y + wave.offset + 
                       sin(x * wave.frequency + (wave.phase || 0)) * wave.amplitude;
            //vertex(this.x - this.width/2 + x, waveY);
            vertex(this.x + x, waveY);
        }
        endShape();
    }
}
class OceanWave extends Wave {
    constructor(x,y,waveWidth,amplitude=20){
      super(x,y,waveWidth,amplitude);
        
        // Wave configuration
        this.waves = [
            { frequency: 0.02, speed: 0.035, amplitude: amplitude*0.4, offset: 20, color: color(100, 180, 255, 150),phase:0 },
            { frequency: 0.015, speed: 0.04, amplitude: amplitude * 0.7, offset: 20, color: color(50, 150, 220, 170),phase:0 },
            { frequency: 0.01, speed: 0.02, amplitude: amplitude * 0.9, offset: 40, color: color(20, 100, 180, 200),phase:0 }
        ];
    }
    setupDrawing() {
        noStroke(); // Ocean waves are filled, not stroked
    }
    drawWave(wave, index) {
        // COLOR EACH WAVE LAYER
        fill(wave.color); 
        beginShape();
        vertex(this.x, this.y + wave.offset + 100); // Start from bottom
        for (let x = 0; x <= this.width; x += 10) {
            let waveY = this.y + wave.offset + 
                       sin(x * wave.frequency + (wave.phase || 0)) * wave.amplitude -160;
            vertex(this.x + x, waveY);
        }
        vertex(this.x + this.width, this.y + wave.offset + 100);
        vertex(this.x, this.y + wave.offset + 100); 
        endShape(CLOSE);
    }
}
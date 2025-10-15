class WaterWave extends Wave {
    constructor(x, y, width, amplitude = 20) {
        super(x, y, width, amplitude);
        
        // Sea-specific wave configuration
        // 3 layers of waves with different properties
        //phase is used to animate the wave movement
        this.waves = [
            { frequency: 0.015, speed: 0.03, amplitude: amplitude, offset: 0 ,phase:0},
            { frequency: 0.025, speed: 0.05, amplitude: amplitude * 0.7, offset: -10,phase:0 },
            { frequency: 0.035, speed: 0.07, amplitude: amplitude * 0.5, offset: -20,phase:0 }
        ];
    }
    
    setupDrawing() {
        noFill();
        strokeWeight(3);
    }
    
    drawWave(wave, index) {
        // Color gradient based on wave index
        let alpha = 200 - (index * 40);
        // Blue shades for water
        stroke(0, 100 + index * 30, 255, alpha); 
        
        beginShape();
        for (let x = 0; x <= this.width; x += 6) {
            let waveY = this.y + wave.offset + 
                       sin(x * wave.frequency + (wave.phase || 0)) * wave.amplitude;
            vertex(this.x - this.width/2 + x, waveY);
        }
        endShape();
    }
}
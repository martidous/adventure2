class WavyLeaves extends Wave {
    constructor(x, y, width, amplitude = 10) {
        super(x, y, width, amplitude);
        
        //I could make this more dynamic by passing in different wave configurations
        this.waves = [
            { frequency: 0.02, speed: 0.01, amplitude: amplitude, offset: 0 },
            { frequency: 0.03, speed: 0.015, amplitude: amplitude * 0.7, offset: -10 },
            { frequency: 0.025, speed: 0.008, amplitude: amplitude * 0.5, offset: -20 }
        ];
        
        this.foliageColors = [
            color(34, 139, 34, 180),  // green
            color(50, 205, 50, 160),  //  green
            color(0, 128, 0, 140)     // Dark green
        ];
    }
    
    setupDrawing() {
        noStroke();
    }
    
    drawWave(wave, index) {
        fill(this.foliageColors[index % this.foliageColors.length]);
        
        beginShape();
        // Start from bottom
        vertex(this.x, this.y + 20);
        
        // Create wavyness
        for (let x = 0; x <= this.width; x += 8) {
            let waveY = this.y + wave.offset + 
                       sin(x * wave.frequency + (wave.phase || 0)) * wave.amplitude;
            vertex(this.x + x, waveY);
        }
        
        // Close the shape.
        vertex(this.x + this.width, this.y + 20);
        endShape(CLOSE);
    }
}
class SandDunes extends Wave {
    constructor(x, y, width, amplitude = 30) {
        super(x, y, width, amplitude);
        

        this.waves = [
            { frequency: 0.008, speed: 0.008, amplitude: amplitude, offset: 0, color: color(237, 201, 175),phase:0 },
            { frequency: 0.012, speed: 0.006, amplitude: amplitude * 0.7, offset: 20, color: color(227, 191, 165),phase:0 },
            { frequency: 0.015, speed: 0.004, amplitude: amplitude * 0.5, offset: 40, color: color(217, 181, 155),phase:0 }
        ];
    }
    
    setupDrawing() {
        noStroke(); // Sand dunes are filled, not strokedb
    }
    //wave: the wave object with its properties
    //index: index of the wave in the waves array
    drawWave(wave, index) {
        fill(wave.color); // Each dune layer has its own color
        
        beginShape();
        // Start from bottom
        vertex(this.x, this.y + wave.offset + 100);
        // Draw the wave. for each x position, calculate the y using sine function
        for (let x = 0; x <= this.width; x += 10) {
            let duneY = this.y + wave.offset + 
                       sin(x * wave.frequency + (wave.phase || 0)) * wave.amplitude;
            vertex(this.x + x, duneY);
        }
        
       
        //adding 100 to y to make sure it goes below the bottom of the canvas
        vertex(this.x + this.width, this.y + wave.offset + 100);
        vertex(this.x, this.y + wave.offset + 100);
        endShape(CLOSE);
    }
}
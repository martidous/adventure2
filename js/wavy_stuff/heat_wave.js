class HeatWave extends Wave {
    constructor(x, y, width, amplitude = 2, lineCount = 4, spacing = 20) {
        super(x, y, width, amplitude);
        this.lineCount = lineCount;
        this.spacing = spacing;

        this.waves = [];
        for (let i = 0; i < lineCount; i++) {
            this.waves.push({
                frequency: 0.1,
                speed: 0.05,
                amplitude: amplitude,
                offset: i * spacing
            });
        }
    }

    setupDrawing() {
        stroke(255, 255, 255, 30);
        strokeWeight(1);
        noFill();
    }

    drawWave(wave, index) {
        let yBase = this.y + wave.offset;
        beginShape();
        
        // Add first point twice for curveVertex to work
        let firstY = yBase + sin(0 * wave.frequency + frameCount * wave.speed + index) * wave.amplitude;
        curveVertex(0, firstY);
        
        for (let x = 0; x <= this.width; x += 1) {
            let waveY = yBase + sin(x * wave.frequency + frameCount * wave.speed + index) * wave.amplitude;
            curveVertex(x, waveY);
        }
        
        // Add last point twice for curveVertex to work
        let lastY = yBase + sin(this.width * wave.frequency + frameCount * wave.speed + index) * wave.amplitude;
        curveVertex(this.width, lastY);
        
        endShape();
    }

    show() {
        this.setupDrawing();
        for (let i = 0; i < this.waves.length; i++) {
            this.drawWave(this.waves[i], i);
        }
    }
}
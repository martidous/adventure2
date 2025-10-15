class RainforestMountain extends Item {
  constructor(name, x, y, size) {
    super(name, x, y, size);

    this.colorMain = color(100, 120, 100);
    this.colorSmall = color(120, 140, 120);

    this.noiseOffsetMain = random(1000);
    this.noiseOffsetSmall = random(1000, 2000);

    // base dimensions and aspect ratio
    this.baseWidth = 800;
    this.baseHeight = 400;
    this.aspectRatio = this.baseWidth / this.baseHeight; // 2:1 ratio

    // Calculate dimensions
    // scale by width OR height
    this.actualWidth = this.size;
    this.actualHeight = this.size / this.aspectRatio;
    this.scaleFactor = this.actualWidth / this.baseWidth;
  }
  show() {
    super.show();
  }

  // needed to get the center of the mountain for positioning lava on it
  // Also need the peak position for lava to start from
  getCenterX() {
    return this.x + this.actualWidth / 2;
  }
  // After translation and scaling, the peak of the large mountain is at:
    getLargeMountainPeakLocal() {
        // Peak position relative to the translated coordinate system (0,0)
        let localPeakX = (this.baseWidth / 2) * this.scaleFactor;
        let localPeakY = -(this.baseHeight / 2) * this.scaleFactor; // Negative because peak is above center
        
        return {
            x: localPeakX,
            y: localPeakY
        };
    }
  getLargeMountainPeak() {
    let peakX = this.x + (this.baseWidth / 2) * this.scaleFactor; // Center of scaled mountain
    let peakY = this.y - this.baseHeight * this.scaleFactor; // Top of scaled mountain
    console.log("Peak position:", peakX, peakY);
    return {
      x: peakX,
      y: peakY,
    };
  }
  getSmallMountainPeakPosition() {
    let smallPeakX = this.x + (this.baseWidth * 0.75) * this.scaleFactor; // Center of small mountain (75% across)
        let smallPeakY = this.y - (this.baseHeight * 0.625) * this.scaleFactor; // Peak of small mountain
        
        return {
            x: smallPeakX,
            y: smallPeakY
        };
  }
  getRidgePosition() {
       // Ridge is roughly at 25% of the base width and 50% of the base height
    }
    

  create() {
    push();

    // Scale based on actual vs base dimensions
    let scaleFactorX = this.actualWidth / this.baseWidth;
    let scaleFactorY = this.actualHeight / this.baseHeight;

    // Use uniform scaling to maintain proportions
    let scaleFactor = scaleFactorX; // or use min(scaleFactorX, scaleFactorY) for best fit
    scale(scaleFactor);

    // MAIN MOUNTAIN - using base dimensions
    fill(this.colorMain);
    noStroke();
    beginShape();
    vertex(0, this.baseHeight);

    // Left slope - using base dimensions
    for (let x = 0; x <= this.baseWidth / 2; x += 10) {
      let baseY = map(x, 0, this.baseWidth / 2, this.baseHeight, 0);
      let noiseY = noise(x * 0.02 + this.noiseOffsetMain) * 30;
      vertex(x, baseY + noiseY);
    }

    // Right slope - using base dimensions
    for (let x = this.baseWidth / 2; x <= this.baseWidth; x += 10) {
      let baseY = map(
        x,
        this.baseWidth / 2,
        this.baseWidth,
        0,
        this.baseHeight
      );
      let noiseY = noise(x * 0.02 + this.noiseOffsetMain) * 30;
      vertex(x, baseY + noiseY);
    }

    vertex(this.baseWidth, this.baseHeight);
    endShape(CLOSE);

    // SMALLER MOUNTAIN - using proportional base dimensions
    fill(this.colorSmall);
    noStroke();
    beginShape();
    vertex(this.baseWidth * 0.625, this.baseHeight); // 500/800 = 0.625
    curveVertex(this.baseWidth * 0.625, this.baseHeight);

    // Left slope of smaller mountain
    for (
      let x = this.baseWidth * 0.625;
      x <= this.baseWidth * 0.8125;
      x += 10
    ) {
      // 650/800 = 0.8125
      let baseY = map(
        x,
        this.baseWidth * 0.625,
        this.baseWidth * 0.8125,
        this.baseHeight,
        this.baseHeight * 0.375
      ); // 150/400 = 0.375
      let noiseY = noise(x * 0.03 + this.noiseOffsetSmall) * 20;
      curveVertex(x, baseY + noiseY);
    }

    // Right slope of smaller mountain
    for (let x = this.baseWidth * 0.8125; x <= this.baseWidth; x += 10) {
      let baseY = map(
        x,
        this.baseWidth * 0.8125,
        this.baseWidth,
        this.baseHeight * 0.375,
        this.baseHeight
      );
      let noiseY = noise(x * 0.03 + this.noiseOffsetSmall) * 20;
      curveVertex(x, baseY + noiseY);
    }

    curveVertex(this.baseWidth, this.baseHeight);
    vertex(this.baseWidth, this.baseHeight);
    endShape(CLOSE);

    pop();
  }
}

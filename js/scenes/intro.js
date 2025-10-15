class Intro extends Scene {
  constructor() {
    super("Intro");
    this.description = "Welcome to the Adventure Game!";
    this.goal = "Press Start to begin your journey!";
    this.demoPlayer=new Player(450,200);
    // Terrain Set up
    this.setTerrain(new Land(450, 300, 850, 550, 1));

   // Intro colot
    this.topColor = color(200, 50, 50); 
    this.bottomColor = color(200, 120, 80); 

    // Game title
    this.gameTitle = "TREASURE HUNTER";
    this.subtitle = "An Epic Adventure Awaits";
    this.description ='Your mission is to recover lost relics scattered across the world — fragments of an ancient civilization '
    +'once united by mystery and myth.'
    + 'From the burning sands of Egypt to the misty rainforest and the sunken ruins of the ocean, '
    +'each land holds two or more true artifacts and many decoys.'
    +' Only by finding all the genuine relics can you unlock the final'+
    ' secret and complete the museum exhibit that will reveal their forgotten story.';
    // Start button
    this.startButton = {
      x: width / 2 - 100,
      y: height / 2 + 50,
      width: 200,
      height: 60,
      text: "START GAME",
      isHovered: false,
      isPressed: false,
    };
    this.topColor = color(64, 224, 208);; 
    this.bottom = color(0, 70, 140);
    // Instructions
    this.instructions = [
      "Use arrow keys to move",
      "Collect items to earn points",
      "Need 200 points per level to advance",
      "Avoid fake items - they cost points!",
    ];

    // hold stars for background
    this.stars = [];
    this.createStars();

    // animate
    this.titleScale = 1.0;
    this.titleDirection = 1;
  }

  createStars() {
    for (let i = 0; i < 50; i++) {
      this.stars.push({
        x: random(width),
        y: random(height / 2),
        size: random(1, 3),
        brightness: random(100, 255),
        twinkleSpeed: random(0.02, 0.05),
      });
    }
  }

  updateStars() {
    for (let star of this.stars) {
      star.brightness += sin(frameCount * star.twinkleSpeed) * 2;
      star.brightness = constrain(star.brightness, 50, 255);
    }
  }

  drawStars() {
    push();
    noStroke();
    for (let star of this.stars) {
      fill(255, 255, 255, star.brightness);
      ellipse(star.x, star.y, star.size);
    }
    pop();
  }

  updateStartButton() {
    // Check if mouse is over button
    this.startButton.isHovered =
      mouseX >= this.startButton.x &&
      mouseX <= this.startButton.x + this.startButton.width &&
      mouseY >= this.startButton.y &&
      mouseY <= this.startButton.y + this.startButton.height;
  }

  drawStartButton() {
    push();

    // Styled button with background
    let buttonX = width / 2 ;
    let buttonY = height / 2+80;
    let buttonWidth = 200;
    let buttonHeight = 60;

    // Button background
    if (this.startButton.isHovered) {
      fill(255, 160, 0);
      noStroke();
    } else {
      fill(255, 140, 20);
      noStroke();
    }
    rect(buttonX, buttonY, buttonWidth, buttonHeight, 10);

    // Button text
    textAlign(CENTER, CENTER);
    textSize(24);
    textStyle(BOLD);
    fill(255);
    text("CLICK TO START", width / 2, height / 2 + 80);

    pop();
  }

  drawTitle() {
    push();
    
    // Animated title scale
    this.titleScale += this.titleDirection * 0.005;
    if (this.titleScale > 1.1) this.titleDirection = -1;
    if (this.titleScale < 0.9) this.titleDirection = 1;
    
    textAlign(CENTER);
    fill(255, 215, 0); 
    noStroke();
    textSize(48 * this.titleScale);
    textStyle(BOLD);
    text(this.gameTitle, width/2, height/3 - 50); 
    
    // Subtitle
    fill(255, 255, 200);
    noStroke();
    textSize(20);
    textStyle(NORMAL);
    text(this.subtitle, width/2, height/2 - 10); 
    
    pop();
  }

  drawInstructions() {
    push();

    // Instructions panel background
    fill(0, 0, 0, 180);
    noStroke();
    rectMode(CORNER);
    rect(250, height / 2 + 170, 400, 140, 8);

    textAlign(LEFT);
    fill(255, 215, 90);
    textSize(16);
    textStyle(BOLD);
    text("HOW TO PLAY:", 340, height / 2 + 190);

    fill(255, 255, 200);
    textSize(14);
    textStyle(NORMAL);

    for (let i = 0; i < this.instructions.length; i++) {
      text(`• ${this.instructions[i]}`, 340, height / 2 + 220 + i * 22);
    }

    // Credits
    textAlign(RIGHT);
    fill(200, 208, 150);
    textSize(12);
    text("Created by: Martuza", width - 50, height - 30);

    pop();
  }

  drawGradientBackground() {
   super.drawGradientBackground(this.topColor, this.bottomColor);
  }

  drawDescription() {
    push();

    // Description panel background
    fill(0, 0, 0, 150);
    noStroke
    rectMode(CENTER);
    rect(width / 2, height / 2 - 90, width - 160, 180, 8);

    textAlign(CENTER);
    fill(255, 255, 200);
    strokeWeight(0);
    textSize(16);
    textStyle(NORMAL);

    let maxWidth = width - 200;
    let words = this.description.split(" ");
    let line = "";
    let lines = [];
    for (let word of words) {
      let testLine = line + word + " ";
      if (textWidth(testLine) > maxWidth && line !== "") {
        lines.push(line);
        line = word + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    let startY = height / 2 - 150;
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], width / 2, startY + i * 22);
    }

    pop();
  }
  // Mouse click handler
  handleMouseClick() {
    if (this.startButton.isHovered) {
      this.startButton.isPressed = true;
      setTimeout(() => {this.startGame();}, 200);
    }
  }

  startGame() {
    console.log("Starting game...");
    initializeGameState();
    // Set Egypt as the first scene
    startScene(0); 
  }

  show() {
    this.drawGradientBackground();
    this.terrain.show();
    this.demoPlayer.show();
    this.updateStars();
    this.drawStars();
    this.drawTitle();
    this.drawDescription();
    this.updateStartButton();
    this.drawStartButton();
    this.drawInstructions();
  }

  addCharacters() {
    //may be 
  }

  setScene() {
    // Any additional setup
  }
}

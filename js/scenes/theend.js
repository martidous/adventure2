class TheEnd extends Scene {
  constructor() {
    super("TheEnd");
    this.description =
      "Congratulations! You have completed your adventure.";
    this.goal = "Celebrate your success!";
    // Terrain Set up
    this.setTerrain(new Land(450, 300, 850, 550, 1));
    //this.backgroundMusic = "assets/music/theend_theme.mp3";
    // Set up Items and Characters
    this.sun = new Sun(700, 100, 80);
    this.celebration = new Confetti(400, 200, 250);
    // For Background Gradient
    this.topColor = color(135, 206, 235); // Light blue
    this.bottom = color(34, 139, 34); // Green

    this.trophy = new ImageItem("trophy", 450, 400, 50, "assets/images/dude.png");
    this.trophy.tobeCollected = true;

    this.player = null; // Player will be set in play.js
    
    // Add professor character
    this.professor = new Role("Professor", 150, 450);
    this.professor.body_color = color(139, 69, 19); // Brown coat
    this.professor.pant_color = color(0, 0, 139); // Dark blue
    this.professor.leg_color = color(101, 67, 33); // Brown shoes
    this.professor.setMagnigication(0.7);
    this.professor.changeSize();
    
    // Professor's speech bubble
    this.professorSpeech = new SpeechBubble("professorSpeech", this.professor.x, this.professor.y - 100, 50, 110);
    this.professorSpeech.message = "Your mission isn't complete yet.\nCome back next week for more adventures!";
    this.professorSpeech.isVisible = true;
    
    // Display settings
    this.showItemsStartY = 50;
    this.itemSpacing = 30;
    
  }

  // Display collected items and score
  displayGameResults() {
    // Title
    push();
    fill(255);
    stroke(0);
    strokeWeight(2);
    textAlign(CENTER);
    textSize(32);
    text("MISSION REPORT", width/2, 60);
    
    // Level achieved 
    if (typeof currentLevel !== 'undefined') {
      textSize(28);
      fill(255, 215, 0); // Gold color
      text(`Level ${currentLevel} Completed!`, width/2, 75);
    }
    
    // Score
    textSize(24);
    fill(255, 215, 0); // Gold color
    text(`Total Score: ${playerScore} points`, width/2, 105);
    
    // Points message
    textSize(18);
    if (playerScore >= 100) {
      fill(144, 238, 144); 
      text("You earned enough points to advance!", width/2, 130);
    } else {
      fill(255, 200, 200); 
      text(`You needed 100+ points to advance. Keep collecting items!`, width/2, 130);
    }
    
    // header
    textSize(20);
    fill(255);
    text("Items Collected:", width/2, 165);
    
    // collected item
    let yPos = 195;
    if (itemsCollected.length > 0) {
      textSize(16);
      textAlign(LEFT);
      for (let i = 0; i < itemsCollected.length; i++) {
        let item = itemsCollected[i];
        fill(144, 238, 144); 
        text(`✓ ${item.itemName} - ${item.points} points`, width/2 - 150, yPos);
        yPos += this.itemSpacing;
      }
    } else {
      textAlign(CENTER);
      textSize(16);
      fill(255, 100, 100); 
      text("No items collected!", width/2, yPos);
    }
    
    // How many scenes completed
    yPos += 20;
    textAlign(CENTER);
    textSize(18);
    fill(255, 255, 0); 
    text("Scenes Explored:", width/2, yPos);
    
    yPos += 25;
    textSize(14);
    let scenesCompleted = this.countCompletedScenes();
    if (scenesCompleted > 0) {
      fill(144, 238, 144);
      text(`${scenesCompleted} scene(s) completed!`, width/2, yPos);
    } else {
      fill(255, 100, 100);
      text("Keep exploring to complete scenes!", width/2, yPos);
    }
    yPos += 40;
    textAlign(CENTER);
    textSize(16);
    fill(255, 255, 150);
    text("Remember: You need 200 points to advance!", width/2, yPos);
  
    pop();
}
  
  // Count how many scenes have been completed
  countCompletedScenes() {
    let completed = 0;
    // Check each scene index
    for (let sceneIndex = 0; sceneIndex <= 3; sceneIndex++) {
      let sceneItems = itemsToCollect.filter(item => item.sceneIndex === sceneIndex);
      let collectedFromScene = itemsCollected.filter(item => item.sceneIndex === sceneIndex);
      
      if (sceneItems.length > 0 && collectedFromScene.length === sceneItems.length) {
        completed++;
      }
    }
    return completed;
  }
  
  // Show instructions for continuing
  displayContinueInstructions() {
    push();
    textAlign(CENTER);
    fill(255);
    textSize(16);
    text("Press 'R' to restart your adventure", width/2, height - 60);
    text("Press 'M' to toggle music", width/2, height - 40);
    text("Use arrow keys to move around", width/2, height - 20);
    pop();
  }

  // Override the show method to include our custom displays
  show() {
    // Draw gradient background
    this.drawGradientBackground();
    
    // Show terrain
    this.terrain.show();
    
    // Show scene objects
   // this.sun.show();
    if (frameCount % 5 == 0) {
        this.celebration.particles.push(this.celebration.createParticles());
    }
    this.celebration.update();
    this.celebration.show();
    //this.trophy.show();
    
    // Show professor
    if (this.professor) {
      this.professor.show();
    }
    
    // Show professor's speech bubble
    if (this.professorSpeech && this.professorSpeech.isVisible) {
      this.professorSpeech.show();
    }
    
    // Show player if exists
    if (this.player) {
      this.player.show();
    }
    
    // game results
    this.displayGameResults();
    
    // continue instructions
    this.displayContinueInstructions();
  }
  
  // override to draw gradient background
  drawGradientBackground() {
    for (let i = 0; i <= height; i++) {
      let inter = map(i, 0, height, 0, 1);
      let c = lerpColor(this.topColor, this.bottom, inter);
      stroke(c);
      line(0, i, width, i);
    }
  }

  addCharacters() {
    if (!this.player) {
      this.player = new Player(450, 500);
      this.player.setTerrain(this.terrain);
    }
  }

  setScene() {
    
  }
}
class RainForest extends Scene {
  constructor() {
    super("RainForest");
    
    this.description =
      "You are in a lush rainforest, surrounded by towering trees and the sounds of wildlife.";
    this.goal = "Find the rare 'Ankh' & 'Scarab'.";
    // Terrain Set up
    this.setTerrain(new Forest(450, 300, 850, 550, 5));
    //this.backgroundMusic = "assets/music/rainforest_theme.mp3";
    // Set up Items and Characters
    this.sun = new Sun(700, 100, 80);
    // this.tree1 = new Tree(200, 450, 50);
    // this.tree2 = new Tree(800, 450, 30);
    this.trees1 = new Tree(810, 450, 100);
    this.rock1 = new Stones(300, 500, 40);
    this.rock2 = new Stones(600, 520, 30);
    this.rock3 = new Stones(400, 480, 20);
    this.rain = new Rain(450, 0, 800);
    
    this.column= null;
    this.column2= null;
   
    //this.column.canGlow=true;
    // Moved to play.js for better game managment
    this.rainforestMountain = new RainforestMountain("RainMountain",20,250,400);
    this.rainforestMountain_right = new RainforestMountain("RainMountain",550,250,400);
    // had to implement getPeakPosition() in rainforestMountain.js
    let peakPos = this.rainforestMountain.getLargeMountainPeak();
    console.log("Using peak position for lava:", peakPos.x, peakPos.y);
    let small=this.rainforestMountain.getSmallMountainPeakPosition();
    this.smoke = new Smoke(small.x+20, small.y+200, 30);

    let centerX = this.rainforestMountain.getCenterX();
    this.lava = new Lava(peakPos.x, peakPos.y + 200);
    this.fire=new Fire(peakPos.x, peakPos.y+200,20);
    // For Background Gradient
    this.topColor = color(34, 139, 34); // Forest green
    this.bottom = color(0, 100, 0);

    //forest stuff
    this.foliage1 = new ForestLeaves(150, 520, 40);
    this.foliage2 = new ForestLeaves(750, 520, 60);
    this.foliage3 = new ForestLeaves(400, 540, 30);

    this.forrestLeaves = [];
    this.forresTrees = [];
    this.createTrees();
    // Trees  
    this.tree1 = new ForestTree(200, 450, 50);
    this.tree2 = new ForestTree(800, 450, 30);
    this.tree3 = new ForestTree(710, 450, 100);

    this.relic_fly=new ImageItem("relic_fly",850,400,40,"assets/images/egyptfly.png");
    this.relic_fly.tobeCollected=true;
    this.relic_bow=new ImageItem("relic_bow",30,410,30,"assets/images/egyptbow.png");
    this.relic_bow.tobeCollected=true;
    this.fake_fly=new ImageItem("fake_fly",750,250,40,"assets/images/fake_fly.png");
    this.fake_fly.tobeCollected=false;
    this.fake_fly.messageBubble="This is a fake relic! Don't collect it! Loose Points";
    this.fake_bow=new ImageItem("fake_bow",280,490,30,"assets/images/fake_bow.png");
    this.fake_bow.tobeCollected=false;
    this.fake_bow.messageBubble="This is a fake relic! Don't collect it! Loose Points";

    this.guard1 = null;
    this.guards=[];
    this.addGuards();
    // SETUP STORY
    this.setUpStoryTeller();
    this.createColumns();
    
    //Animations
    // Add particle creation like in sketch.js
   // this.customiseVillian();
  }
  showItems(){
    this.relic_fly.show();
    this.relic_bow.show();
    this.fake_fly.setRotation(frameCount / 100.0);
    this.fake_fly.show();
    this.fake_bow.show();
   
  }
  setUpStoryTeller() {
    this.storyTeller=new StoryTeller("RainForestStory",450,690,300);
    this.storyTeller.textSize=20;
    this.storyTeller.title="RainForest";
    this.storyTeller.message="You’ve arrived in the lush rainforest, where ancient treasures lie hidden beneath the canopy. Here, too, you’ll find two true artifacts and a few fakes. The locals may guide you with hints .Watch out for mischievous creatures who might lead you astray";
  }
 



  createTrees() {
    let terrainLeft = this.terrain.x - this.terrain.w/2;   
    let terrainRight = this.terrain.x + this.terrain.w/2; 
    
    let gapSize = 30; 
    let startX = terrainLeft + 100; 
    
    // Place leaves horizontally with fixed gaps
    for (let i = 0; i < 30; i++) {
        let x = startX + (i * gapSize);
        
        //  don't go past terrain boundary
        if (x > terrainRight - 100) break;
        
    }
    
   
    for (let i = 0; i < 30; i++) {
        let x = startX + 55 + (i * gapSize); // Offset by 75px from leaves
        
        // Make sure we don't go past terrain boundary
        if (x > terrainRight - 100) break;
        
        let y = random(450, 520);
        this.forresTrees.push(new ForestTree(x, y, random(80, 100)));
    }
}
  showTrees() {
    for (let tree of this.forresTrees) {
      tree.show();
    }
    
  }
  show() {
    push();
    this.drawGradientBackground(color(34, 139, 34), color(0, 100, 0));
    
    player.do_rotate=false;
    
    super.show();
    //
    this.sun.glow("yellow");
    this.sun.show();

    this.rainforestMountain.show();
    this.rainforestMountain_right.show();
    this.customiseVillian();
    //
    
    //this.trees1.glow("green");
   // this.trees1.show();

   
    this.rock1.show();
    this.rock2.show();
    this.rock3.show();
    if (frameCount % 3 == 0) {
      this.rain.particles.push(this.rain.createParticles());
    }
    if (frameCount % 2 == 0) {
      //lava every 2 frames
      this.lava.particles.push(this.lava.createParticles());
    }
    if (frameCount % 2 == 0) {
      // Spawn lava every 2 frames
      this.fire.particles.push(this.fire.createParticles());
    }

    this.showTrees();
    
    this.lava.update();
    this.lava.show();

    this.rain.update();
    this.rain.show();
    this.smoke.update();
    if (frameCount % 15 == 0) {
    this.smoke.particles.push(this.smoke.createParticles());
    }
    this.smoke.show();
    this.foliage1.show();
    this.showGuards();
    this.showColumns();
    // SHOW THE STORY
    this.storyTeller.show();
    this.manageSpeechBubbles();
    //this.manageItemMeessage();
    this.showItems();
    pop();
  }
  addGuards() {
    // Add guards to the scene
    this.guard1 = new Role("Guard1", 800, 500, 1.0);
    this.guard1.body_color = "blue";
    this.guard1.head_color = "pink";
    this.guard1.arm_color = "blue";
    this.guard1.leg_color = "blue";
    this.guard1.pant_color = "blue";
    this.guard1.magnigication = 1.5; // magnification factor
    this.guard1.speechBaloon=new SpeechBubble("guard1Speech",this.guard1.x,this.guard1.y-100,50,60);
    this.guard1.speechBaloon.message=("You shall not pass without permission.");
   
    this.guard1.decreaseSizeOnMovement = false; // Do not decrease size on movement
    for(let i=0;i<4;i++){
        let guard=new Role("RainGuard",200+i*50,490);
        guard.setTerrain(this.terrain);
        guard.body_color=color(100, 215, 0); // Gold
        guard.pant_color=color(0, 0, 255); // Blue
        guard.leg_color=color(139, 69, 19); // Brown
        guard.setMagnigication(0.5);
        guard.changeSize();
        this.guards.push(guard);
    }
  }
  showGuards() {
    for (let guard of this.guards) {
      guard.show();
    }
    this.guard1.show();
   
  }
  customiseVillian() {
   // villian.magnigication = 2.0; // magnification factor
    villian.leg_color = "green";
    villian.body_color = "red";
    villian.head_color = "purple";
    villian.arm_color = "green";
    villian.pant_color = "red";
  }

  createColumns() {
    this.column= new KinglyColumns(850,430,50);
    this.column.red=10;
    this.column.green=150;
    this.column.blue=80;
    this.column.fillColor=color(this.column.red,this.column.green,this.column.blue);

    this.column2= new KinglyColumns(30,425,50);
    this.column2.red=10;
    this.column2.green=150;
    this.column2.blue=80;
    this.column2.fillColor=color(this.column.red,this.column.green,this.column.blue);
    //this.column.canGlow=true;
  }
  showColumns() {
    this.column.show();
    this.column2.show();
  }

  manageSpeechBubbles() {
    // Show speech bubble if player is close to guard1
    if (this.guard1.isCloseToAnotherRole(player, 80)) {
      this.guard1.speechBaloon.show();
    }
    for(let guard of this.guards){
        if(guard.isCloseToAnotherRole(player, 80)){
            guard.speechBaloon=new SpeechBubble("guardSpeech",guard.x,guard.y-100,50,60);
            guard.speechBaloon.message=("Halt! You shall not pass without the Chief's permission.");
            guard.speechBaloon.show();
        }
    }
  }
  manageItemMeessage() {
    // Show message if player is close to item to collect
    if (this.relic_fly.isCloseToPlayer(player, 50)) {
        this.relic_fly.messageBubble.x=this.relic_fly.x;
        this.relic_fly.messageBubble.y=this.relic_fly.y-100;
        this.relic_fly.messageBubble.show();
    }
    if (this.relic_bow.isCloseToPlayer(player, 50) ) {
        this.relic_bow.messageBubble.x=this.relic_bow.x;
        this.relic_bow.messageBubble.y=this.relic_bow.y-100;
        this.relic_bow.messageBubble.show();
    }
  }
  setScene() {}
}

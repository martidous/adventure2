class Egypt extends Scene {
  constructor() {
    super("Egypt");
    this.description =
      "You are in the ancient land of Egypt, surrounded by pyramids and the Nile River.";
    this.goal = "Find the hidden artifacts: Vase and Gold.";
    // Terrain Set up
    this.setTerrain(new Desert(450, 300, 850, 550, 2));
    //this.backgroundMusic = "assets/music/egypt_theme.mp3";
    // Set up Items and Characters
    this.sun = new Sun(700, 100, 80);
    this.left_pyramid = new Pyramid(240, 400, 200);
    this.right_pyramid = new Pyramid(600, 415, 100);
    this.tree2 = new Tree(800, 450, 30);
    this.trees1= new Tree(710, 450, 100);
    this.broken_columns = new BrokenColumns(380, 440, 50);
    this.broken_columns.fillColor=color(140, 140, 100);
    this.kingcolumns_left = new KinglyColumns(this.left_pyramid.x-this.left_pyramid.size, this.left_pyramid.y+50, 100);
    this.kingcolumns_right = new KinglyColumns(this.left_pyramid.x-this.left_pyramid.size+30, this.left_pyramid.y+60, 80);
    this.stones = new Stones(120, 500, 50);
    this.aGuy=new Villain(128,500);
    
    // for Backfround Gradient
    this.topColor = color(135, 206, 235);   // Light blue
    this.bottom = color(255, 200, 100); 
    //Animations
    this.heatwave = new HeatWave(this.terrain.x - this.terrain.w / 2, 435,850,30);
    this.sandwave = new SandDunes(this.terrain.x - this.terrain.w / 2,435,850,30);
    this.sanParticles = new SandParticles(this.terrain.x - this.terrain.w / 2,435,this.terrain.w,200);
    // Moved to play.js for better game managment
    //this.player = new Player(500, 500);
    //this.player.setTerrain(this.terrain);

    // define Items to collect
    this.gold = null;
    this.vase = null;
    //fake items
    this.fake_vase = null;
    this.coin= null;
    this.fake_coin = null;

    this.setImageItemsToCollect();
    this.setupFakeItems();
    
    //createGuards()
    this.guards=[];
    for(let i=0;i<4;i++){
        let guard=new Role("Guard",this.left_pyramid.x+i*50,this.left_pyramid.y+100);
        guard.setTerrain(this.terrain);
        guard.body_color=color(255, 215, 0); // Gold
        guard.pant_color=color(0, 0, 255); // Blue
        guard.leg_color=color(139, 69, 19); // Brown
        guard.setMagnigication(0.2);
        guard.changeSize();
        this.guards.push(guard);
    }
    // The main guard
    this.guard=new Role("Guard",this.left_pyramid.x+50,this.left_pyramid.y+100);
    this.guard.setTerrain(this.terrain);
    this.guard.body_color=color(255, 215, 0); // Gold
    this.guard.pant_color=color(0, 0, 255); // Blue
    this.guard.leg_color=color(139, 69, 19); // Brown
    this.guard.setMagnigication(0.5);
    this.guard.changeSize();
    this.guard.speechBaloon=new SpeechBubble("guardSpeech",this.guard.x,this.guard.y,50,60);
    this.guard.speechBaloon.message=("Halt! You shall not pass without the Pharaoh's permission.");


    // The wizard
    this.wizard=new Role("Wizard",this.right_pyramid.x+20,this.right_pyramid.y+50);
    this.wizard.setTerrain(this.terrain);
    this.wizard.body_color=color(138, 43, 226); // BlueViolet
    this.wizard.pant_color=color(75, 0, 130); // Indigo
    this.wizard.leg_color=color(0, 0, 255); // Blue
    this.wizard.setMagnigication(0.5);
    this.wizard.changeSize();
    this.wizard.speechBaloon=new SpeechBubble("wizardSpeech",this.wizard.x,this.wizard.y,50,60);
    this.wizard.speechBaloon.message=("Look at the bright sand patch — the ring will be there. Check hollow stones for the vase.");
    this.speechBubble=new SpeechBubble(this.wizard.x,this.wizard.y-50,150,50);
    this.speechBubble.message=("Wrong Item Dude !! You loose points for that !!");
    //this.storyTeller=null;
    /****** SET THE STORY TELLER */
    this.setUpStoryTeller();
   
  }
  // Render everything in the scene
  show() {
    push();
          /****** ADJUST FOR EACH SCENE */
    if(typeof player !== 'undefined' && player) {
      console.log("Setting decreaseSizeOnMovement for player in Egypt scene");
        player.decreaseSizeOnMovement = false;
    }
  

    /************* */
    this.drawGradientBackground(this.topColor, this.bottom);
   
    super.show();
    
    player.do_rotate=false;
    //heatwave
    this.heatwave.update();
    this.heatwave.show();
    //sand particles
    this.sanParticles.update();
    this.sanParticles.show();
    //sandwave
    this.sandwave.update();
    this.sandwave.show();
    //brokwn columns
    this.broken_columns.show();
    //Sun
    this.sun.glow("yellow");
    this.sun.show();
    //Pyramids
    this.left_pyramid.show();
    this.right_pyramid.show();
    //this.gold.glow("yellow");
    // check if he item is already collected
    // If not collected, show it

    // Rotate the gold slowly and show closeness if player is near
    // should add to other items
    if (!this.gold.collected){
      this.gold.setRotation(frameCount / 100.0);
      //this.gold.glow("yellow");
      this.gold.show(); 
      this.gold.showCloseness_radius(player, 50);

    }
   
    this.sanParticles.show();
    //this.sandwave.show();
    //this.broken_columns.show();
    //this.trees.show();
    this.stones.show();
    // show th e kingly columns
    this.kingcolumns_left.show();
    this.kingcolumns_right.show();
    // show trees
    this.trees1.glow("green");
    this.trees1.show();
    this.tree2.glow("red");
    this.tree2.show();
    //customise villian
    this.customiseVillian();
    //show guards
    this.addGuards();
    this.guard.show();
    this.wizard.show();
    this.aGuy.show();
    //show speech bubbles if player is close
    this.manageSpeechBubbles();
    this.manageItemMeessage();
    this.storyTeller.show();

   //*vase to collect. @todo add an identifier for collections status
   this.vase.glow("green");
   this.vase.show();
    //fake vase. Add sound when close . 
   this.fake_vase.show();
   //coin
   this.coin.show();
   //fake coin
   this.fake_coin.canGlow=true;
   this.fake_coin.show();  
    // Moved these to play.js for better game managment
   // this.player.show();
    //this.player.smootherMove(this.player.speed);
    pop();
  }
  


  addGuards() {
     //displlay guards
    for(let g of this.guards){
        g.show();
    }
  }
  setUpStoryTeller() {
    this.storyTeller=new StoryTeller("StoryTeller",450,690,300);
    this.storyTeller.textSize=20;
    this.storyTeller.title="Egypt";
    this.storyTeller.message="Welcome to the sands of ancient Egypt! Your mission here is to find two genuine artifacts hidden among the ruins. But beware—some objects are decoys and will cost you points( or all points) if you choose them.";
  }
  // Set up the image items
  // 
  setImageItemsToCollect() {
    this.gold = new Gold(240, 290, 20);
    this.gold.tobeCollected=true;
    this.vase = new ImageItem("vase", 60, 480, 50, "assets/images/vase1.png");
    this.vase.tobeCollected=true;
   
  }
  setupFakeItems() {
    this.fake_vase = new ImageItem("fake_vase", 750, 480, 50, "assets/images/vase2.png");
    this.fake_vase.tobeCollected=false;
    this.fake_vase.messageBubble=new SpeechBubble("fakeVaseMessage",this.fake_vase.x,this.fake_vase.y-50,55,50);
    this.fake_vase.messageBubble.message=("This vase looks old but it's just a replica.Loose points");
    // coin
    this.coin = new ImageItem("coin", 330, 460, 20, "assets/images/bitcoin.png");
    this.coin.tobeCollected=false;
    this.coin.messageBubble=new SpeechBubble("coinMessage",this.coin.x,this.coin.y-50,100,50);
    this.coin.messageBubble.message=("shiny but it's not the gold you need. loose points");
    // fake coin
    this.fake_coin = new ImageItem("fake_coin", 500, 400, 20, "assets/images/nft.png");
    this.fake_coin.tobeCollected=false;
    this.fake_coin.messageBubble=new SpeechBubble("fakeCoinMessage",this.fake_coin.x,this.fake_coin.y-50,50,50);
    this.fake_coin.messageBubble.message=("This coin is just a digital NFT, not real gold. loose  points");
  }
  // Tobe implemented later
  addCharacters() {


  }
  setScene() {}
  manageItemMeessage(){
    if(this.fake_vase.isCloseToPlayer(player,50)){
        this.fake_vase.messageBubble.x=this.fake_vase.x;
        this.fake_vase.messageBubble.y=this.fake_vase.y-100;
        this.fake_vase.messageBubble.show();
    }
    if(this.fake_coin.isCloseToPlayer(player,50)){
        this.fake_coin.messageBubble.x=this.fake_coin.x;
        this.fake_coin.messageBubble.y=this.fake_coin.y-100;
        this.fake_coin.messageBubble.show();
    }
  }
  manageSpeechBubbles() {
     if( this.guard.isCloseToAnotherRole(player,100)){
      
      this.guard.speechBaloon.x=this.guard.x;
      this.guard.speechBaloon.y=this.guard.y-100;
      this.guard.speechBaloon.show();
   }
    if( this.wizard.isCloseToAnotherRole(player,100)){
      this.wizard.speechBaloon.x=this.wizard.x;
      this.wizard.speechBaloon.y=this.wizard.y-100;
      this.wizard.speechBaloon.show();
   }

  }
  customiseVillian() {  
    villian.magnigication = 2.5; // magnification factor
    villian.leg_color = "green";
    villian.body_color = "red";
    villian.head_color = "purple";
    villian.arm_color = "green";
    villian.pant_color = "green";
  }

}

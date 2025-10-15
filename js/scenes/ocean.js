class Ocean extends Scene {
  constructor() {
    super("Ocean");
    this.description =
      "You are in the ancient land Ocean, surrounded by pyramids and the Nile River.";
    this.goal = "Collect Scroll + Mummy + Green Fish x2.";
    this.setTerrain(new OceanTerrain(450, 300, 850, 550, 5));
    this.moon = new Moon(700, 100, 80);
    this.bottomColor = color(0, 0, 77);; 
    this.topColor = color(0, 0, 180); 
    // Fun Items
    this.water = new WaterWave(450, 330, 850);
    this.oceanWave = new OceanWave(0+20, 440, 860, 30);
    this.bubbles=new WaterBubble(0,750,200);
    this.stars=new Stars(0, 0, 50, width, height/3);
    // the fishes
    this.trees= new Tree(800,400,50);
    // Extra fishes
    this.fishes=[];
    this.addFishes(5);
    this.fish=null;
    this.greenFish=null;
    this.greenFish2=null;
    // images
    this.mummy=null;
    this.guru=null;
    this.scroll=null;
    this.seahorse=null;
    this.ruins=null;
    this.shark=null;
    this.mummy2=null
    this.setupFakeItems();
    this.setupItemToCollect();
    this.setUpStoryTeller();
    this.setImageItems();
   
    player.rotationAngle=PI/2;

 
  }
  show() {
     
    super.show();
    push();
    player.do_rotate=true;
    this.setScene();
    this.stars.show();
    this.storyTeller.show();
    this.showExtraFishes();
    this.showOtherFishes();
    this.manageItemMessage();
    pop();
  }
  // Show message bubble if player is close to item
  manageItemMessage() {
    if(this.fish.isCloseToPlayer(player, 30)){
      this.fish.messageBubble.x=this.fish.x;
      this.fish.messageBubble.y=this.fish.y-50;
      this.fish.messageBubble.show();
    }
    if(this.greenFish.isCloseToPlayer(player, 30)){
      this.greenFish.messageBubble.x=this.greenFish.x;
      this.greenFish.messageBubble.y=this.greenFish.y-50;
      this.greenFish.messageBubble.show();
    }
    if(this.greenFish2.isCloseToPlayer(player, 30)){
      this.greenFish2.messageBubble.x=this.greenFish2.x;
      this.greenFish2.messageBubble.y=this.greenFish2.y-50;
      this.greenFish2.messageBubble.show();
    }
    if(this.mummy.isCloseToPlayer(player, 30)){
      
      this.mummy.messageBubble.show();
    }
    if(this.guru.isCloseToPlayer(player, 60)){
      this.guru.messageBubble.show();
    }
    if(this.scroll.isCloseToPlayer(player, 60)){
      //this.scroll.showCloseness_radius(player,50);
      this.scroll.messageBubble.show();
    }
    if(this.seahorse.isCloseToPlayer(player, 60)){
      this.seahorse.messageBubble.show();
    }
    if(this.ruins.isCloseToPlayer(player, 60)){
      this.ruins.messageBubble.show();
    }
    if(this.shark.isCloseToPlayer(player, 60)){
      this.shark.messageBubble.x=this.shark.x;
      this.shark.messageBubble.y=this.shark.y-120;
      this.shark.messageBubble.show();
    }
    if(this.mummy2.isCloseToPlayer(player, 60)){
      this.mummy2.messageBubble.show();
    }
  }
  setUpStoryTeller() {
    this.storyTeller= new StoryTeller("Doris",450,690,300);
    this.storyTeller.textSize=20;
    this.storyTeller.title="Ocean";
    this.storyTeller.message="You’ve reached the sunken shores, where treasures of the ancients rest beneath the waves."+
                              " Find two true artifacts—but beware the decoys that glimmer in the deep." +
                              " Some sea spirits may guide you, others will lead you astray.";

  }
  addFishes(number){
    for(let i=0;i<number;i++){
        let fish=new Fish(random(0,50),random(300,500),random(30,80));
        fish.fillColor=color(random(100,200),random(100,200),random(100,200));
        fish.messageBubble=new SpeechBubble("fishBubble"+i,fish.x,fish.y-50,30,80);
        fish.messageBubble.message="I'm a colorful fish!";
        this.fishes.push(fish);
    }
  }
  showExtraFishes(){
   for(let fish of this.fishes){
    fish.continuousMovement('horizontal', floor(random(1,3)));
    fish.repeatMovement(this.terrain.w,this.terrain.h);
    fish.show();
   }
  }
  showOtherFishes(){   
    this.fish.continuousMovement('horizontal', 2);
    this.fish.repeatMovement(this.terrain.w,this.terrain.h);
    this.fish.show();
     if(!this.greenFish.collected){
      this.greenFish.continuousMovement('horizontal', 1);
      this.greenFish.repeatMovement(this.terrain.w,this.terrain.h);
      this.greenFish.show();
     }
    if(!this.greenFish2.collected){ 
      this.greenFish2.continuousMovement('horizontal', 1.5);
      this.greenFish2.repeatMovement(this.terrain.w,this.terrain.h);
      this.greenFish2.show();
    }
  }
  setupItemToCollect() {
    //Green fish
    this.greenFish=new Fish(100,450,50,"greenFish");
    this.greenFish.tailColor=color(0); 
    this.greenFish.messageBubble=new SpeechBubble("greenFishBubble",this.greenFish.x,this.greenFish.y-50,30,80);
    this.greenFish.messageBubble.message="I'm a greenly fish!Y U Got me!";
    this.greenFish.fillColor=color(90,255,50);
    //another green fish
    this.greenFish2=new Fish(200,350,70,"greenFish2");
    this.greenFish2.messageBubble=new SpeechBubble("greenFish2Bubble",this.greenFish2.x,this.greenFish2.y-50,30,80);
    this.greenFish2.messageBubble.message="I'm a green fish!Y U Got me!";
    this.greenFish2.tailColor=color(0);
    this.greenFish2.fillColor=color(100,255,200);
    //
  }
  setupFakeItems() {
    this.fish=new Fish(20,400,100);
    this.fish.eyeColor=color(0);
    this.fish.messageBubble= new SpeechBubble("fishBubble",this.fish.x,this.fish.y-50,30,80);
    this.fish.messageBubble.message="I'm a fish! Blub blub!";
   
  }

  // Initialize image items
  setImageItems() {
    this.mummy= new ImageItem("mummy",250,280,80,"assets/images/mummy.png");
    this.mummy.messageBubble=new SpeechBubble("mummyBubble",this.mummy.x,this.mummy.y-120,80,80);
    this.mummy.messageBubble.message="I'm Just Surfin Bro! Loose Points!";

    this.guru= new ImageItem("guru",840,520,80,"assets/images/guru.png");
    this.guru.messageBubble=new SpeechBubble("guruBubble",this.guru.x,this.guru.y-120,50,80);
    this.guru.messageBubble.message="Quickly save the mummy!";
    
    this.scroll= new ImageItem("scroll",70,480,50,"assets/images/scroll.png");
    this.scroll.messageBubble=new SpeechBubble("scrollBubble",this.scroll.x,this.scroll.y-80,50,80);
    this.scroll.messageBubble.message="I'm a real scroll! Take me!";

    this.ruins= new ImageItem("ruins",150,515,100,"assets/images/ruins.png");
    this.ruins.messageBubble=new SpeechBubble("ruinsBubble",this.ruins.x,this.ruins.y-120,50,80);
    this.ruins.messageBubble.message="I'm real ancient ruins! Explore me!";
    
    this.seahorse= new ImageItem("seahorse",700,350,50,"assets/images/seahorse.png");
    this.seahorse.messageBubble=new SpeechBubble("seahorseBubble",this.seahorse.x,this.seahorse.y-80,50,80);
    this.seahorse.messageBubble.message="I'm a real seahorse! Take me!";
    
    this.shark= new ImageItem("shark",300,300,80,"assets/images/shark.png");
    this.shark.messageBubble=new SpeechBubble("sharkBubble",this.shark.x,this.shark.y-120,50,80);
    this.shark.messageBubble.message="I'm a scary shark! But I won't hurt you!"; 
    
    this.mummy2= new ImageItem("mummy2",700,300,50,"assets/images/mummy2.png");
    this.mummy2.messageBubble=new SpeechBubble("mummy2Bubble",this.mummy2.x,this.mummy2.y-120,80,80);
    this.mummy2.messageBubble.message="Save me! Take me home!";
    
    //@todo  Need to use these instead of placing all objects in setupItemToCollect
    this.scroll.tobeCollected=true;
    this.mummy.tobeCollected=false;
    this.guru.tobeCollected=false;
    this.seahorse.tobeCollected=false;
    this.ruins.tobeCollected=false;
    this.shark.tobeCollected=false;
  }
  

  setScene() {
    this.drawGradientBackground(this.topColor, this.bottomColor);
    let glowCOlor=()=>{
      return color(0, 0, 200, 60);
    };
    this.moon.glow(glowCOlor);
    this.moon.show();
    this.trees.show();
    this.oceanWave.update();
    this.oceanWave.show();
    this.water.update();
    this.water.show();
    this.bubbles.update();
    this.bubbles.show();
   
    this.mummy.show();
    this.guru.show();
    this.scroll.showCloseness_radius(player,100);
    this.scroll.show();
    this.seahorse.show();
    this.ruins.show();
    this.shark.changeSize_onMovement(0.5);
    this.shark.repeatMovement(this.terrain.w,this.terrain.h);
    this.shark.continuousMovement('vertical', 1);
    this.shark.x+=sin(frameCount/50)*2;
    this.shark.show();
    this.mummy2.showCloseness_radius(player,100);
    this.mummy2.show();
  
  }

}

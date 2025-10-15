class StoryTeller extends Item {
    constructor(name, x, y, size, message="Once upon a time...") {
        super(name, x, y, size);
        this.message = message;
        this.itemType = "storyteller"; 
        this.glowColor = "lightgreen"; 
        this.backgroundColor = color(200, 255, 200, 150);
        this.textColor = color(0);
        this.textSize = this.size * 0.1;
        this.title = "Storyteller";
    }
    show() {
      
        super.show();
       
    }
    create() {
        rectMode(CENTER);
        rect(0, 0, this.size * 2.85, this.size-100, 10);
        fill(this.backgroundColor);
        noStroke();
        //strokeWeight(2);
        rect(0, 0, this.size * 2.85, this.size-100, 10);
        fill(this.textColor);
        textSize(this.textSize * 1.2);
        textAlign(CENTER, TOP);
        textStyle(BOLD);
        text(this.title, 0, -this.size * 0.30);
       // fill(255);
        noStroke();
        fill(this.textColor);
        textSize(this.textSize-1);
        //textAlign(CENTER, TOP);
        text(this.message, 10, 100, this.size*2.7, this.size ); // Wrap text within the bubble
        //this.showControlsInfo();
        
    }
   
}

/*
if (key === 'n' || key === 'N') {
        // @todo add transition effect
        //@todo check if current scene is complete
        gotoNextScene(); // Next scene for testing
    }
    if(key==='b'|| key==='B'){
        //go back to previous scene
        let prevSceneIndex=currentSceneIndex-1;
        if(scenes[prevSceneIndex]){
            startScene(prevSceneIndex);
        }
    }
    if (key === 'r' || key === 'R') {
        // Restart
        restartGame(); 
    }
    if (key === 'm' || key === 'M') {
         // on offf
        toggleMusic();
    }
    if (key === 'p' || key === 'P') {
        // Pause
        pauseBackgroundMusic(); 
    }
*/
        

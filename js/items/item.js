class Item{
    constructor(name,x,y,size){
        this.x = x;
        this.y = y;
        this.size = size;
        this.name = name;
        // if the item has been collected by the player
        this.messageBubble = null; // for any message bubble
        this.collected = false;
        this.sound_collected = null;
        this.sound_close = null;  
        this.sound_wrong = null;  
        this.angle = 0;
        this.image = null;
        this.magnification = 1;
        this.origialSize = size;
        this.originalX = x;
        this.originalY = y;
        this.glowColor="yellow";
        this.glowness=1;
        this.canGlow=false;
        this.itemType="generic";
        this.fillColor=color(255, 0, 0, 150); 
        this.tobeCollected=false; // if this item is to be collected in the scene
    }
    // How much to rotate the item
    setRotation(angle){
        this.angle = angle;
    }
    setMagnification(magnification=1){
        this.magnification = magnification;
    }
    changeSize(newSize){
        this.size = newSize;
    }
    show(){
        // all instances of items will rotate
        //Oct 6, I was able to fix he push and pop issue.
        // thought I could break the push and pop into superclass and subclass 
        // But that was crateting issues. Lesson learned. Don't do that.
        push();
        translate(this.x,this.y);
        rotate(this.angle);
        this.create();
        pop();
            
    }
    randomPosition(maxWidth,maxHeight){
        this.x = random(0,maxWidth);
        this.y = random(0,maxHeight);
    }
    continuousMovement(whichDirection,speed=1){
        if(whichDirection==="horizontal"){
            this.x+=speed;
        }else if(whichDirection==="vertical"){
            this.y+=speed;
        }       
    }
    changeSize_onMovement(factor=0.1){
        this.size +=factor;
    }

    // this has some issues.
    repeatMovement(maxWidth,maxHeight){
        if(this.x>maxWidth){
            this.x=0;
            this.size = this.origialSize;
            this.y = this.originalY;
            this.x = this.originalX;
        }
        if(this.y>maxHeight){
            this.y=0;
            this.size = this.origialSize;
            this.x = this.originalX;
            this.y = this.originalY;
            
        }
    }
    setGlow(color="yellow"){
        this.glowColor = color;
    }   
    // For setGlow for all items . need to ,ale sure pop() is called.
    glow(color="green"){
        push();
        noFill();
        stroke(this.glowColor);
        strokeWeight(2);
        pop();
    }

    // Subclasses mustimplement this to draw the items
    // just a template here
    create(){}



    // this should be able to check against any object
// but for now just checking against player
// ***Dont forget to update this later
    isCloseToPlayer(player,howclose=50){
        let d = dist(player.x,player.y,this.x,this.y);
        if(d<howclose){
            return true;
        }else{
            return false;
        }
    }
    // show closeness with a circle
    showCloseness_radius(player,howclose=10){
        let d = dist(player.x,player.y,this.x,this.y);
        //console.log("Distance to item:", d);
        if (d < howclose) {
                push();
                stroke(255, 0, 0, 100); // Yellow outline
                strokeWeight(2);
                noFill();
                ellipse(this.x,this.y, 80, 80); // Collection radius
                
                // Show "Press SPACE to collect" text
                // when to show it. Need to check distance
                /*
                if (d < howclose) {
                    fill(255);
                    textAlign(CENTER);
                    textSize(12);
                    text("Close", this.x,this.y - 30);
                }*/
                pop();
            }
    }

    // play sound
    playSound_collected(){
        if(!this.sound_collected.isPlaying()){
            this.sound_collected.play(0, 1, 1, 0, 2);
        }
    }
    // NEW METHOD INSTEA OF MULTIPLE METHODS
    playSound(type="collected"){
        console.log("Playing sound of type:", type);
        if(type==="collected"){
            if(this.sound_collected && !this.sound_collected.isPlaying()){
                this.sound_collected.play(0, 1, 1, 0, 2);
            }
        }else if(type==="close"){
            if(this.sound_close && !this.sound_close.isPlaying()){
                this.sound_close.play(0, 1, 1, 0, 2);
            }
        }else if(type==="wrong"){
            if(this.sound_wrong && !this.sound_wrong.isPlaying()){
                this.sound_wrong.play(0, 1, 1, 0, 2);
            }
        }
    }

}


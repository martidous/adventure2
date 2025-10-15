class Moon extends Item{
    constructor(x,y,size){
        super("Moon",x,y,size);
        this.itemType="sun";
        this.fillColor=color(255, 240, 200, 150); 
      
    }
    show(){
        super.show();
       
    }
    glow(color="white"){
        super.setGlow(color);
        this.glowness= sin(frameCount * 0.03) * 10 + 90;
     
       // noStroke();
       // fill(red(color), green(color), blue(color), 50);
        ellipse(this.x,this.y,this.glowness,this.glowness);    
     
    }
    create(){
        noStroke();
        ellipseMode(CENTER);
        fill(this.fillColor || 200);
        ellipse(0,0,this.size,this.size);        
        
    }
}
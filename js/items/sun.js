class Sun extends Item{
    constructor(x,y,size){
        super("Sun",x,y,size);
        this.itemType="sun";
       
    }
    show(){
        super.show();
       
    }
    glow(color="green"){
        super.setGlow(color);
        this.glowness= sin(frameCount * 0.03) * 10 + 90;
       // noStroke();
        fill(red(color), green(color), blue(color), 50);
        ellipse(this.x,this.y,this.glowness,this.glowness);    
     
    }
    create(){
        ellipseMode(CENTER);
        fill(255, 223, 0);
        ellipse(0,0,this.size,this.size);        
        
    }
}
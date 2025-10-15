

class Coin extends Item{
    constructor(x,y,size){
        super("Coin",x,y,size);
        this.itemType="coin";   
       
    }
    show(){
        super.show();
       
    }
     glow(color="green"){
        push();
        super.setGlow(color);
        this.glowness= sin(frameCount * 0.03) * 10 + 70;
        fill(red(color), green(color), blue(color), 50);
        ellipse(this.x,this.y,this.glowness,this.glowness);    
        pop();
    }
    create(){
        ellipseMode(CENTER);
        fill(255, 223, 0);
        ellipse(0,0,this.size,this.size);        
  
    }
}
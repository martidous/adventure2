

class Gold extends Item{
    constructor(x,y,size){
        super("Gold",x,y,size);
        this.itemType="gold";
    }
    
    show(){
        super.show();
       
    }
    glow(color="yellow"){
        push
        super.setGlow(color);
        this.glowness= sin(frameCount * 0.03) * 10 + 90;
        fill(red(color), green(color), blue(color), 50);
        rect(this.x,this.y,this.glowness,this.glowness);    
        pop();
    }
    create(){
        rectMode(CENTER);
        fill(255,215,0);
        rect(0,0,this.size,this.size);
        //triangle(0,-this.size/2,this.size/2,0,0,this.size/2);
        //triangle(0,-this.size/2,-this.size/2,0,0,this.size/2);
    }
        
}
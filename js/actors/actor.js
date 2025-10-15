class Actor{
    constructor(x,y){
        this.x = x;
        this.y = y;
       
        this.head_size=20;
        this.body_size=this.head_size*1.8;
        this.head_radius=this.head_size/2;
        this.head_posX=0;
        this.head_posY = -(this.body_size/2 + this.head_radius);
        this.shoulder_angle=10
        this.arm_height=10;
        this.arm_stretch=20;
       // console.log(this.head_posY);
       
        this.pant_size_proportion=this.body_size/4;
        
        
        this.head_color = 'pink';
        this.body_color = 'blue';
        this.pant_color = 'black';
        this.arm_color = 'brown';
        this.leg_color = 'brown';
        ellipseMode(CENTER);
        rectMode(CENTER); 
    }
    show(){
        push();
        translate(this.x,this.y);
        this.head();
        this.arms();
        this.body();
        this.legs();
        this.pants();
       
        //head
        //body
        //arms
        //legs
        pop();
    }
    head(){
        fill(this.head_color);
        
        ellipse(this.head_posX,this.head_posY,this.head_size,this.head_size);
        // hair :)
        fill(40, 20, 10); 
        arc(this.head_posX,this.head_posY,this.head_size,this.head_size, PI, 0, CHORD);
    }
    body(){
        fill(this.body_color);
        rect(0,0,this.body_size,this.body_size,this.shoulder_angle);
    }
    arms(){
        fill(this.arm_color);
        rect(0,-this.body_size+(this.head_radius/2)+this.arm_height*2,this.body_size+this.arm_stretch*2,this.arm_height,5);
        
    }
    legs(){
        fill(this.leg_color);
        rect(-this.body_size/4,this.body_size/2,10,20);
        rect(this.body_size/4,this.body_size/2,10,20);
    }
    pants(){
        beginShape();
            //pants
            fill(this.pant_color);
            vertex(0-(this.body_size/2), this.body_size/this.pant_size_proportion);
            vertex((this.body_size/2), this.body_size/this.pant_size_proportion);
            vertex((this.body_size/2), this.body_size/2);
            vertex(0-(this.body_size/2), this.body_size/2)
         
        endShape(CLOSE);// close the shape
       
    }

}   
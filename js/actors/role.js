class Role {
  constructor(name, x, y) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.head_size = 20;
    this.body_size = this.head_size * 1.8;
    this.head_radius = this.head_size / 2;
    this.head_posX = 0;
    this.head_posY = -(this.body_size / 2 + this.head_radius);
    this.shoulder_angle = 10;
    this.arm_height = 10;
    this.arm_stretch = 20;
    this.pant_size_proportion = this.body_size / 4;
    this.head_color = "pink";
    this.body_color = "blue";
    this.pant_color = "black";
    this.arm_color = "brown";
    this.leg_color = "brown";
    this.leg_size = 20;
    this.magnigication=1;
    this.speechBaloon=null;
    this.decreaseSizeFactor=0.2; 
    this.increaseSizeFactor=1.1; 
    this.decreaseSizeOnMovement=false; // can be set externally for each scene
    // Set ellipse and rect mode to center for easier positioning
    // Create an option for each to have a speechbubble
    this.speechBaloon=null;
    this.speed=5; // Default speed, can be adjusted
    ellipseMode(CENTER);
    rectMode(CENTER);
  }
  setMagnigication(magnigication){
    this.magnigication = magnigication;
  }
  // Can be called after changing magnigication to update sizes
  changeSize(){
    this.head_size = this.head_size * this.magnigication;
    this.body_size = this.head_size * 1.8;
    this.head_radius = this.head_size / 2;
    this.head_posY = -(this.body_size / 2 + this.head_radius);
    this.pant_size_proportion = this.body_size / 4;
    this.leg_size = this.leg_size * this.magnigication;
    this.arm_stretch = this.arm_stretch * this.magnigication;
    this.arm_height = this.arm_height * this.magnigication;
    this.shoulder_angle = this.shoulder_angle * this.magnigication;
  }
  adjustSizeOnMovement(indicator){
    //console.log("Adjusted-> size on movement:", indicator);
    //this.decreaseSizeOnMovement = 'decrease;
    if(this.decreaseSizeOnMovement){
     if(indicator === "decrease"){
            this.magnigication -=this.decreaseSizeFactor; // Use division, not multiplication
            this.setMagnigication(this.magnigication);
            this.changeSize();
            //console.log("Decreased-> size, new magnigication:", this.magnigication);
        }
        
        if(indicator === "increase"){
            this.magnigication += this.increaseSizeFactor; // Use division, not multiplication  
            this.setMagnigication(this.magnigication);
            this.changeSize();
            //console.log("Increasing size, new magnigication:", this.magnigication);
        }
    }
    
  }
  show() {
    push();
    translate(this.x, this.y);
    this.head();
    this.arms();
    this.body();
    this.legs();
    this.pants();
    pop();
  }

  head() {
    fill(this.head_color);

    ellipse(this.head_posX, this.head_posY, this.head_size, this.head_size);
    // hair :)
    fill(40, 20, 10);
    arc(
      this.head_posX,
      this.head_posY,
      this.head_size,
      this.head_size,
      PI,
      0,
      CHORD
    );
  }
  body() {
    fill(this.body_color);
    rect(0, 0, this.body_size, this.body_size, this.shoulder_angle);
  }
  arms() {
    fill(this.arm_color);
    rect(
      0,
      -this.body_size + this.head_radius / 2 + this.arm_height * 2,
      this.body_size + this.arm_stretch * 2,
      this.arm_height,
      5
    );
  }
  legs() {
    fill(this.leg_color);
    rect(-this.body_size / 4, this.body_size / 2, this.leg_size/2, this.leg_size);
    rect(this.body_size / 4, this.body_size / 2, this.leg_size/2, this.leg_size);
  }
  pants() {
    beginShape();
    //pants
    fill(this.pant_color);
    vertex(0 - this.body_size / 2, this.body_size / this.pant_size_proportion);
    vertex(this.body_size / 2, this.body_size / this.pant_size_proportion);
    vertex(this.body_size / 2, this.body_size / 2);
    vertex(0 - this.body_size / 2, this.body_size / 2);

    endShape(CLOSE); // close the shape
  }
  moveLeft(speed) {
    this.x -= speed;
    this.keepInBounds();
  }
  moveRight(speed) {
    this.x += speed;
    this.keepInBounds();
  }
  moveUp(speed) {
    this.y -= speed;
    this.keepInBounds();
  }
  moveDown(speed) {
    this.y += speed;
    this.keepInBounds();
  }
  smootherMove(speed) {
    if (keyIsDown(LEFT_ARROW))      this.moveLeft(this.speed);
    if (keyIsDown(RIGHT_ARROW))     this.moveRight(this.speed);
    if (keyIsDown(UP_ARROW))        this.moveUp(this.speed);
    if (keyIsDown(DOWN_ARROW))      this.moveDown(this.speed);
  }
  control_move(key) {  
    if (key === "ArrowLeft") {
      this.moveLeft(this.speed);
    } else if (key === "ArrowRight") {
      this.moveRight(this.speed);
    } else if (key === "ArrowUp") {
      this.moveUp(this.speed);
      this.adjustSizeOnMovement("decrease");
      
    } else if (key === "ArrowDown") {
      this.moveDown(this.speed );
      this.adjustSizeOnMovement("increase");    
    }
  }
 
  setTerrain(terrain) {
    this.terrain = terrain;
  }
   // A little dangerous to have terrain as part of Role.
   // need to think about it more.
  keepInBounds() {
    let leftBound = this.terrain.x - this.terrain.w/2 + this.body_size/2;
    let rightBound = this.terrain.x + this.terrain.w/2 - this.body_size/2;
    let topBound = this.terrain.y - this.terrain.h/2 + this.body_size/2;
    let bottomBound = this.terrain.y + this.terrain.h/2 - this.body_size/2;

    // Constrain position
    this.x = constrain(this.x, leftBound, rightBound);
    this.y = constrain(this.y, topBound, bottomBound);
  }
  isCloseTo(item, howclose=50){
    let d = dist(this.x, this.y, item.x, item.y);
    if(d < howclose){
        return true;  //
    } else {
        return false;
    }
  }
  // No time for this now
  isCloseToAnotherRole(anotherRole, howclose=50){
    let d = dist(this.x, this.y, anotherRole.x, anotherRole.y);
    if(d < howclose){
        return true;  // ✅ Just returns true/false
    } else {
        return false;
    }
  }
  // Reset Pos of the Role
  resetPosition() {
    this.x = 500;
    this.y = 500;
  }

}

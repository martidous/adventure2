class Scene {
  constructor(name) {
    this.name = name;
    this.isActive = false;
    this.nextScene = null;
    this.prevScene = null;
    this.description = "";
    this.goal = "";
    this.terrain = null;
    this.backgroundMusic = null;
    this.topColor = color(135, 206, 235); // Default sky blue
    this.bottom = color(34, 139, 34); // Default ground green 
    this.storyTeller=new StoryTeller("StoryTeller",450,735,300);
  }
  show() {
    push();
    //this.drawGradientBackground(this.topColor, this.bottom);
    this.drawTerrain();
    pop();
  }
  drawTerrain() {
    if (this.terrain) {
      this.terrain.show();
    }
  }
  setTerrain(terrain) {
    this.terrain = terrain;
  }
  drawGradientBackground(topColor, bottomColor) {
    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let c = lerpColor(topColor, bottomColor, inter);
      stroke(c);
      line(0, y, width, y);
    }
  }
  // for other scenes to override
  addCharacters() {}
  setScene() {}
  setImageItemsToCollect() {}
  customiseVillian() {}
}
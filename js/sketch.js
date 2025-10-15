let actor;
let gold;
let coin;
let r_coin;
let diamond;
let villian;
let player;
let terrain;
let lava;
let confetti;
let sun;
let pyramid;
let fish;
let stones;
let kingcolumns;
let trees;
let smoke;
let fire;
let rain;
let waterwave;
let sandwave;

function setup() {
  createCanvas(900, 600);
  terrain = new Terrain(450, 300, 850, 550, 5);
  sun = new Sun(700, 100, 80);

  
  actor = new Actor(200, 200);
  gold = new Gold(200, 200, 20);
  coin = new Coin(100, 100, 20);
  diamond = new Diamond(190, 90, 20);
  r_coin = new Coin(400, 300, 50);
  villian = new Villain(300, 300);
  villian.setMagnigication();
  villian.changeSize();
  player = new Player(500, 500);


  pyramid = new Pyramid(400,300,400);
  fish=new Fish(600,400,100);
  stones=new Stones(300,400,50);
  kingcolumns= new KinglyColumns(200,300,100);
  trees= new Tree(800,400,50);
  lava = new Lava(200, 500);
  confetti = new Confetti(700, 100);
  smoke= new Smoke(200,450,20);
  fire= new Fire(200,450,20);
  rain= new Rain(450,0,800);
  // To restrict player within terrain
  // Not sure If I want to keep this here
  player.setTerrain(terrain);
  sandwave= new SandDunes(450,550,800);
  waterwave= new WaterWave(450,550,800);
}

function draw() {
  background(220);
  //terrain.show();
  terrain.drawBounds();
  sun.glow("yellow");
  sun.show();
  pyramid.show();
  trees.glow("green");
  trees.show();
  fish.glow("blue");
  fish.show();
  stones.glow("gray");
  stones.show();
   //kingcolumns.glow("purple");
  kingcolumns.show();
  actor.show();
  gold.setRotation(frameCount / 100.0);
  //gold.randomPosition(800,400);
  gold.continuousMovement("vertical", 1);

  gold.repeatMovement(terrain.w, terrain.h);
  gold.changeSize_onMovement();
  gold.glow();

  gold.show();
  coin.setRotation(-frameCount / 200.0);
  coin.show();
  diamond.setRotation(frameCount / 10.0);

  diamond.show();
  //r_coin.setRotation(frameCount/50.0);
  r_coin.glow();
  r_coin.show();

  player.show();
  player.smootherMove(player.speed);
  villian.show();
  //i
  if (frameCount % 5 == 0) {
    confetti.particles.push(confetti.createParticles());
  }
  if (frameCount % 10 == 0) {
    lava.particles.push(lava.createParticles());
  }
  if (frameCount % 15 == 0) {
    smoke.particles.push(smoke.createParticles());
  }
  if (frameCount % 20 == 0) {
    fire.particles.push(fire.createParticles());
  }
  if (frameCount % 3 == 0) {
    rain.particles.push(rain.createParticles());
  }
  rain.update();
  rain.show();
  sandwave.update();
  sandwave.show();
  waterwave.update();
  waterwave.show();
  smoke.update();
  smoke.show();
  fire.update();
  fire.show()
  lava.update();
  lava.show();
  confetti.update();
  confetti.show();

}

function keyPressed() {
  player.control_move(key);
}
function keyReleased() {
  player.control_move(null);
}

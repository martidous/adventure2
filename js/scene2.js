//let terrain;
let role;
let scene;




function setup() {
    createCanvas(900, 600);
    scene = new Ocean();
    
  //  scene = new Underwater();
}
function draw() {
    background(0);
    scene.show();
  }
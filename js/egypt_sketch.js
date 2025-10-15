//let terrain;
let scene;


function setup() {
    createCanvas(900, 900);
    scene = new Egypt()
  //  scene = new Underwater();
}
function draw() {
    background(0);
    scene.show();
}
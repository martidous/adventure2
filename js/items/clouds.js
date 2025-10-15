class Cloud extends Item {
    constructor(x, y, size) {
        super("Cloud", x, y, size);
        this.itemType = "cloud";
    }

    
    show() {
        super.show();
       
    }
    
    create() {
        ellipseMode(CENTER);
        fill(255);
        ellipse(0, 0, this.size, this.size / 2);
        ellipse(-this.size / 4, -this.size / 8, this.size / 1.5, this.size / 3);
        ellipse(this.size / 4, -this.size / 8, this.size / 1.5, this.size / 3);
    }
}

/*

for (let y = 0; y < height; y++) {
                let inter = map(y, 0, height, 0, 1);
                let c = lerpColor(color(52, 73, 94), color(41, 50, 65), inter);
                stroke(c);
                line(0, y, width, y);
            }

            // Clouds
            noStroke();
            for (let cloud of clouds) {
                fill(200, 200, 200, 150);
                ellipse(cloud.x, cloud.y, cloud.size, cloud.size * 0.6);
                ellipse(cloud.x + 30, cloud.y, cloud.size * 0.8, cloud.size * 0.5);
                ellipse(cloud.x - 30, cloud.y, cloud.size * 0.7, cloud.size * 0.4);
                
                cloud.x += cloud.speed;
                if (cloud.x > width + 100) {
                    cloud.x = -100;
                }
            }

*/
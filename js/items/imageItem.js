class ImageItem extends Item {
    constructor(name, x, y, size, imagePath) {
        super(name, x, y, size);
        this.itemType = name;
        this.imagePath = imagePath;
        this.image = null;
        this.imageLoaded = false;
        this.imageWidth = size;
        this.imageHeight = size;
        this.maintainAspectRatio = true;
        
        // Load the image
        this.loadImage();
    }
    
    // Load image asynchronously
    loadImage() {
        if (this.imagePath) {
            this.image = loadImage(
                this.imagePath,
                // Success callback
                () => {
                    this.imageLoaded = true;
                    console.log(`Image loaded: ${this.name}`);
                    
                    // calculate size for ratio
                    if (this.maintainAspectRatio && this.image) {
                        this.calculateImageSize();
                    }
                },
                // Error callback
                () => {
                    console.error(`Failed to load image: ${this.imagePath}`);
                    this.imageLoaded = false;
                }
            );
        }
    }
    
  
    calculateImageSize() {
        if (!this.image) return;
        
        let aspectRatio = this.image.width / this.image.height;
        
        if (this.image.width > this.image.height) {
      
            this.imageWidth = this.size;
            this.imageHeight = this.size / aspectRatio;
        } else {
    
            this.imageHeight = this.size;
            this.imageWidth = this.size * aspectRatio;
        }
    }
    
   
    show() {
        // Image Items are set autmatically to collected=false
        if (this.collected) return; 
        // if not collected, show it
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        scale(this.magnification);
        if (this.canGlow) {
            this.glow(this.glowColor);
        }
        this.create();
        pop();
    }
    
    // Create the image
    create() {
        if (this.imageLoaded && this.image) {
            // Draw the image centered
            imageMode(CENTER);
            image(this.image, 0, 0, this.imageWidth, this.imageHeight);
        } else {
            // Fallback: draw a placeholder if image isn't loaded
            this.drawPlaceholder();
        }
    }
    
    // Create a placeholder Just in case image fails to load
    drawPlaceholder() {
        push();
        fill(200, 200, 200);
        stroke(100);
        strokeWeight(2);
        rect(0, 0, this.size, this.size);
        
        fill(100);
        textAlign(CENTER, CENTER);
        textSize(this.size * 0.1);
        if (this.imagePath && !this.imageLoaded) {
            text("Loading...", 0, 0);
        } else {
            text("No Image", 0, 0);
        }
        pop();
    }
    
    // Image seeter
    setImage(imagePath) {
        this.imagePath = imagePath;
        this.imageLoaded = false;
        this.loadImage();
    }
    
    // For some scenes I may want to change the image size
    setImageSize(width, height, maintainRatio = false) {
        this.imageWidth = width;
        this.imageHeight = height;
        this.maintainAspectRatio = maintainRatio;
        
        if (maintainRatio && this.image) {
            this.calculateImageSize();
        }
    }
    
    // to keep things proportional
    setMaintainAspectRatio(maintain) {
        this.maintainAspectRatio = maintain;
        if (maintain && this.image) {
            this.calculateImageSize();
        }
    }
}
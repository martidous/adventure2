class Pyramid extends Item {
  constructor(x, y, size) {
    super("Pyramid", x, y, size);
    this.itemType = "pyramid";
  }
  show() {
    super.show();
  }
  create() {
    fill(194, 178, 128);
    triangle(
      -this.size / 2,
      this.size / 2,
      this.size / 2,
      this.size / 2,
      0,
      -this.size / 2
    );
    let smallSize = this.size * 0.6;
    fill(180, 164, 114);
    triangle(
      -this.size / 2 - smallSize / 3,
      this.size / 2,
      -this.size / 2 - smallSize / 3 + smallSize / 2,
      this.size / 2,
      -this.size / 2 - smallSize / 3 + smallSize / 4,
      this.size / 2 - smallSize / 2
    );

    fill(180, 164, 114);
    triangle(
      this.size / 2 + smallSize / 3 - smallSize / 2,
      this.size / 2,
      this.size / 2 + smallSize / 3,
      this.size / 2,
      this.size / 2 + smallSize / 3 - smallSize / 4,
      this.size / 2 - smallSize / 2
    );
  }
}

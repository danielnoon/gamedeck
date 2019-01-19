export class Vector2 {
  constructor(private x: number, private y: number) {}

  getCoords() {
    return [this.x, this.y];
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setCoords(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }

  add(vec: Vector2) {
    return new Vector2(vec.getX() + this.x, vec.getY() + this.y);
  }

  addM(vec: Vector2) {
    const coords = this.add(vec).getCoords();
    this.setCoords(coords[0], coords[1]);
  }

  invert() {
    this.invertX();
    this.invertY();
  }

  invertX() {
    this.x = -this.x;
  }

  invertY() {
    this.y = -this.y;
  }
}

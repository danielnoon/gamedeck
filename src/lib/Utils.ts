export class Vector2 {
  constructor(public x: number, public y: number) {}

  getCoords(): [number, number] {
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

  add(vec: Vector2 | number[]) {
    if (vec instanceof Vector2) {
      return new Vector2(vec.getX() + this.x, vec.getY() + this.y);
    }
    else {
      return new Vector2(vec[0] + this.x, vec[1] + this.y);
    }
  }

  addM(vec: Vector2 | number[]) {
    const coords = this.add(vec).getCoords();
    this.setCoords(coords[0], coords[1]);
  }

  invertM() {
    this.x = -this.x;
    this.y = -this.y;
  }

  invertXM() {
    this.x = -this.x;
  }

  invertYM() {
    this.y = -this.y;
  }

  invert() {
    return new Vector2(-this.x, -this.y);
  }

  invertX() {
    return new Vector2(-this.x, this.y);
  }

  invertY() {
    return new Vector2(this.x, -this.y);
  }

  clone() {
    return new Vector2(this.x, this.y);
  }

  getMagnitude() {
    return Math.sqrt((this.x ** 2) + (this.y ** 2));
  }

  scalar(num: number) {
    return new Vector2(this.x * num, this.y * num);
  }

  scalarM(num: number) {
    this.x = this.x * num;
    this.y = this.y * num;
  }
}

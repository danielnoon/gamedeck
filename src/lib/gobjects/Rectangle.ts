import { Vector2 } from "../Utils";
import { GObject } from "../GObject";
import { Polygon } from "../assets/Polygon";
import { Rectangle as Rect } from '../Assets';

export class Rectangle extends GObject {
  constructor(props: {
    width: number,
    height: number,
    x: number,
    y: number,
    scale?: number,
    rotation?: number,
    color: string
  }) {
    super({
      dimensions: new Vector2(props.width, props.height),
      position: new Vector2(props.x, props.y),
      scale: props.scale,
      rotation: props.rotation
    });
    const d = this.dimensions.getCoords();
    const p = this.position.getCoords();
    this.sprite = new Rect(this.dimensions.getX(), this.dimensions.getY(), props.color);
  }
}

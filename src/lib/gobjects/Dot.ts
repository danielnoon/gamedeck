import { Ellipse } from "../assets/Ellipse";
import { Vector2 } from "../Utils";
import { GObject } from "../GObject";

export class Dot extends GObject {
  constructor(props: {
    x?: number,
    y?: number,
    position?: Vector2,
    radius: number,
    color?: string,
    children?: GObject[],
    id?: string,
    className?: string
  }, state?: DotState) {
    let {x, y, radius, color, children, position, id, className} = props;
    super({
      position: position || new Vector2(x || 0, y || 0),
      dimensions: new Vector2(radius * 2, radius * 2),
      scale: 1,
      rotation: 0,
      children,
      id,
      className
    });
    radius = (state ? state.radius : null) || radius;
    color = (state ? state.color : null) || color || 'black';
    this.sprite = new Ellipse(radius, radius, color);
  }
}

export class DotState {
  position?: Vector2;
  radius?: number;
  color?: string;

  constructor(props?: DotState) {
    if (props) {
      const {position, radius, color} = props;
      this.position = position;
      this.radius = radius,
      this.color = color;
    }
  }
}

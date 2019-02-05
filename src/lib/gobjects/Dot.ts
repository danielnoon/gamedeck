import { Ellipse } from "../assets/Ellipse";
import { Vector2 } from "../Utils";
import { GObject } from "../GObject";

export class Dot extends GObject {
  constructor(props: {
    x?: number,
    y?: number,
    position?: Vector2,
    radius?: number,
    color?: string,
    children?: GObject[]
  }, state?: DotState) {
    let {x, y, radius, color, children, position} = props;
    super({
      position: (state ? state.position : null) || position || new Vector2(x || 0, y || 0),
      dimensions: new Vector2((radius || 1) * 2, (radius || 1) * 2),
      scale: 1,
      rotation: 0,
      children
    });
    radius = (state ? state.radius : null) || radius || 1;
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

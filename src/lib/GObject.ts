import { Asset } from "./Asset";
import { Vector2 } from "./Utils";

export abstract class GObject {
  sprite?: Asset;
  position: Vector2;
  dimensions: Vector2;
  scale: number;
  rotation: number;
  children?: GObject[];

  protected constructor(props: {
    position?: Vector2,
    dimensions?: Vector2,
    scale?: number,
    rotation?: number,
    children?: GObject[]
  }) {
    this.position = props.position || new Vector2(0, 0);
    this.dimensions = props.dimensions || new Vector2(0, 0);
    this.scale = props.scale || 1;
    this.rotation = props.rotation || 0;
    this.children = props.children;
  }

  render(ctx: CanvasRenderingContext2D, parent: GObject) {
    if (this.sprite) {
      this.sprite.draw(ctx, this);
    }
  };
}

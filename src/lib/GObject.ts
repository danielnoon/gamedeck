import { Asset } from "./Asset";
import { Vector2 } from "./Utils";

export abstract class GObject {
  sprite?: Asset;

  protected constructor(
    public position: Vector2,
    public scale: number,
    public rotation: number,
    public children?: GObject[]
  ) {}

  render(ctx: CanvasRenderingContext2D) {
    if (this.sprite) {
      this.sprite.draw(ctx, this);
    }
  };
}

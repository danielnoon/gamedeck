import { Asset } from "./Asset";
import { Vector2 } from "./Utils";
import { Game } from "./Game";

export abstract class GObject {
  sprite?: Asset;
  position: Vector2;
  dimensions: Vector2;
  scale: number;
  rotation: number;
  children?: GObject[];
  id?: string;
  className?: string;

  protected constructor(props: {
    position?: Vector2,
    dimensions?: Vector2,
    scale?: number,
    rotation?: number,
    children?: GObject[],
    id?: string,
    className?: string
  }) {
    this.position = props.position || new Vector2(0, 0);
    this.dimensions = props.dimensions || new Vector2(0, 0);
    this.scale = props.scale || 1;
    this.rotation = props.rotation || 0;
    this.children = props.children;
    this.id = props.id;
    this.className = props.className;
  }

  render(ctx: CanvasRenderingContext2D, parent: GObject) {
    if (this.sprite) {
      this.sprite.draw(ctx, this);
    }
  };

  build(game: Game): GObject | GObject[] {
    return this.children || [];
  }

  prepare(game: Game): void {}
}

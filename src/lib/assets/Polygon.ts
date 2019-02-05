import { Asset } from "../Asset";
import { GObject } from "../GObject";
import { Vector2 } from "../Utils";

export class Polygon extends Asset {
  constructor(private vertices: Vector2[], private color: string) {
    super();
  }

  draw(ctx: CanvasRenderingContext2D, owner: GObject) {
    const start = this.vertices.shift()!;
    ctx.fillStyle = this.color;
    ctx.moveTo(start.getX(), start.getY());
    ctx.beginPath();
    for (let vertex of this.vertices) {
      ctx.lineTo(vertex.getX(), vertex.getY());
    }
    ctx.fill();
  }
}
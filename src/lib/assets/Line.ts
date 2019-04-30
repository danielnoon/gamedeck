import { Asset } from "../Asset";
import { GObject } from "../GObject";
import { Vector2 } from "../Utils";

export class Line extends Asset {
  draw(ctx: CanvasRenderingContext2D, parent: GObject) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.moveTo(...this.p1.getCoords());
    ctx.lineTo(...this.p2.getCoords());
    ctx.stroke();
  }

  constructor(
    private p1: Vector2,
    private p2: Vector2,
    private color: string,
    private thickness: number
  ) {
    super();
  }
}

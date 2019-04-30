import { GObject } from "../GObject";
import { Asset, AssetRenderingOptions } from "../Asset";

export class Ellipse extends Asset {
  draw(ctx: CanvasRenderingContext2D, owner: GObject) {
    ctx.fillStyle = this.color;
    let x = owner.position.getX();
    let y = owner.position.getY();
    ctx.beginPath();
    ctx.ellipse(x + this.width, y + this.width, this.width, this.height, owner.rotation, 0, 360);
    ctx.fill();
  }

  constructor(public width: number, public height: number, public color: string) {
    super();
  }
}

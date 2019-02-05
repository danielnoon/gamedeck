import { GObject } from "../GObject";
import { Asset, AssetRenderingOptions } from "../Asset";

export class Ellipse extends Asset {
  draw(ctx: CanvasRenderingContext2D, owner: GObject, options?: AssetRenderingOptions) {
    if (!options) options = this.options;
    ctx.fillStyle = this.color;
    let x = owner.position.getX();
    let y = owner.position.getY();
    if (options) {
      if (options.positioning) {
        if (options.positioning === 'center') {
          x -= this.width / 2;
          y += this.height / 2;
        }
        if (options.positioning === 'right') {
          x -= this.width;
          y += this.height;
        }
      }
      else if (options.positioningX) {
        if (options.positioningX === 'center') {
          x -= this.width / 2;
        }
        if (options.positioningX === 'right') {
          x -= this.width;
        }
      }
    }
    ctx.beginPath();
    ctx.ellipse(x, y, this.width, this.height, owner.rotation, 0, 360);
    ctx.fill();
  }

  constructor(public width: number, public height: number, public color: string, public options?: AssetRenderingOptions) {
    super();
  }
}

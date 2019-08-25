import { GObject } from "../GObject";
import { Asset, AssetRenderingOptions } from "../Asset";
import { Vector2 } from "../Utils";

export class Rectangle extends Asset {
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
    const rad = owner.rotation * Math.PI / 180;
    const pts = this.rotatePoints(x, y, rad);
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    ctx.lineTo(pts[1].x, pts[1].y);
    ctx.lineTo(pts[2].x, pts[2].y);
    ctx.lineTo(pts[3].x, pts[3].y);
    ctx.lineTo(pts[0].x, pts[0].y);
    ctx.fill();
    // ctx.fillRect(x, y, this.width, this.height);
  }

  rotatePoints(x: number, y: number, rad: number) {
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const r1x = -halfWidth * c - halfHeight * s;
    const r1y = -halfWidth * s + halfHeight * c;
    const r2x =  halfWidth * c - halfHeight * s;
    const r2y =  halfWidth * s + halfHeight * c;

    // Returns four points in clockwise order starting from the top left.
    return [
        {x: x + r1x + halfWidth, y: y + r1y + halfHeight},
        {x: x + r2x + halfWidth, y: y + r2y + halfHeight},
        {x: x - r1x + halfWidth, y: y - r1y + halfHeight},
        {x: x - r2x + halfWidth, y: y - r2y + halfHeight}
    ]
  }

  constructor(public width: number, public height: number, public color: string, public options?: AssetRenderingOptions) {
    super();
  }
}

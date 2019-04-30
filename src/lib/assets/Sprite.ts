import { Asset } from "../Asset";
import { GObject } from "../GObject";

class Images {
  private static els = new Map<string, HTMLImageElement>();

  static Exists(src: string) {
    return this.els.has(src);
  }

  static Create(src: string) {
    const el = new Image();
    el.src = src;
    this.els.set(src, el);
    return el;
  }

  static Get(src: string) {
    return this.els.get(src);
  }
}

export class Sprite extends Asset {
  private sprite: HTMLImageElement;

  draw(ctx: CanvasRenderingContext2D, owner: GObject) {
    ctx.drawImage(
      this.sprite,
      this.x || 0,
      this.y || 0,
      this.cropWidth || this.width,
      this.cropHeight || this.height,
      owner.position.getX(),
      owner.position.getY(),
      this.width,
      this.height
    );
  }

  constructor(
    src: string,
    private width: number,
    private height: number,
    private x?: number,
    private y?: number,
    private cropWidth?: number,
    private cropHeight?: number
  ) {
    super();
    if (Images.Exists(src)) {
      this.sprite = Images.Get(src)!;
    }
    else {
      this.sprite = Images.Create(src);
    }
  }
}
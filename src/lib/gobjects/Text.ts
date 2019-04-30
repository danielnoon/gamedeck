import { GObject } from '../GObject';
import { Vector2 } from '../Utils';

type positioning = 'top left' | 'top center' | 'top right' 
  | 'middle left' | 'middle center' | 'middle right'
  | 'bottom left' | 'bottom center' | 'bottom right'
  | 'fit' | 'cover';

export class Text extends GObject {
  private text: string;
  private font: string;
  private color: string;
  private positioning: positioning;

  constructor(props: {
    text: string,
    font: string,
    position: Vector2,
    positioning: positioning,
    color: string
  }) {
    super(props);
    this.text = props.text;
    this.font = props.font;
    this.color = props.color;
    this.positioning = props.positioning || 'top left';
  }

  render(ctx: CanvasRenderingContext2D) {
    const textSize = ctx.measureText(this.text);
    const [vertical, horizontal] = this.positioning.split(' ');
    if (horizontal === 'center') {
      ctx.textAlign = 'center';
    }
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.position.x, this.position.y);
  }
}

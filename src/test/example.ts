import { GObject } from '../lib/GObject';
import { Vector2 } from '../lib/Utils';
import { Ellipse } from '../lib/assets/Ellipse';
import { Game } from '../lib/Game';
import { Rectangle } from '../lib/gobjects/Rectangle';
import { Scene } from '../lib/Scene';

class Ball extends GObject {
  constructor(props: { position: Vector2; radius: number; color: string }) {
    super({
      position: props.position,
      dimensions: new Vector2(props.radius * 2, props.radius * 2)
    });
    this.sprite = new Ellipse(props.radius, props.radius, props.color);
  }
}

export class Main extends Scene {
  dotPosition = new Vector2(10, 10);

  build(game: Game) {
    return new Rectangle({
      color: 'white',
      x: 0,
      y: 0,
      width: game.width,
      height: game.height,
      children: [
        new Ball({
          position: this.dotPosition,
          radius: 10,
          color: 'black'
        })
      ]
    });
  }

  update(game: Game) {
    this.dotPosition = new Vector2(
      Math.cos(game.frame / 50) * 100 + game.width / 2 - 10,
      Math.sin(game.frame / 50) * 100 + game.height / 2 - 10
    );
  }
}

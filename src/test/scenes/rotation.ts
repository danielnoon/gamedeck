import { Game } from '../../lib/Game';
import { Scene } from '../../lib/Scene';
import { Rectangle } from '../../lib/gobjects/Rectangle';

export class RotationScene extends Scene {
  rotation = 0;

  build(game: Game) {
    return new Rectangle({
      color: 'black',
      x: 0,
      y: 0,
      width: game.width,
      height: game.height,
      children: [
        new Rectangle({
          x: 500,
          y: 400,
          width: 200,
          height: 200,
          color: 'white',
          rotation: this.rotation
        }),
        new Rectangle({
          x: 100,
          y: 200,
          width: 200,
          height: 100,
          color: 'lightblue',
          rotation: -this.rotation / 2
        })
      ]
    });
  }

  update(game: Game) {
    this.rotation += 1;
  }
}

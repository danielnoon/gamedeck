import './index.html';
import { startGame, gobjects, Scene } from 'gamedeck';

class Scene1 extends Scene {
  build() {
    return new gobjects.Background({
      color: '#eeeeee',
      children: [
        new gobjects.Rectangle({
          x: 20,
          y: 20,
          width: 10,
          height: 10,
          color: 'blue'
        })
      ]
    })
  }
}

const canvas = document.querySelector('canvas');
const game = startGame(new Scene1(), canvas ? {canvas} : {});

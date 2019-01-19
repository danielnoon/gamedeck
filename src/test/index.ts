import { GObject } from "../lib/GObject";
import { Scene } from "../lib/Scene";
import { Vector2 } from "../lib/Utils";
import { Game, startGame } from "../lib/Game";
import { Rectangle } from "../lib/Asset";
import './index.html';

class Background extends GObject {
  constructor(props: {
    width: number,
    height: number,
    color: string,
    children?: GObject[]
  }) {
    super(new Vector2(0, 0), 1, 0, props.children);
    this.sprite = new Rectangle(400, 300, props.color);
  }
}

class Dot extends GObject {
  constructor(props: {
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  }) {
    const {x, y, width, height, color} = props;
    super(new Vector2(x, y), 1, 0);
    this.sprite = new Rectangle(width, height, color);
  }
}

const rI = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

class FirstScene extends Scene {
  dots = [
    [new Vector2(rI(100, 200), rI(100, 200)), new Vector2(0.6, 0.5)],
    [new Vector2(rI(100, 200), rI(100, 200)), new Vector2(-0.5, 0.8)]
  ];

  build() {
    return new Background({
      width: 100,
      height: 100,
      color: '#555555',
      children: [
        new Dot({
          x: this.dots[0][0].getX(),
          y: this.dots[0][0].getY(),
          width: 10,
          height: 10,
          color: 'blue'
        }), //Dot
        new Dot({
          x: this.dots[1][0].getX(),
          y: this.dots[1][0].getY(),
          width: 10,
          height: 10,
          color: 'green'
        }) //Dot
      ]
    }); //Background
  }

  update(game: Game) {
    for (let dot of this.dots) {
      dot[0].addM(dot[1]);
      let [x, y] = dot[0].getCoords();
      if (x < 0) dot[1].invertX();
      if (x > 300 - 10) dot[1].invertX();
      if (y < 0) dot[1].invertY();
      if (y > 300 - 10) dot[1].invertY();
    }

    game.setTimer('sceneChange1', '10s', () => {
      console.log("CALLBACK!");
      game.loadScene(new SecondScene());
    });
  }
}

class SecondScene extends Scene {
  build() {
    return new Background({width: 100, height: 100, color: 'purple'});
  }

  update(game: Game) {

  }
}

const canvas = document.querySelector('canvas')!;

const game = startGame(new FirstScene(), {canvas});
console.log(game);

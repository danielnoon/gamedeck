/**
 * Hello! This is a file to test the functionality of
 * GameDeck and experiment with new features.
 * As of now, GameDeck is in its very early stages,
 * so there is a lot missing from the core library.
 * Some features that will be added to the core will
 * go through incubation here, such as the physics
 * engine I am working on and the Camera API I want
 * to add at some point.
 */

import './index.html';
import { Scene } from "../lib/Scene";
import { Vector2 } from "../lib/Utils";
import { Game, startGame } from "../lib/Game";
import { Background, Dot } from '../lib/GObjects';
import { DotState } from '../lib/gobjects/Dot';
import { GObject } from '../lib/GObject';
import { Sprite } from '../lib/Assets';
import door from './assets/door.png';
import { gobjects } from '../lib/index';

const rI = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min)) + min;

new gobjects.Rectangle({
  width: 10,
  height: 10,
  x: 0,
  y: 0,
  color: 'black'
});

class Door extends GObject {
  sprite = new Sprite(door, 96, 96);

  constructor(props: {
    position: Vector2
  }) {
    super(props);
  }
}

class FirstScene extends Scene {
  dotState = new DotState({
    position: new Vector2(20, 20),
    color: 'black',
    radius: 10
  });

  dotColor = [0, 2 * Math.PI / 3, 4 * Math.PI / 3];
  velocity = new Vector2(0, 0);
  jumping = false;

  build(game: Game) {
    return new Background({
      color: '#eeeeee',
      children: [
        new Door({
          position: new Vector2(
            game.canvasElement.width - 96,
            game.canvasElement.height - 96
          )
        }),
        new Dot(this.dotState) //Dot
      ],
      dimensions: new Vector2(game.canvasElement.width, game.canvasElement.height)
    }); //Background
  }

  update(game: Game) {
    let SPEED = this.velocity.getMagnitude();
    let acceleration = new Vector2(0, 0);

    const up = game.input.isPressed('up'),
          down = game.input.isPressed('down'),
          left = game.input.isPressed('left'),
          right = game.input.isPressed('right'),
          faster = game.input.isPressed('faster'),
          jump = game.input.isPressed('jump');

    let MAX_VELOCITY = 2;
    if (faster) {
      MAX_VELOCITY = 4;
    }

    if (down) {
      if (faster)
      acceleration.addM([0, 0.1]);
      else acceleration.addM([0, 0.05]);
    }
    if (right) {
      if (this.velocity.getX() < MAX_VELOCITY) {
        if (faster) 
        acceleration.addM([0.15, 0]);
        else
        acceleration.addM([0.10, 0]);
      }
    }
    if (left) {
      if (this.velocity.getX() > -MAX_VELOCITY)
      if (faster) 
      acceleration.addM([-0.15, 0]);
      else
      acceleration.addM([-0.10, 0]);
    }
    if (!left && !right) {
      const x = this.velocity.getX();
      if (x < -0.1) {
        acceleration.addM([0.01, 0]);
      }
      else if (x > 0.1) {
        acceleration.addM([-0.01, 0]);
      }
      else {
        this.velocity.setX(0);
      }
    }

    acceleration.addM([0, .1]);

    if (this.dotState.position!.getY() + this.dotState.radius! > game.canvasElement.height) {
      this.jumping = false;
      this.velocity.setY(0);
      acceleration.setY(0);
      this.dotState.position!.setY(game.canvasElement.height - this.dotState.radius!);
      if (!left && !right) {
        const x = this.velocity.getX();
        if (x < -0.1) {
          acceleration.addM([0.10, 0]);
        }
        else if (x > 0.1) {
          acceleration.addM([-0.10, 0]);
        }
      }
    }
    
    if (jump && !this.jumping) {
      this.jumping = true;
      acceleration.setY(-6);
    }

    this.velocity.addM(acceleration);
    this.dotState.position!.addM(this.velocity);

    const RED = this.formatColor(this.dotColor[0]);
    const GRN = this.formatColor(this.dotColor[1]);
    const BLU = this.formatColor(this.dotColor[2]);
    this.dotState.color = `rgb(${RED}, ${GRN}, ${BLU})`;
    this.dotColor = this.dotColor.map((val, i) => val + .01 + i / 100);
  }

  formatColor(t: number) {
    let result = ((Math.sin(t) + 1) / 2 * 255).toString();
    return result;
  }
}

const canvas = document.querySelector('canvas')!;

const game = startGame(new FirstScene(), {canvas});
game.input.setAlias('left', 'KeyA');
game.input.setAlias('right', 'KeyD');
game.input.setAlias('up', 'KeyW');
game.input.setAlias('down', 'KeyS');
game.input.setAlias('faster', 'ShiftLeft');
game.input.setAlias('jump', 'Space');

console.log(game);

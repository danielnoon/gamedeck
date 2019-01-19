import { Scene } from "./Scene";
import { GObject } from "./GObject";
import ms from 'ms';

interface ITimer {
  frame?: number;
  time?: number;
  callback(): void;
  id: string;
}

export class Game {
  currentScene?: Scene;
  canvasContext: CanvasRenderingContext2D;
  canvasElement: HTMLCanvasElement;
  frame = 0;
  timers: ITimer[] = [];

  public setTimer(id: string, delay: string, callback: () => void) {
    const split = delay.split('');
    const type = split.pop();
    if (!this.timers.find(timer => timer.id === id)) {
      const timer: ITimer = {
        id, callback
      };
      if (type === 'f') {
        timer.frame = parseInt(split.join('')) + this.frame;
      }
      else {
        timer.time = Date.now() + ms(delay);
      }
      this.timers.push(timer);
    }
  }

  callCallbacks() {
    for (let i = 0; i < this.timers.length; i++) {
      const timer = this.timers[i];
      if (timer.frame) {
        if (timer.frame <= this.frame) {
          timer.callback();
          delete this.timers[i];
          this.timers.splice(i, 1);
        }
      }
      else if (timer.time) {
        if (timer.time <= Date.now()) {
          timer.callback();
          delete this.timers[i];
          this.timers.splice(i, 1);
        }
      }
      else {
        timer.callback();
        delete this.timers[i];
        this.timers.splice(i, 1);
      }
    }
  }

  private loop() {
    this.callCallbacks();
    if (this.currentScene) {
      this.currentScene.update(this);
      const root = this.currentScene.build();
      this.render(root);
    }
    this.frame++;
    requestAnimationFrame(() => this.loop());
  }

  private render(obj: GObject) {
    obj.render(this.canvasContext);

    if (obj.children) {
      obj.children.forEach(child => {
        child.position.addM(obj.position);
        child.rotation += obj.rotation;
        child.scale += obj.scale;
        this.render(child);
      });
    }
  }

  constructor(private options: IGameOptions = new GameOptions()) {
    if (options.canvas) {
      this.canvasElement = options.canvas;
      const ctx = options.canvas.getContext('2d');
      if (!ctx) {
        throw new Error("Could not get canvas rendering context.");
      }
      this.canvasContext = ctx;
    }
    else {
      this.canvasElement = document.createElement('canvas');
      const ctx = this.canvasElement.getContext('2d');
      if (!ctx) {
        throw new Error("Could not get canvas rendering context.");
      }
      this.canvasContext = ctx;
      this.canvasElement.width = 400;
      this.canvasElement.height = 300;
      document.body.appendChild(this.canvasElement);
    }
  }

  loadScene(scene: Scene) {
    this.currentScene = scene;
    return this;
  }

  start() {
    this.loop();
    return this;
  }
}

export interface IGameOptions {
  canvas?: HTMLCanvasElement;
}

export class GameOptions implements IGameOptions {

}

export let startGame = (scene: Scene, options?: IGameOptions) =>
  (new Game(options)).loadScene(scene).start();

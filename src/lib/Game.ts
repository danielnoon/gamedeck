import { Scene } from "./Scene";
import { GObject } from "./GObject";
import ms from 'ms';
import { Vector2 } from "./Utils";
import { Input, Listenable } from "./Input";
import { Collision, SIDES } from "./Collisions";

interface ITimer {
  frame?: number;
  time?: number;
  callback(): void;
  id: string;
}

class RootGObject extends GObject {
  constructor(width: number, height: number) {
    super({
      position: new Vector2(0, 0),
      dimensions: new Vector2(width, height),
      scale: 1,
      rotation: 0
    })
  }
}

export class Game {
  currentScene?: Scene;
  canvasContext: CanvasRenderingContext2D;
  canvasElement: HTMLCanvasElement;
  frame = 0;
  timers: ITimer[] = [];
  input: Input<Window>;
  width: number;
  height: number;
  collisions: Collision<any>[] = [];
  flatLookupId = new Map<string, GObject>();
  flatLookupClass = new Map<string, GObject[]>();
  debug: boolean;

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

  public registerCollision<T extends GObject>(obj: GObject | string, selector: string, callback: (collider: T, side: SIDES) => void) {
    this.collisions.push(new Collision<T>(obj, selector, callback));
  }

  private callCallbacks() {
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
      const root = this.currentScene.build(this);
      this.render(root);
      this.runCollisions();
    }
    this.frame++;
    requestAnimationFrame(() => this.loop());
  }

  private render(obj: GObject, parent?: GObject) {
    if (!parent) parent =
      new RootGObject(this.width, this.height);
    obj.prepare(this);
    if (obj.id) {
      this.flatLookupId.set(obj.id, obj);
    }
    if (obj.className) {
      if (this.flatLookupClass.has(obj.className)) {
        this.flatLookupClass.get(obj.className)!.push(obj);
      }
      else {
        this.flatLookupClass.set(obj.className, [obj]);
      }
    }
    obj.render(this.canvasContext, parent);
    if (this.debug) {
      this.canvasContext.strokeStyle = 'red';
      this.canvasContext.strokeRect(obj.position.x, obj.position.y, obj.dimensions.x, obj.dimensions.y);
    }
    let children = obj.build(this);
    if (children instanceof GObject) children = [children];
    if (children) {
      children.forEach(child => {
        child.position = child.position.add(obj.position);
        child.rotation += obj.rotation;
        child.scale += obj.scale;
        this.render(child, obj);
      });
    }
  }

  private runCollisions() {
    for (let collision of this.collisions) {
      const one = collision.obj1 instanceof GObject
        ? collision.obj1
        : this.flatLookupId.get(collision.obj1);
      if (!one) continue;
      const id = collision.obj2;
      const typeMarker = id[0];
      const label = id.substring(1);
      if (typeMarker == '#') {
        const two = this.flatLookupId.get(label);
        if (two) {
          const side = this.checkCollision(one, two);
          if (side !== SIDES.NONE) collision.callback(two, side);
        }
      }
      else if (typeMarker == '.') {
        const twos = this.flatLookupClass.get(label);
        if (twos) {
          for (let two of twos) {
            const side = this.checkCollision(one, two);
            if (side !== SIDES.NONE) collision.callback(two, side);
          }
        }
      }
      else continue;
    }
    this.collisions = [];
    this.flatLookupClass.clear();
    this.flatLookupId.clear();
  }

  private checkCollision(one: GObject, two: GObject) {
    const rect1 = {
      x: one.position.x,
      y: one.position.y,
      width: one.dimensions.x,
      height: one.dimensions.y
    };

    const rect2 = {
      x: two.position.x,
      y: two.position.y,
      width: two.dimensions.x,
      height: two.dimensions.y
    };

    if (rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y) {
        const b1 = rect1.y + rect1.height;
        const b2 = rect2.y + rect2.height;
        const r1 = rect1.x + rect1.width;
        const r2 = rect2.x + rect2.width;

        const bCollision = b2 - rect1.y;
        const tCollision = b1 - rect2.y;
        const lCollision = r1 - rect2.x;
        const rCollision = r2 - rect1.x;

        if (tCollision < bCollision && tCollision < lCollision && tCollision < rCollision) {                           
          return SIDES.TOP;
        }
        if (bCollision < tCollision && bCollision < lCollision && bCollision < rCollision) {
          return SIDES.BOTTOM;
        }
        if (lCollision < rCollision && lCollision < tCollision && lCollision < bCollision) {
          return SIDES.LEFT;
        }
        if (rCollision < lCollision && rCollision < tCollision && rCollision < bCollision ) {
          return SIDES.RIGHT;
        }
    }
    return SIDES.NONE;
  }

  constructor(private options: IGameOptions = new GameOptions()) {
    this.debug = options.debug || false;
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
    this.canvasElement.tabIndex = 1;
    this.input = new Input(options.eventTarget ? options.eventTarget : window);
    this.width = this.canvasElement.width;
    this.height = this.canvasElement.height;
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
  eventTarget?: Listenable;
  debug?: boolean;
}

export class GameOptions implements IGameOptions {

}

export let startGame = (scene: Scene, options?: IGameOptions) =>
  (new Game(options)).loadScene(scene).start();

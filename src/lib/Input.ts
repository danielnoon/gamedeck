import { Vector2 } from "./Utils";

export interface Listenable {
  addEventListener(event: string, callback: (ev: KeyboardEvent) => void): void;
}


export class Input <T extends Listenable> {
  private keys = new Set<string>();
  private aliases = new Map<string, string>();
  private mouse = {
    left: false,
    middle: false,
    right: false,
    location: new Vector2(0, 0)
  }

  keyDown(ev: KeyboardEvent) {
    this.keys.add(ev.code);
  }

  keyUp(ev: KeyboardEvent) {
    this.keys.delete(ev.code);
  }

  setAlias(alias: string, code: string) {
    this.aliases.set(alias, code);
  }

  isPressed(code: string) {
    if (this.aliases.has(code)) {
      code = this.aliases.get(code)!;
    }
    return this.keys.has(code);
  }

  mouseMove(ev: MouseEvent) {
    this.mouse.location = new Vector2(ev.x, ev.y);
  }

  mouseIsDown() {
    return this.mouse.left;
  }

  getMouseLocation() {
    return this.mouse.location;
  }

  constructor(listenable: T) {
    listenable.addEventListener('keydown', ev => this.keyDown(ev));
    listenable.addEventListener('keyup', ev => this.keyUp(ev));
    listenable.addEventListener('pointerdown', ev => this.mouse.left = true);
    listenable.addEventListener('pointerup', ev => this.mouse.left = false);
    listenable.addEventListener('pointermove', (ev: any) => this.mouseMove(ev));
  }
}

export interface Listenable {
  addEventListener(event: string, callback: (ev: KeyboardEvent) => void): void;
}


export class Input <T extends Listenable> {
  private keys = new Set<string>();
  private aliases = new Map<string, string>();

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

  constructor(listenable: T) {
    listenable.addEventListener('keydown', ev => this.keyDown(ev))
    listenable.addEventListener('keyup', ev => this.keyUp(ev))
  }
}

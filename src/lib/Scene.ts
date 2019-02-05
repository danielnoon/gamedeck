import { GObject } from "./GObject";
import { Game } from "./Game";

export abstract class Scene {
  abstract build(game: Game): GObject;
  abstract update(game: Game): void;
}
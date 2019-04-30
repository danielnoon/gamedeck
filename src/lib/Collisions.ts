import { GObject } from "./GObject";

export enum SIDES {
  NONE,
  LEFT,
  RIGHT,
  TOP,
  BOTTOM
}

export class Collision<T extends GObject> {
  constructor(
    public obj1: GObject | string,
    public obj2: string,
    public callback: (collider: T, side: SIDES) => void
  ) {}
}
import { GObject } from "./GObject";

export type PositioningType = 'left' | 'right' | 'center';

export interface AssetRenderingOptions {
  positioning?: PositioningType;
  positioningX?: PositioningType;
  positioningY?: PositioningType;
}

export abstract class Asset {
  abstract draw(ctx: CanvasRenderingContext2D, owner: GObject, options?: AssetRenderingOptions): void;
}

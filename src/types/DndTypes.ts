export interface ClientRect {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export enum MeasuringStrategy {
  Always,
  BeforeDragging,
  WhileDragging,
}

export enum MeasuringFrequency {
  Optimized = 'optimized',
}

export interface DroppableMeasuring {
  measure: MeasuringFunction;
  strategy: MeasuringStrategy;
  frequency: MeasuringFrequency | number;
}

export type MeasuringFunction = (node: HTMLElement) => ClientRect;

interface Measuring {
  measure: MeasuringFunction;
}

export interface DraggableMeasuring extends Measuring {}

export interface DragOverlayMeasuring extends Measuring {}

export interface MeasuringConfiguration {
  draggable?: Partial<DraggableMeasuring>;
  droppable?: Partial<DroppableMeasuring>;
  dragOverlay?: Partial<DragOverlayMeasuring>;
}

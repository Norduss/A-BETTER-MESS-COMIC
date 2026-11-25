export interface Illustration {
  src?: string;
  alt: string;
  width: number;
  height: number;
}

export type PanelText =
  | { kind: 'dialogue'; speaker: string; text: string }
  | { kind: 'onomatopoeia'; text: string }
  | { kind: 'caption'; text: string };

export interface PanelBalloon {
  src: string;
  /** Center and width as percentages of the illustration frame. */
  x: number;
  y: number;
  width: number;
}

export interface Panel {
  id: string;
  label: string;
  kind: 'panorama' | 'traditional';
  framing?: 'detail';
  illustration: Illustration;
  parallax?: { position: string; mobilePosition: string };
  depth?: boolean;
  text: readonly PanelText[];
  textInImage?: boolean;
  balloons?: readonly PanelBalloon[];
  motion?: 'drop';
  audio?: { src: string; label: string };
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  rows: readonly (readonly Panel[])[];
}

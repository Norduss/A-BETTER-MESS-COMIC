export interface Illustration {
  src?: string;
  alt: string;
  width: number;
  height: number;
}

export type PanelText =
  | { kind: 'dialogue'; speaker: string; text: string }
  | { kind: 'onomatopoeia'; text: string };

export interface Panel {
  id: string;
  label: string;
  kind: 'panorama' | 'traditional';
  framing?: 'detail';
  illustration: Illustration;
  parallax?: { position: string; mobilePosition: string };
  text: readonly PanelText[];
  textInImage?: boolean;
  motion?: 'drop';
  audio?: { src: string; label: string };
}

export interface Chapter {
  id: string;
  number: string;
  title: string;
  rows: readonly (readonly Panel[])[];
}

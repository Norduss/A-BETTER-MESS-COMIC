/**
 * Ambientación visual de cada capítulo.
 * Se guarda aparte de los archivos del capítulo para no tocar el guion:
 * aquí solo se decide el tono, el color y qué viñeta existente sirve de fondo
 * para la introducción. Ningún texto narrativo vive aquí.
 */
export type ThemeStyle = 'patch' | 'order' | 'mixed';

export interface ChapterTheme {
  /** Lenguaje gráfico: remendado (Desparchados), controlado (Orden Blanca) o mezcla. */
  style: ThemeStyle;
  /** Etiqueta corta del territorio/estado que domina el capítulo. */
  tag: string;
  /** Viñeta del propio capítulo usada como fondo difuminado de la introducción. */
  backdrop: string;
  /** Fondo del capítulo y color de acento. */
  bg: string;
  accent: string;
}

export const chapterThemes: Record<string, ChapterTheme> = {
  'acontecimiento-1': { style: 'patch', tag: 'Los Desparchados', backdrop: 'V1', bg: '#16110d', accent: '#d2692f' },
  'acontecimiento-2': { style: 'order', tag: 'La Orden Blanca', backdrop: 'V3', bg: '#0d131d', accent: '#8db6ec' },
  'acontecimiento-3': { style: 'order', tag: 'La Limpieza', backdrop: 'V1', bg: '#0f1719', accent: '#9dd3c8' },
  'acontecimiento-4': { style: 'mixed', tag: 'La frontera', backdrop: 'V1', bg: '#17120f', accent: '#e0a33a' },
  'acontecimiento-5': { style: 'mixed', tag: 'A Better Mess', backdrop: 'V1', bg: '#17120f', accent: '#e0a33a' },
  'acontecimiento-6': { style: 'patch', tag: 'A Better Mess', backdrop: 'V1', bg: '#16110d', accent: '#d2692f' },
  'acontecimiento-7': { style: 'mixed', tag: 'A Better Mess', backdrop: 'V1', bg: '#17120f', accent: '#e0a33a' },
};

const fallback: ChapterTheme = { style: 'patch', tag: 'A Better Mess', backdrop: 'V1', bg: '#121110', accent: '#d2692f' };

export const themeFor = (id: string) => chapterThemes[id] ?? fallback;

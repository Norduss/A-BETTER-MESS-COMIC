import type { Chapter } from '../types';

export default {
  id: 'acontecimiento-1',
  number: '01',
  title: 'La vida cotidiana en un mundo de basura',
  rows: [
    [
      {
        id: 'V1',
        label: 'Los Desparchados',
        kind: 'panorama',
        illustration: {
          src: '/comic/los-desparchados-panorama.jpg',
          alt: 'En Los Desparchados, viviendas hechas con chapa y vehículos recuperados se apilan sobre un cañón. Puentes, cables y tuberías cruzan entre las cascadas.',
          width: 1376,
          height: 768,
        },
        parallax: { position: '50% 52%', mobilePosition: '51% 52%' },
        text: [],
      },
    ],
    [
      {
        id: 'V3',
        label: 'Blund',
        kind: 'traditional',
        illustration: {
          alt: 'Blund, un cigarrillo antropomórfico con bolso cruzado, pulsera y zapatillas gastadas, descansa con los pies en alto.',
          width: 960,
          height: 540,
        },
        text: [{ kind: 'dialogue', speaker: 'Blund', text: 'Hoy sí que no pienso complicarme la vida' }],
      },
    ],
    [
      {
        id: 'V4',
        label: 'La gotera',
        kind: 'traditional',
        framing: 'detail',
        illustration: {
          alt: 'Una gota cae de una tubería agrietada y golpea el agua dentro de un balde de metal.',
          width: 720,
          height: 480,
        },
        text: [{ kind: 'onomatopoeia', text: 'PLOC' }],
        motion: 'drop',
        audio: { src: '/comic/ploc.wav', label: 'Escuchar gotera' },
      },
    ],
  ],
} satisfies Chapter;

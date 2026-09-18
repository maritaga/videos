/**
 * Event photographs cut in over the narration, on the reel's own timeline.
 * These come from the project's own archive (already in public/images from
 * the first reel), matched to what the script asks for at each beat.
 *
 * Beat boundaries: hook 0 · presentation 132 · how 359 · meaning 604
 * close 781 · voice ends 1027 · ends 1057
 */
export type Cut = {
  file: string;
  at: number;
  frames: number;
  dim?: boolean;
  fade?: number;
};

const FADE = 13;

export const cutaways: Cut[] = [
  // "historias y experiencias" — the storybook workshop, then a session.
  { file: "narrar-cuento.jpg", at: 236, frames: 62, dim: true },
  { file: "presentacion-sala.jpg", at: 292, frames: 62, dim: true },
  // "literatura, naturaleza, ciencia, comunidad" — real workshops and field.
  { file: "aula-manglar.jpg", at: 470, frames: 66, dim: true },
  { file: "sesion-arranque.jpg", at: 530, frames: 66, dim: true },
  // "convertirse en acción" — young people at work.
  { file: "presentacion-vertical.jpg", at: 700, frames: 76, dim: true },
  // The close, behind "mirar, nombrar y proteger".
  { file: "grupo.jpg", at: 940, frames: 56, dim: true },
];

export const withFade = cutaways.map((c) => ({ fade: FADE, ...c }));

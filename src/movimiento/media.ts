/**
 * Event photographs cut in over the narration, on the reel's own timeline.
 *
 * All six are new to this reel — none of the images from the first one are
 * reused, so the two pieces do not read as the same footage twice if they go
 * out close together. Each is matched to what the script asks for at its beat.
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

/** Long enough to read as a dissolve rather than a cut. */
const FADE = 13;

export const cutaways: Cut[] = [
  // "en historias y experiencias que podemos entender" — children reading out
  // their own work, then a workshop in session.
  { file: "taller-ninos.jpg", at: 232, frames: 64, dim: true },
  { file: "aula-taller.jpg", at: 290, frames: 64, dim: true },
  // "literatura, naturaleza, ciencia y comunidad" — under the four pillars.
  { file: "jovenes-naturaleza.jpg", at: 466, frames: 68, dim: true },
  { file: "comunidad-lona.jpg", at: 528, frames: 68, dim: true },
  // "convertirse en acción" — the science fair, timed to land with the word.
  { file: "feria-ciencia.jpg", at: 718, frames: 74, dim: true },
  // Behind "mirar, nombrar y proteger".
  { file: "conversatorio-panel.jpg", at: 936, frames: 58, dim: true },
].map((cut) => ({ fade: FADE, ...cut }));

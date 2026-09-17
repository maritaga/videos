/**
 * Photographs cut in over the narration. `at` and `frames` are relative to the
 * start of that section, so retiming a section leaves them alone.
 *
 * Files live in `public/images/`.
 */
export type Cut = {
  file: string;
  at: number;
  frames: number;
  /** Darken the photo so copy can sit over it. */
  dim?: boolean;
};

export const cutaways: Record<string, Cut[]> = {
  /**
   * "escuelas y comunidades educativas" — the two group shots, after the map
   * has finished spreading and the chip has landed.
   */
  vision: [
    { file: "sesion-arranque.jpg", at: 162, frames: 50 },
    { file: "presentacion-vertical.jpg", at: 214, frames: 44 },
  ],

  /** The network of people, once the graph and its labels are up. */
  network: [{ file: "grupo.jpg", at: 118, frames: 54 }],

  /**
   * One per verb, running back to back so the whole beat plays over real
   * material: the storybook slide for narrar, the lecture for comprender,
   * the mangrove talk for proteger. Slight overlaps give a crossfade, and
   * these are dimmed because the words sit on top of them.
   */
  objective: [
    { file: "narrar-cuento.jpg", at: 50, frames: 48, dim: true },
    { file: "presentacion-sala.jpg", at: 94, frames: 50, dim: true },
    { file: "aula-manglar.jpg", at: 140, frames: 49, dim: true },
  ],

  /** The closing montage, after the last line of copy has been read. */
  closing: [
    { file: "feria-mascota.jpg", at: 48, frames: 30 },
    { file: "presentacion-sala.jpg", at: 75, frames: 26 },
  ],
};

/** The mark, shown on the end card in place of the text lockup. */
export const LOGO: string | null = "logo.png";

export const HANDLE = "@lacienciadelasletras.oficial";

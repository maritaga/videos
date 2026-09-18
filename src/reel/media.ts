/**
 * Photographs cut in over the narration, positioned on the reel's own
 * timeline rather than inside a section.
 *
 * Placing them absolutely is what lets each one straddle a join between two
 * takes: the photograph is already on screen when the cut happens, so it
 * hides the cut instead of adding two more of its own. The ones that cannot
 * sit on a join are given a long dissolve instead.
 *
 * Section boundaries, for reference:
 *   hook 0 · vision 132 · network 378 · objective 553 · closing 742
 *   verbs land at 607, 649, 691 · end card 846 · ends 892
 *
 * These are absolute frames, so retiming any take moves the joins and these
 * have to move with them.
 */
export type Cut = {
  file: string;
  /** Absolute frame in the reel. */
  at: number;
  frames: number;
  /** Darken the photo so copy can sit over it. */
  dim?: boolean;
  /** Frames to dissolve at each end. */
  fade?: number;
};

/** Long enough to read as a dissolve rather than a cut. */
const FADE = 14;

export const cutaways: Cut[] = [
  // "escuelas y comunidades educativas", once the map has finished spreading.
  { file: "sesion-arranque.jpg", at: 286, frames: 66 },
  // Straddles the vision → network join.
  { file: "presentacion-vertical.jpg", at: 346, frames: 60 },
  // Straddles the network → objective join.
  { file: "grupo.jpg", at: 491, frames: 76 },
  // One per verb. The last straddles the objective → closing join.
  { file: "narrar-cuento.jpg", at: 582, frames: 74, dim: true },
  { file: "presentacion-sala.jpg", at: 644, frames: 66, dim: true },
  { file: "aula-manglar.jpg", at: 686, frames: 90, dim: true },
  // Resolves into the end card as it fades up.
  { file: "feria-mascota.jpg", at: 768, frames: 80, dim: true },
].map((cut) => ({ fade: FADE, ...cut }));

/** The mark, shown on the end card in place of the text lockup. */
export const LOGO: string | null = "logo.png";

export const HANDLE = "@lacienciadelasletras.oficial";

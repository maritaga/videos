/**
 * Photographs cut in over the narration. `at` and `frames` are relative to the
 * start of that section, so retiming a section does not disturb them.
 *
 * Files live in `public/images/`. Every section stands on its own with motion
 * graphics only, so an empty list here still produces a finished reel.
 */
export type Cut = { file: string; at: number; frames: number };

export const cutaways: Record<string, Cut[]> = {
  /** 4–14s: real activity photographs behind "de lo local a lo global". */
  vision: [{ file: "mascota.jpg", at: 152, frames: 52 }],
  /** 14–20s: the network of scientists, young people and communities. */
  network: [],
  /** 20–27s: one per verb — narrar, comprender, proteger. */
  objective: [],
  /** 27–30s: the closing montage. */
  closing: [],
};

/**
 * The logo lockup. Drop the file into `public/images/` and name it here; the
 * end card then swaps its text lockup for the real mark.
 */
export const LOGO: string | null = null;

export const HANDLE = "@lacienciadelasletras.oficial";

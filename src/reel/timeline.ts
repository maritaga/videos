import { staticFile } from "remotion";

export const FPS = 30;

/**
 * One take per section of the script, cut to the spans where she is actually
 * speaking — frame ranges measured from the speech envelope of the source
 * audio, with ~0.14s of breathing room either side. These takes are clean;
 * only section 2 carries a pause worth removing.
 *
 * `gain` evens out the level between takes, from their speech-only RMS.
 */
export const takes = [
  { id: "seccion1", gain: 1.13, segments: [{ from: 6, frames: 132 }] },
  { id: "seccion2", gain: 1.23, segments: [{ from: 22, frames: 246 }] },
  { id: "seccion3", gain: 0.91, segments: [{ from: 1, frames: 175 }] },
  { id: "seccion4", gain: 0.86, segments: [{ from: 10, frames: 189 }] },
  { id: "seccion5", gain: 0.96, segments: [{ from: 8, frames: 150 }] },
] as const;

/**
 * The hook plays the stand footage instead of the presenter, with her voice
 * over it. The clip is 115 frames and the line runs 132, so it is slowed
 * just under 13% to cover — not enough to read as slow motion.
 */
export const HOOK_CLIP = "hook.mov";
export const HOOK_SOURCE_FRAMES = 115;
export const HOOK_VOICE = "seccion1-voz.wav";

export const src = (id: string) => staticFile(`${id}.mp4`);

/** Length of a take once its pauses are removed. */
export const takeLength = (take: (typeof takes)[number]) =>
  take.segments.reduce((sum, s) => sum + s.frames, 0);

export const starts = takes.reduce<number[]>((acc, _, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + takeLength(takes[i - 1]));
  return acc;
}, []);

export const TOTAL = takes.reduce((sum, t) => sum + takeLength(t), 0);

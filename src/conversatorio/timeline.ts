import { staticFile } from "remotion";

export const FPS = 30;

/**
 * One take per section of the script, cut to the speech. These were recorded
 * in one sitting and each runs straight through, so nothing needed removing
 * from the middle of any of them — the trims are only the lead-in and tail.
 *
 * Source is 1080x1920 at 60fps (shot on a phone, so it carries a 90° rotation
 * flag); the reel renders at 30, which is plenty for a talking head.
 *
 * `gain` evens out the level between takes, from their speech-only RMS.
 */
export const takes = [
  { id: "conv1", gain: 0.94, segments: [{ from: 5, frames: 183 }] },
  { id: "conv2", gain: 0.94, segments: [{ from: 2, frames: 256 }] },
  { id: "conv3", gain: 1.07, segments: [{ from: 0, frames: 221 }] },
  { id: "conv4", gain: 1.15, segments: [{ from: 0, frames: 221 }] },
  { id: "conv5", gain: 0.94, segments: [{ from: 5, frames: 168 }] },
] as const;

/**
 * A beat of silence after the last word, so the QR stays up long enough to
 * actually be scanned rather than vanishing on the final syllable.
 */
export const TAIL = 24;

export const src = (id: string) => staticFile(`${id}.mp4`);

export const takeLength = (take: (typeof takes)[number]) =>
  take.segments.reduce((sum, s) => sum + s.frames, 0);

export const starts = takes.reduce<number[]>((acc, _, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + takeLength(takes[i - 1]));
  return acc;
}, []);

export const SPOKEN = takes.reduce((sum, t) => sum + takeLength(t), 0);
export const TOTAL = SPOKEN + TAIL;

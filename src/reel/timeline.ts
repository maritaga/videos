import { staticFile } from "remotion";

export const FPS = 30;

/**
 * Each take is one section of the script. Two of them (and the third, briefly)
 * carry a pause of a second or more mid-sentence, which is dead weight in a
 * reel, so every take is cut into the spans where she is actually speaking —
 * frame ranges measured from the speech envelope of the source audio, with
 * ~0.14s of breathing room kept either side. Dropping the pauses takes the
 * piece from 33.5s to 31.1s without losing a word.
 *
 * `gain` evens out the level between takes; only take 3 was meaningfully quiet.
 */
export const takes = [
  {
    id: "clip1",
    gain: 0.97,
    segments: [
      { from: 0, frames: 115 },
      { from: 145, frames: 18 },
    ],
  },
  { id: "clip2", gain: 0.99, segments: [{ from: 1, frames: 280 }] },
  {
    id: "clip3",
    gain: 1.23,
    segments: [
      { from: 0, frames: 139 },
      { from: 147, frames: 33 },
    ],
  },
  { id: "clip4", gain: 0.93, segments: [{ from: 0, frames: 202 }] },
  {
    id: "clip5",
    gain: 0.93,
    segments: [
      { from: 0, frames: 122 },
      { from: 154, frames: 25 },
    ],
  },
] as const;

export const src = (id: string) => staticFile(`${id}.mp4`);

/** Length of a take once its pauses are removed. */
export const takeLength = (take: (typeof takes)[number]) =>
  take.segments.reduce((sum, s) => sum + s.frames, 0);

export const starts = takes.reduce<number[]>((acc, _, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + takeLength(takes[i - 1]));
  return acc;
}, []);

export const TOTAL = takes.reduce((sum, t) => sum + takeLength(t), 0);

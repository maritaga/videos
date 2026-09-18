import { staticFile } from "remotion";

export const FPS = 30;

/**
 * Thirteen takes, numbered in the order they play. Several are a second or
 * less — the hook is three quick cuts on "ballena", "libro" and "ciencia",
 * and the close cuts again on "mirar", "nombrar" and "proteger".
 *
 * Most of them run on past the last word while he holds for the camera, so
 * every take is trimmed to its speech: frame ranges measured from the speech
 * envelope, keeping 0.12s of air either side. That takes 42.9s of rushes down
 * to 34.2s and removes the held endings.
 *
 * Source is 1080x1920 at 60fps (phone, so a 90° rotation flag); rendered at 30.
 */
export const takes = [
  { id: "n1", segments: [{ from: 0, frames: 29 }] },
  { id: "n2", segments: [{ from: 0, frames: 28 }] },
  { id: "n3", segments: [{ from: 0, frames: 20 }, { from: 34, frames: 18 }] },
  { id: "n4", segments: [{ from: 16, frames: 30 }, { from: 64, frames: 7 }] },
  { id: "n5", segments: [{ from: 20, frames: 227 }] },
  { id: "n6", segments: [{ from: 20, frames: 245 }] },
  { id: "n7", segments: [{ from: 8, frames: 89 }, { from: 105, frames: 88 }] },
  { id: "n8", segments: [{ from: 0, frames: 73 }] },
  { id: "n9", segments: [{ from: 0, frames: 16 }] },
  { id: "n10", segments: [{ from: 10, frames: 24 }] },
  { id: "n11", segments: [{ from: 15, frames: 52 }] },
  { id: "n12", segments: [{ from: 0, frames: 44 }] },
  { id: "n13", segments: [{ from: 0, frames: 37 }] },
] as const;

/**
 * Levels sit close enough between takes that a per-take gain would be doing
 * nothing; they were all recorded in one session at one distance.
 */
export const GAIN = 1;

/** Holds the logo after the last word. */
export const TAIL = 30;

export const src = (id: string) => staticFile(`${id}.mov`);

export const takeLength = (take: (typeof takes)[number]) =>
  take.segments.reduce((sum, s) => sum + s.frames, 0);

export const starts = takes.reduce<number[]>((acc, _, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + takeLength(takes[i - 1]));
  return acc;
}, []);

export const SPOKEN = takes.reduce((sum, t) => sum + takeLength(t), 0);
export const TOTAL = SPOKEN + TAIL;

/**
 * The script's five beats, as index ranges into `takes`. The numbering of the
 * rushes already follows the script, and the cumulative run of each group
 * lands within a second of the timings in it.
 */
export const beats = {
  hook: [0, 3],
  presentation: [4, 4],
  how: [5, 5],
  meaning: [6, 6],
  close: [7, 12],
} as const;

export const beatStart = (k: keyof typeof beats) => starts[beats[k][0]];
export const beatEnd = (k: keyof typeof beats) => {
  const i = beats[k][1];
  return starts[i] + takeLength(takes[i]);
};

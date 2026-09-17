import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";

const BLUR = 9;
const RAMP = 7;

/**
 * Softens the joins. Every cut in this piece is between shots of the same
 * person in the same framing, so a plain hard cut reads as a jump. Blurring
 * and easing the scale into and out of each shot blurs both sides of the seam
 * towards each other, which lands like a focus pull rather than a jump.
 *
 * It only touches the picture — the audio still cuts clean, which is what
 * keeps her voice from doubling or smearing at the join.
 */
export const Seam: React.FC<{
  length: number;
  children: React.ReactNode;
  /** No blur on the way in, for the very first shot of the reel. */
  openCold?: boolean;
}> = ({ length, children, openCold = false }) => {
  const frame = useCurrentFrame();

  const inBlur = openCold
    ? 0
    : interpolate(frame, [0, RAMP], [BLUR, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  const outBlur = interpolate(frame, [length - RAMP, length], [0, BLUR], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blur = Math.max(inBlur, outBlur);

  // A touch of scale travelling with the blur, so the shot settles into place.
  const scale = 1 + (blur / BLUR) * 0.022;

  return (
    <AbsoluteFill
      style={{
        filter: blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : undefined,
        transform: `scale(${scale.toFixed(4)})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, FONT } from "../../shared/theme";

export type Beat = { text: string; colour: string };

/**
 * One word at a time, each replacing the last. The previous section already
 * stacks its three words up the frame; cycling these through the same spot
 * keeps the two beats from looking like the same device twice.
 */
export const WordCycle: React.FC<{
  beats: Beat[];
  start: number;
  every: number;
  top: number;
  size?: number;
}> = ({ beats, start, every, top, size = 92 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 84,
        right: 84,
        height: size * 1.5,
      }}
    >
      {beats.map((beat, i) => {
        const at = start + i * every;
        const enter = spring({
          frame: frame - at,
          fps,
          config: { damping: 15, mass: 0.6 },
        });
        // The last word stays up; the others hand over to the next.
        const leave =
          i === beats.length - 1
            ? 0
            : interpolate(frame - (at + every), [-8, 4], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });

        return (
          <div
            key={beat.text}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "flex-start",
              gap: 20,
              opacity: enter * (1 - leave),
              transform: `translateY(${
                interpolate(enter, [0, 1], [34, 0]) - leave * 30
              }px)`,
            }}
          >
            <span
              style={{
                width: 13,
                height: size * 0.66,
                borderRadius: 7,
                background: beat.colour,
                flexShrink: 0,
                marginTop: size * 0.16,
              }}
            />
            <span
              style={{
                fontFamily: FONT,
                fontWeight: 900,
                fontSize: size,
                letterSpacing: "-0.025em",
                color: brand.ink,
                lineHeight: 1.05,
              }}
            >
              {beat.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, FONT } from "../theme";

export type Chip = { text: string; colour: string };

/**
 * Pill-shaped labels over the lower part of frame, where the dark scrim keeps
 * them legible against the presenter.
 */
export const LowerThird: React.FC<{
  chips: Chip[];
  start: number;
  stagger?: number;
  bottom?: number;
  size?: number;
}> = ({ chips, start, stagger = 12, bottom = 250, size = 44 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        bottom,
        left: 84,
        right: 84,
        display: "flex",
        flexWrap: "wrap",
        gap: 16,
        justifyContent: "center",
      }}
    >
      {chips.map((chip, i) => {
        const enter = spring({
          frame: frame - (start + i * stagger),
          fps,
          config: { damping: 16, mass: 0.6 },
        });
        return (
          <span
            key={chip.text}
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: size,
              letterSpacing: "0.01em",
              color: brand.paper,
              background: chip.colour,
              padding: "14px 30px 17px",
              borderRadius: 999,
              opacity: enter,
              transform: `translateY(${interpolate(enter, [0, 1], [30, 0])}px) scale(${interpolate(enter, [0, 1], [0.86, 1])})`,
              whiteSpace: "nowrap",
            }}
          >
            {chip.text}
          </span>
        );
      })}
    </div>
  );
};

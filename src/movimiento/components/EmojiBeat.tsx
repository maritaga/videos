import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, FONT } from "../../shared/theme";

/**
 * One symbol per cut through the hook — whale, book, microscope — landing on
 * the word as he says it. The emoji does the work; the caption under it is
 * small so the three cuts stay fast.
 */
export const EmojiBeat: React.FC<{
  emoji: string;
  caption: string;
  start: number;
  top?: number;
}> = ({ emoji, caption, start, top = 210 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - start,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 0,
        right: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        opacity: enter,
        transform: `scale(${interpolate(enter, [0, 1], [0.55, 1])})`,
      }}
    >
      <span style={{ fontSize: 150, lineHeight: 1 }}>{emoji}</span>
      <span
        style={{
          fontFamily: FONT,
          fontWeight: 900,
          fontSize: 52,
          letterSpacing: "0.02em",
          color: brand.paper,
          textShadow: "0 3px 24px rgba(0,0,0,0.6)",
        }}
      >
        {caption}
      </span>
    </div>
  );
};

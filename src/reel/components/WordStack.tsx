import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, FONT } from "../theme";

export type StackItem = { text: string; colour: string };

/**
 * NARRAR. COMPRENDER. PROTEGER. — each word lands on its own beat and the
 * earlier ones stay up, so the three read as one sentence by the end.
 */
export const WordStack: React.FC<{
  items: StackItem[];
  start: number;
  beat: number;
  top: number;
  size?: number;
  /** Ink on the wall, or white over darkened photographs. */
  tone?: "ink" | "paper";
}> = ({ items, start, beat, top, size = 104, tone = "ink" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 84,
        right: 84,
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      {items.map((item, i) => {
        const at = start + i * beat;
        const enter = spring({
          frame: frame - at,
          fps,
          config: { damping: 14, mass: 0.7 },
        });
        // A short emphasis pulse as the word lands, then it settles back.
        const punch = interpolate(frame - at, [0, 6, 18], [1.12, 1.02, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={item.text}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              opacity: enter,
              transform: `translateX(${interpolate(enter, [0, 1], [-40, 0])}px) scale(${punch})`,
              transformOrigin: "left center",
            }}
          >
            <span
              style={{
                width: 14,
                height: size * 0.62,
                borderRadius: 7,
                background: item.colour,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: FONT,
                fontWeight: 900,
                fontSize: size,
                letterSpacing: "-0.025em",
                color: tone === "paper" ? brand.paper : brand.ink,
                lineHeight: 1,
                textShadow:
                  tone === "paper" ? "0 3px 26px rgba(0,0,0,0.6)" : undefined,
              }}
            >
              {item.text}
            </span>
          </div>
        );
      })}
    </div>
  );
};

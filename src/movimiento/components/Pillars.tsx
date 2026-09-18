import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, FONT } from "../../shared/theme";

export type Pillar = { text: string; emoji: string; colour: string };

/**
 * The four things the project combines, arriving one at a time around him
 * while he gestures. They sit in a 2x2 over the top of the frame rather than
 * out at the corners: he is framed tight enough that the corners are him.
 */
export const Pillars: React.FC<{
  items: Pillar[];
  start: number;
  stagger: number;
  top?: number;
}> = ({ items, start, stagger, top = 190 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: 70,
        right: 70,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px 18px",
      }}
    >
      {items.map((item, i) => {
        const enter = spring({
          frame: frame - (start + i * stagger),
          fps,
          config: { damping: 15, mass: 0.6 },
        });
        return (
          <div
            key={item.text}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: item.colour,
              borderRadius: 999,
              padding: "14px 22px 16px",
              opacity: enter,
              transform: `translateY(${interpolate(enter, [0, 1], [26, 0])}px) scale(${interpolate(enter, [0, 1], [0.88, 1])})`,
              justifySelf: i % 2 === 0 ? "start" : "end",
            }}
          >
            <span style={{ fontSize: 40, lineHeight: 1 }}>{item.emoji}</span>
            <span
              style={{
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: 42,
                color: brand.paper,
                whiteSpace: "nowrap",
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

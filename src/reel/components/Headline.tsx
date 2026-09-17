import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand, FONT, layout } from "../theme";

export type Word = {
  text: string;
  /** Filled highlight box behind the word, in the logo's palette. */
  highlight?: string;
  /** Ink colour; defaults to near-black, or white inside a highlight. */
  color?: string;
};

/**
 * Words rise into place one after another. `stagger` is the gap between them in
 * frames — tight enough to feel spoken rather than typed.
 */
export const Headline: React.FC<{
  words: Word[];
  start?: number;
  stagger?: number;
  size?: number;
  top?: number;
  lineHeight?: number;
  /** Ink on the bright wall, or white over darkened footage. */
  tone?: "ink" | "paper";
}> = ({
  words,
  start = 0,
  stagger = 4,
  size = 92,
  top = layout.textTop,
  lineHeight = 1.06,
  tone = "ink",
}) => {
  const base = tone === "paper" ? brand.paper : brand.ink;
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        position: "absolute",
        top,
        left: layout.gutter,
        right: layout.gutter,
        display: "flex",
        flexWrap: "wrap",
        gap: `${size * 0.14}px ${size * 0.17}px`,
        alignContent: "flex-start",
      }}
    >
      {words.map((word, i) => {
        const at = start + i * stagger;
        const enter = spring({
          frame: frame - at,
          fps,
          config: { damping: 200, mass: 0.5 },
        });
        const y = interpolate(enter, [0, 1], [26, 0]);

        return (
          <span
            key={`${word.text}-${i}`}
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: size,
              lineHeight,
              letterSpacing: "-0.02em",
              color: word.color ?? (word.highlight ? brand.paper : base),
              background: word.highlight,
              padding: word.highlight ? `0.04em 0.18em 0.1em` : undefined,
              borderRadius: word.highlight ? 14 : undefined,
              opacity: enter,
              transform: `translateY(${y}px)`,
              display: "inline-block",
              textShadow:
                tone === "paper" && !word.highlight
                  ? "0 3px 26px rgba(0,0,0,0.55)"
                  : undefined,
            }}
          >
            {word.text}
          </span>
        );
      })}
    </div>
  );
};

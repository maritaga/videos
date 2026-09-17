import { AbsoluteFill } from "remotion";

export type ScrimVariant = "wall" | "footage";

/**
 * "wall" lifts the bright wall behind the presenter so dark copy keeps its
 * contrast. "footage" does the opposite: the stand clip is busy and mid-toned,
 * so the hook darkens down and the copy goes white.
 */
export const Scrim: React.FC<{ variant?: ScrimVariant }> = ({
  variant = "wall",
}) =>
  variant === "wall" ? (
    <>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.45) 32%, rgba(255,255,255,0) 52%)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.12) 14%, rgba(0,0,0,0) 28%)",
        }}
      />
    </>
  ) : (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(to bottom, rgba(6,14,12,0.82) 0%, rgba(6,14,12,0.62) 30%, rgba(6,14,12,0.18) 58%, rgba(6,14,12,0.38) 100%)",
      }}
    />
  );

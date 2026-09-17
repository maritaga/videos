import { AbsoluteFill } from "remotion";

/**
 * Lifts the wall behind the copy a little and darkens the very bottom, so type
 * keeps its contrast whichever take is underneath.
 */
export const Scrim: React.FC = () => (
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
);

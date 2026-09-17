import {
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Img } from "remotion";

/**
 * A project photograph, drifting slightly so it never feels pasted on.
 * Renders nothing when no file is supplied, which is what keeps the reel
 * complete while `media.ts` is still empty.
 */
export const PhotoCard: React.FC<{
  file?: string;
  start: number;
  x: number;
  y: number;
  w: number;
  h: number;
  rotate?: number;
}> = ({ file, start, x, y, w, h, rotate = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (!file) {
    return null;
  }

  const enter = spring({
    frame: frame - start,
    fps,
    config: { damping: 15, mass: 0.7 },
  });
  const drift = Math.sin((frame - start) / 46) * 7;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 22,
        overflow: "hidden",
        boxShadow: "0 22px 60px rgba(0,0,0,0.28)",
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [34, 0]) + drift}px) rotate(${rotate}deg) scale(${interpolate(enter, [0, 1], [0.9, 1])})`,
      }}
    >
      <Img
        src={staticFile(`images/${file}`)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
};

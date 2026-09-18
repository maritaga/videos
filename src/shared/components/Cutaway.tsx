import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { brand } from "../theme";

/**
 * A project photograph cut in over the narration — the voice keeps running
 * underneath, so these enrich the reel without lengthening it.
 *
 * Most of the photographs are landscape and the frame is 9:16, so rather than
 * crop them to a sliver the image sits full width over a blurred, darkened
 * copy of itself. It reads as deliberate instead of letterboxed.
 */
export const Cutaway: React.FC<{
  file: string;
  start: number;
  frames: number;
  /** Slow push in, so a still photograph still has motion. */
  zoom?: number;
  /** Darken the top of the photo so copy can sit over it. */
  dim?: boolean;
  /** Frames to fade at each end. Longer reads as a gentler change. */
  fade?: number;
}> = ({ file, start, frames, zoom = 1.06, dim = false, fade = 5 }) => {
  const frame = useCurrentFrame();
  const local = frame - start;
  const FADE = fade;

  // Fade at both ends so the cut in and out is soft against the talking head.
  const opacity = interpolate(
    local,
    [0, FADE, frames - FADE, frames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const scale = interpolate(local, [0, frames], [1, zoom], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const url = staticFile(`images/${file}`);

  return (
    <Sequence from={start} durationInFrames={frames} name={`foto ${file}`}>
      <AbsoluteFill style={{ opacity }}>
        <AbsoluteFill
          style={{ backgroundColor: brand.ink, overflow: "hidden" }}
        >
          <Img
            src={url}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "blur(44px) brightness(0.5)",
              transform: "scale(1.2)",
            }}
          />
        </AbsoluteFill>
        <AbsoluteFill style={{ justifyContent: "center", overflow: "hidden" }}>
          <Img
            src={url}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "100%",
              objectFit: "contain",
              transform: `scale(${scale})`,
            }}
          />
        </AbsoluteFill>
        {dim ? (
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(to bottom, rgba(6,14,12,0.80) 0%, rgba(6,14,12,0.52) 34%, rgba(6,14,12,0.10) 62%, rgba(6,14,12,0.30) 100%)",
            }}
          />
        ) : null}
      </AbsoluteFill>
    </Sequence>
  );
};

import {
  AbsoluteFill,
  Img,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { brand, FONT } from "../../shared/theme";

/**
 * The closing frame. The script asks for the music to end as the logo lands,
 * so the envelope fades out just ahead of this — it arrives in silence except
 * for his last line.
 */
export const Signoff: React.FC<{ start: number; frames: number }> = ({
  start,
  frames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - start;
  const veil = interpolate(local, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rise = spring({
    frame: local - 8,
    fps,
    config: { damping: 200, mass: 0.6 },
  });

  return (
    <Sequence from={start} durationInFrames={frames} name="cierre">
      <AbsoluteFill style={{ opacity: veil, backgroundColor: brand.paper }}>
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            opacity: rise,
            transform: `translateY(${interpolate(rise, [0, 1], [26, 0])}px)`,
          }}
        >
          <Img
            src={staticFile("images/logo.png")}
            style={{ width: 560, height: "auto" }}
          />
          <div
            style={{
              marginTop: 44,
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 54,
              letterSpacing: "-0.02em",
              color: brand.ink,
              textAlign: "center",
              lineHeight: 1.18,
            }}
          >
            Para proteger algo,
            <br />
            <span style={{ color: brand.green }}>
              primero hay que conocerlo.
            </span>
          </div>
          <div
            style={{
              marginTop: 48,
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 32,
              color: brand.ink,
              opacity: 0.66,
            }}
          >
            @lacienciadelasletras.oficial
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </Sequence>
  );
};

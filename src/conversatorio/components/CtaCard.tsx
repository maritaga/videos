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

const Detail: React.FC<{ text: string; colour: string; delay: number }> = ({
  text,
  colour,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({
    frame: frame - delay,
    fps,
    config: { damping: 16, mass: 0.6 },
  });
  return (
    <span
      style={{
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 37,
        color: brand.paper,
        background: colour,
        padding: "12px 26px 15px",
        borderRadius: 999,
        opacity: enter,
        transform: `translateY(${interpolate(enter, [0, 1], [20, 0])}px)`,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
};

/**
 * The call to action. The QR is the point, so it gets the middle of the frame
 * and the longest hold in the piece — it is on screen for the last four
 * seconds, which is about what scanning off a phone actually takes.
 *
 * It is drawn at 580px rather than something more tasteful: at 440 the code
 * stopped decoding once the frame was scaled to 540px wide, which is what a
 * small screen or heavy platform compression amounts to. At 580 it survives
 * that, which matters more here than the composition does.
 */
export const CtaCard: React.FC<{ start: number; frames: number }> = ({
  start,
  frames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - start;

  const veil = interpolate(local, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rise = spring({
    frame: local - 8,
    fps,
    config: { damping: 200, mass: 0.6 },
  });

  return (
    <Sequence from={start} durationInFrames={frames} name="CTA + QR">
      <AbsoluteFill style={{ opacity: veil, backgroundColor: brand.paper }}>
        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: "0 80px",
            opacity: rise,
            transform: `translateY(${interpolate(rise, [0, 1], [24, 0])}px)`,
          }}
        >
          <Img
            src={staticFile("images/logo.png")}
            style={{ width: 196, height: "auto" }}
          />

          <div
            style={{
              marginTop: 26,
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 66,
              letterSpacing: "-0.02em",
              color: brand.ink,
              textAlign: "center",
            }}
          >
            REGÍSTRATE
          </div>

          <div
            style={{
              marginTop: 30,
              padding: 18,
              background: brand.paper,
              borderRadius: 26,
              border: `4px solid ${brand.ink}`,
            }}
          >
            <Img
              src={staticFile("images/qr-registro.png")}
              style={{ width: 580, height: 580, display: "block" }}
            />
          </div>

          <div
            style={{
              marginTop: 28,
              display: "flex",
              flexWrap: "wrap",
              gap: 14,
              justifyContent: "center",
            }}
          >
            <Detail
              text="25 SEPTIEMBRE 2026"
              colour={brand.crimson}
              delay={18}
            />
            <Detail text="16:00 HRS." colour={brand.blue} delay={26} />
            <Detail text="EVENTO VIRTUAL" colour={brand.green} delay={34} />
          </div>

          <div
            style={{
              marginTop: 26,
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 30,
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

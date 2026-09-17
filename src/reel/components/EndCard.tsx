import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { brand, FONT, plume } from "../theme";
import { HANDLE, LOGO } from "../media";

/** Stand-in lockup used until the real logo file is dropped into public/images. */
const TextLockup: React.FC<{ progress: number }> = ({ progress }) => (
  <>
    <div
      style={{
        display: "flex",
        gap: 8,
        marginBottom: 40,
        height: 150,
        alignItems: "flex-end",
      }}
    >
      {plume.slice(0, 7).map((colour, i) => (
        <span
          key={i}
          style={{
            width: 17,
            height: interpolate(
              Math.min(1, Math.max(0, progress * 2 - i * 0.07)),
              [0, 1],
              [0, 150 - Math.abs(i - 3) * 17],
            ),
            borderRadius: 9,
            background: colour,
            transformOrigin: "bottom center",
            transform: `rotate(${(i - 3) * 15}deg)`,
          }}
        />
      ))}
    </div>
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: 62,
        color: brand.ink,
        letterSpacing: "-0.02em",
        textAlign: "center",
        lineHeight: 1.12,
      }}
    >
      La Ciencia
      <br />
      de las Letras
    </div>
  </>
);

/** Closing frame: "Conocer para proteger." over the mark and the handle. */
export const EndCard: React.FC<{ start: number }> = ({ start }) => {
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
    <AbsoluteFill style={{ opacity: veil }}>
      <AbsoluteFill style={{ background: brand.paper }} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: rise,
            transform: `translateY(${interpolate(rise, [0, 1], [30, 0])}px)`,
          }}
        >
          {LOGO ? (
            <Img
              src={staticFile(`images/${LOGO}`)}
              style={{ width: 620, height: "auto" }}
            />
          ) : (
            <TextLockup progress={rise} />
          )}

          <div
            style={{
              marginTop: 52,
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 66,
              color: brand.ink,
              letterSpacing: "-0.02em",
              textAlign: "center",
            }}
          >
            CONOCER
            <br />
            <span style={{ color: brand.green }}>PARA PROTEGER.</span>
          </div>

          <div
            style={{
              marginTop: 54,
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 34,
              color: brand.ink,
              opacity: 0.66,
              letterSpacing: "0.01em",
            }}
          >
            {HANDLE}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

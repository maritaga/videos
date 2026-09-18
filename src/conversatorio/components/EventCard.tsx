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
import { brand, FONT, plume } from "../../shared/theme";

/**
 * The event's full name, wording taken from the official poster rather than
 * the script: "al mundo", not "el mundo", and "palabra" singular. The
 * registration URL on the poster reads vocesquesostienenalmundo, which
 * settles it.
 *
 * It is far too long to sit over the presenter —
 * he fills more of the frame than the previous one, leaving only a shallow
 * band of wall. A card gives it room, and doubles as cover for the cut into
 * the next take.
 */
export const EventCard: React.FC<{ start: number; frames: number }> = ({
  start,
  frames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - start;
  const FADE = 12;

  const opacity = interpolate(
    local,
    [0, FADE, frames - FADE, frames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const rise = spring({
    frame: local - 6,
    fps,
    config: { damping: 200, mass: 0.6 },
  });
  // A card that sits perfectly still for four seconds reads as a freeze, so
  // the whole block drifts up and grows a hair across its stay.
  const drift = interpolate(local, [0, frames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <Sequence from={start} durationInFrames={frames} name="ficha del evento">
      <AbsoluteFill style={{ opacity, backgroundColor: brand.paper }}>
        <AbsoluteFill
          style={{
            padding: "0 88px",
            justifyContent: "center",
            transform: `translateY(${
              interpolate(rise, [0, 1], [26, 0]) - drift * 22
            }px) scale(${1 + drift * 0.03})`,
          }}
        >
          <Img
            src={staticFile("images/logo.png")}
            style={{ width: 300, height: "auto", marginBottom: 56 }}
          />

          <div style={{ display: "flex", gap: 9, marginBottom: 40 }}>
            {plume.slice(0, 7).map((colour, i) => (
              <span
                key={i}
                style={{
                  width: 46,
                  height: 9,
                  borderRadius: 5,
                  background: colour,
                  opacity: interpolate(
                    Math.min(1, Math.max(0, rise * 2 - i * 0.09)),
                    [0, 1],
                    [0, 1],
                  ),
                }}
              />
            ))}
          </div>

          <div
            style={{
              fontFamily: FONT,
              fontWeight: 900,
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: brand.ink,
            }}
          >
            Voces
            <br />
            que sostienen
            <br />
            al mundo
          </div>

          <div
            style={{
              marginTop: 42,
              fontFamily: FONT,
              fontWeight: 700,
              fontSize: 40,
              lineHeight: 1.3,
              color: brand.ink,
              opacity: 0.62,
              maxWidth: 820,
            }}
          >
            Miradas, palabra y ciencia
            <br />
            ante la Agenda 2030
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </Sequence>
  );
};

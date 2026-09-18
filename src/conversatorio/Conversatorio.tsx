import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
} from "remotion";
import "../shared/fonts";
import { brand } from "../shared/theme";
import { src, starts, takeLength, takes } from "./timeline";
import { musicEnvelope } from "./musicEnvelope";
import { Scrim } from "../shared/components/Scrim";
import { Seam } from "../shared/components/Seam";
import { EventCard } from "./components/EventCard";
import { CtaCard } from "./components/CtaCard";
import { Cutaway } from "../shared/components/Cutaway";
import {
  Close,
  Conversation,
  Hook,
  Invitation,
  Topics,
} from "./sections/Sections";

const sections = [Hook, Conversation, Topics, Invitation, Close];

/**
 * Same three-layer build as the first reel — footage, then full-frame cards,
 * then copy — for the same reason: a card has to be able to cover a cut, and
 * copy has to stay readable when one is underneath.
 *
 * Section boundaries: 0 · 183 · 439 · 660 · 881, voice ends 1049, ends 1073.
 */
export const Conversatorio: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: brand.ink }}>
      <Audio
        src={staticFile("musica-conv.mp3")}
        volume={(f) => musicEnvelope[Math.min(f, musicEnvelope.length - 1)]}
      />

      {takes.map((take, i) => {
        const length = takeLength(take);
        let cursor = 0;
        return (
          <Sequence
            key={take.id}
            from={starts[i]}
            durationInFrames={length}
            name={`${i + 1} · ${take.id}`}
          >
            {take.segments.map((segment, s) => {
              const at = cursor;
              cursor += segment.frames;
              return (
                <Sequence
                  key={s}
                  from={at}
                  durationInFrames={segment.frames}
                  name={`toma ${segment.from}`}
                >
                  <Seam length={segment.frames} openCold={i === 0}>
                    <OffthreadVideo
                      src={src(take.id)}
                      trimBefore={segment.from}
                      volume={take.gain}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Seam>
                </Sequence>
              );
            })}
            <Scrim />
          </Sequence>
        );
      })}

      {takes.map((take, i) => {
        const Section = sections[i];
        return (
          <Sequence
            key={`copy-${take.id}`}
            from={starts[i]}
            durationInFrames={takeLength(take)}
            name={`${i + 1} · texto`}
          >
            <Section />
          </Sequence>
        );
      })}

      {/* Both cards are full-frame takeovers, so they sit above the copy —
          the section heading has already been read by the time either lands.
          The event card also straddles the conversation → topics cut, so that
          join happens behind it rather than in the open. */}
      <EventCard start={296} frames={90} />

      {/* The official poster, straight after the title card and running across
          the cut into the topics take. It carries the panellists, which the
          script asks for and nothing else in hand could supply. No push-in:
          it is already 9:16, so it fills the frame exactly, and zooming would
          crop the names off its edges. */}
      <Cutaway
        file="poster-evento.jpg"
        start={382}
        frames={88}
        fade={14}
        zoom={1}
      />

      {/* The QR runs to the very end, over the tail of silence. */}
      <CtaCard start={941} frames={132} />
    </AbsoluteFill>
  );
};

import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
} from "remotion";
import "./fonts";
import { brand } from "./theme";
import { HOOK_SOURCE_FRAMES, src, starts, takeLength, takes } from "./timeline";
import { HookPlate } from "./components/HookPlate";
import { Seam } from "./components/Seam";
import { musicEnvelope } from "./musicEnvelope";
import { Scrim } from "./components/Scrim";
import { Closing, Hook, Network, Objective, Vision } from "./sections/Sections";

/** Sections 1–4 take no props; the closing section also drives the end card. */
const sections = [Hook, Vision, Network, Objective];

export const Reel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: brand.ink }}>
      {/* Music runs the whole way and ducks under her voice — see
          musicEnvelope.ts for how the level is derived. */}
      <Audio
        src={staticFile("musica.mp3")}
        volume={(f) => musicEnvelope[Math.min(f, musicEnvelope.length - 1)]}
      />
      {takes.map((take, i) => {
        const Section = sections[i];
        const length = takeLength(take);
        let cursor = 0;

        return (
          <Sequence
            key={take.id}
            from={starts[i]}
            durationInFrames={length}
            name={`${i + 1} · ${take.id}`}
          >
            {/* Section 1 plays the stand footage with her voice over it;
                the rest show her on camera. */}
            {i === 0 ? (
              <Seam length={length} openCold>
                <HookPlate playbackRate={HOOK_SOURCE_FRAMES / length} />
              </Seam>
            ) : null}
            {/* The speaking spans of this take, butted together. The cuts are
                hard: same framing throughout, so a dissolve would only smear
                two near-identical frames. */}
            {i === 0
              ? null
              : take.segments.map((segment, s) => {
                  const at = cursor;
                  cursor += segment.frames;
                  return (
                    <Sequence
                      key={s}
                      from={at}
                      durationInFrames={segment.frames}
                      name={`take ${segment.from}`}
                    >
                      <AbsoluteFill>
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
                      </AbsoluteFill>
                    </Sequence>
                  );
                })}
            <Scrim variant={i === 0 ? "footage" : "wall"} />
            {Section ? <Section /> : <Closing endCardAt={length - 46} />}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

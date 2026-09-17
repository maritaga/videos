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
import { cutaways } from "./media";
import { musicEnvelope } from "./musicEnvelope";
import { Scrim } from "./components/Scrim";
import { Seam } from "./components/Seam";
import { HookPlate } from "./components/HookPlate";
import { Cutaway } from "./components/Cutaway";
import { Closing, Hook, Network, Objective, Vision } from "./sections/Sections";

/** Sections 1–4 take no props; the closing section also drives the end card. */
const sections = [Hook, Vision, Network, Objective];

/**
 * Three layers, in order: the footage, then the photographs, then the copy.
 *
 * Keeping the photographs on the reel's own timeline rather than inside a
 * section is what lets one straddle the join between two takes — it is
 * already on screen when the cut lands, so it covers the cut rather than
 * adding two of its own. Copy sits above them so the verbs and the end card
 * still read when a photograph is underneath.
 */
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
            ) : (
              take.segments.map((segment, s) => {
                const at = cursor;
                cursor += segment.frames;
                return (
                  <Sequence
                    key={s}
                    from={at}
                    durationInFrames={segment.frames}
                    name={`toma ${segment.from}`}
                  >
                    <Seam length={segment.frames}>
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
              })
            )}
            <Scrim variant={i === 0 ? "footage" : "wall"} />
          </Sequence>
        );
      })}

      {cutaways.map((cut, i) => (
        <Cutaway
          key={i}
          file={cut.file}
          start={cut.at}
          frames={cut.frames}
          dim={cut.dim}
          fade={cut.fade}
        />
      ))}

      {takes.map((take, i) => {
        const Section = sections[i];
        const length = takeLength(take);
        return (
          <Sequence
            key={`copy-${take.id}`}
            from={starts[i]}
            durationInFrames={length}
            name={`${i + 1} · texto`}
          >
            {Section ? <Section /> : <Closing endCardAt={length - 46} />}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

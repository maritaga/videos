import {
  AbsoluteFill,
  Audio,
  OffthreadVideo,
  Sequence,
  staticFile,
} from "remotion";
import "../shared/fonts";
import { brand } from "../shared/theme";
import { GAIN, src, starts, takeLength, takes } from "./timeline";
import { cutaways } from "./media";
import { musicEnvelope } from "./musicEnvelope";
import { Scrim } from "../shared/components/Scrim";
import { Seam } from "../shared/components/Seam";
import { Cutaway } from "../shared/components/Cutaway";
import { Signoff } from "./components/Signoff";
import {
  CloseIntro,
  CloseLook,
  CloseName,
  CloseProtect,
  HookBook,
  HookScience,
  HookWhale,
  How,
  Meaning,
  Presentation,
} from "./sections/Sections";

/** One copy layer per take, in running order; null where the take runs clean. */
const copy = [
  null,
  HookWhale,
  HookBook,
  HookScience,
  Presentation,
  How,
  Meaning,
  CloseIntro,
  CloseLook,
  CloseName,
  CloseProtect,
  null,
  null,
] as const;

/** The logo lands here, and the music has already gone by this point. */
const SIGNOFF = 968;

/**
 * Same three-layer build as the other two reels: footage, then photographs,
 * then copy. Everything is white over a darkened plate here — he is framed
 * tight enough that his hair reaches into the band the other reels use for
 * ink on the wall.
 */
export const Movimiento: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: brand.ink }}>
      <Audio
        src={staticFile("musica-mov.mp3")}
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
                  <Seam length={segment.frames} openCold={i === 0 && s === 0}>
                    <OffthreadVideo
                      src={src(take.id)}
                      trimBefore={segment.from}
                      volume={GAIN}
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
            <Scrim variant="footage" />
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
        const Section = copy[i];
        if (!Section) {
          return null;
        }
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

      <Signoff start={SIGNOFF} frames={1050 - SIGNOFF} />
    </AbsoluteFill>
  );
};

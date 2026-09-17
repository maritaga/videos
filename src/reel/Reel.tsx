import { AbsoluteFill, OffthreadVideo, Sequence } from "remotion";
import "./fonts";
import { brand } from "./theme";
import { src, starts, takeLength, takes } from "./timeline";
import { Scrim } from "./components/Scrim";
import { Closing, Hook, Network, Objective, Vision } from "./sections/Sections";

/** Sections 1–4 take no props; the closing section also drives the end card. */
const sections = [Hook, Vision, Network, Objective];

export const Reel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: brand.ink }}>
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
            {/* The speaking spans of this take, butted together. The cuts are
                hard: same framing throughout, so a dissolve would only smear
                two near-identical frames. */}
            {take.segments.map((segment, s) => {
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
            <Scrim />
            {Section ? <Section /> : <Closing endCardAt={length - 52} />}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

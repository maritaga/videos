import { AbsoluteFill } from "remotion";
import { brand } from "../theme";
import { cutaways } from "../media";
import { Headline } from "../components/Headline";
import { WorldSpread } from "../components/WorldSpread";
import { NetworkGraph } from "../components/NetworkGraph";
import { WordStack } from "../components/WordStack";
import { LowerThird } from "../components/LowerThird";
import { Cutaway } from "../components/Cutaway";
import { EndCard } from "../components/EndCard";

const Cuts: React.FC<{ of: keyof typeof cutaways }> = ({ of }) => (
  <>
    {cutaways[of].map((cut, i) => (
      <Cutaway key={i} file={cut.file} start={cut.at} frames={cut.frames} />
    ))}
  </>
);

/** 0–4.4s — the hook, over the stand footage. White copy on a darkened plate. */
export const Hook: React.FC = () => (
  <AbsoluteFill>
    <Headline
      start={6}
      size={94}
      tone="paper"
      words={[
        { text: "¿Y" },
        { text: "SI" },
        { text: "FUERA" },
        { text: "PARTE" },
        { text: "DE" },
        { text: "NUESTRA" },
        { text: "EDUCACIÓN?", highlight: brand.green },
      ]}
    />
  </AbsoluteFill>
);

/** 4.4–13.1s — the vision, and the spread from one community to many. */
export const Vision: React.FC = () => (
  <AbsoluteFill>
    <Headline
      start={4}
      size={70}
      words={[
        { text: "TRANSFORMAR" },
        { text: "LA" },
        { text: "EDUCACIÓN", highlight: brand.blue },
      ]}
    />
    <div
      style={{
        position: "absolute",
        top: 392,
        left: 40,
        right: 40,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WorldSpread start={62} width={1000} />
    </div>
    <LowerThird
      start={120}
      bottom={236}
      chips={[{ text: "DE LO LOCAL A LO GLOBAL 🌎", colour: brand.ink }]}
    />
    <Cuts of="vision" />
  </AbsoluteFill>
);

/** 13.1–19.0s — the international network wiring itself together. */
export const Network: React.FC = () => (
  <AbsoluteFill>
    <Headline
      start={4}
      size={64}
      words={[{ text: "UNA" }, { text: "RED" }, { text: "INTERNACIONAL" }]}
    />
    <div
      style={{
        position: "absolute",
        top: 330,
        left: 84,
        right: 84,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <NetworkGraph start={30} width={912} />
    </div>
    <LowerThird
      start={74}
      stagger={13}
      bottom={232}
      size={40}
      chips={[
        { text: "🔬 CIENCIA", colour: brand.blue },
        { text: "📚 JÓVENES", colour: brand.crimson },
        { text: "🌱 COMUNIDADES", colour: brand.green },
      ]}
    />
    <Cuts of="network" />
  </AbsoluteFill>
);

/** 19.0–25.3s — the objective, one verb at a time. */
export const Objective: React.FC = () => (
  <AbsoluteFill>
    <WordStack
      start={54}
      beat={42}
      top={238}
      size={100}
      items={[
        { text: "NARRAR.", colour: brand.cyan },
        { text: "COMPRENDER.", colour: brand.gold },
        { text: "PROTEGER.", colour: brand.green },
      ]}
    />
    <Cuts of="objective" />
  </AbsoluteFill>
);

/** 25.3–30.2s — the close, handing off to the end card. */
export const Closing: React.FC<{ endCardAt: number }> = ({ endCardAt }) => (
  <AbsoluteFill>
    <Headline
      start={6}
      size={78}
      words={[
        { text: "APRENDER" },
        { text: "A" },
        { text: "CUIDARLO" },
        { text: "JUNTOS", highlight: brand.orange },
      ]}
    />
    <Cuts of="closing" />
    <EndCard start={endCardAt} />
  </AbsoluteFill>
);

import { AbsoluteFill } from "remotion";
import { brand } from "../theme";
import { photos } from "../media";
import { Headline } from "../components/Headline";
import { WorldSpread } from "../components/WorldSpread";
import { NetworkGraph } from "../components/NetworkGraph";
import { WordStack } from "../components/WordStack";
import { LowerThird } from "../components/LowerThird";
import { PhotoCard } from "../components/PhotoCard";
import { EndCard } from "../components/EndCard";

/** 0–5.5s — the hook. Nothing competes with the question. */
export const Hook: React.FC = () => (
  <AbsoluteFill>
    <Headline
      start={6}
      size={94}
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
    <PhotoCard
      file={photos.hook[0]}
      start={40}
      x={70}
      y={760}
      w={250}
      h={330}
      rotate={-4}
    />
    <PhotoCard
      file={photos.hook[1]}
      start={52}
      x={760}
      y={700}
      w={250}
      h={330}
      rotate={5}
    />
    <PhotoCard
      file={photos.hook[2]}
      start={64}
      x={410}
      y={1180}
      w={260}
      h={200}
      rotate={-2}
    />
  </AbsoluteFill>
);

/** 5.5–15s — the vision, and the spread from one community to many. */
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
    <PhotoCard
      file={photos.vision[0]}
      start={120}
      x={62}
      y={1140}
      w={250}
      h={320}
      rotate={-5}
    />
    <PhotoCard
      file={photos.vision[1]}
      start={134}
      x={770}
      y={1120}
      w={250}
      h={320}
      rotate={4}
    />
    <LowerThird
      start={150}
      bottom={236}
      chips={[{ text: "DE LO LOCAL A LO GLOBAL 🌎", colour: brand.ink }]}
    />
  </AbsoluteFill>
);

/** 15–21s — the international network wiring itself together. */
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
  </AbsoluteFill>
);

/** 21–28s — the objective, one verb at a time. */
export const Objective: React.FC = () => (
  <AbsoluteFill>
    <WordStack
      start={60}
      beat={45}
      top={238}
      size={100}
      items={[
        { text: "NARRAR.", colour: brand.cyan },
        { text: "COMPRENDER.", colour: brand.gold },
        { text: "PROTEGER.", colour: brand.green },
      ]}
    />
    <PhotoCard
      file={photos.objective[0]}
      start={56}
      x={66}
      y={1150}
      w={230}
      h={300}
      rotate={-4}
    />
    <PhotoCard
      file={photos.objective[1]}
      start={96}
      x={424}
      y={1190}
      w={230}
      h={300}
      rotate={2}
    />
    <PhotoCard
      file={photos.objective[2]}
      start={136}
      x={782}
      y={1150}
      w={230}
      h={300}
      rotate={5}
    />
  </AbsoluteFill>
);

/** 28–34s — the close, handing off to the end card. */
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
    <PhotoCard
      file={photos.closing[0]}
      start={30}
      x={64}
      y={1120}
      w={240}
      h={310}
      rotate={-5}
    />
    <PhotoCard
      file={photos.closing[1]}
      start={42}
      x={420}
      y={1160}
      w={240}
      h={310}
      rotate={3}
    />
    <PhotoCard
      file={photos.closing[2]}
      start={54}
      x={776}
      y={1120}
      w={240}
      h={310}
      rotate={-3}
    />
    <EndCard start={endCardAt} />
  </AbsoluteFill>
);

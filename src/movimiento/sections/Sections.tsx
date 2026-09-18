import { AbsoluteFill } from "remotion";
import { brand } from "../../shared/theme";
import { Headline } from "../../shared/components/Headline";
import { WordCycle } from "../../shared/components/WordCycle";
import { EmojiBeat } from "../components/EmojiBeat";
import { Pillars } from "../components/Pillars";

/**
 * He is framed tighter than either previous presenter — his hair reaches into
 * the band where the other reels put their copy — so everything here is white
 * over the darkened plate rather than ink on the wall.
 */
const TOP = 196;

/** 0–4.4s — whale, book, microscope, one per cut. */
export const HookBeat: React.FC = () => (
  <AbsoluteFill>
    <EmojiBeat emoji="🐋" caption="UNA BALLENA" start={2} top={TOP} />
  </AbsoluteFill>
);

export const HookBook: React.FC = () => (
  <AbsoluteFill>
    <EmojiBeat emoji="📖" caption="UN LIBRO" start={1} top={TOP} />
  </AbsoluteFill>
);

export const HookScience: React.FC = () => (
  <AbsoluteFill>
    <EmojiBeat emoji="🔬" caption="LA CIENCIA" start={1} top={TOP} />
  </AbsoluteFill>
);

export const HookPayoff: React.FC = () => (
  <AbsoluteFill>
    <Headline
      start={1}
      stagger={3}
      size={78}
      top={TOP}
      tone="paper"
      words={[
        { text: "MÁS" },
        { text: "DE" },
        { text: "LO" },
        { text: "QUE" },
        { text: "IMAGINAS.", highlight: brand.green },
      ]}
    />
  </AbsoluteFill>
);

/** 4.4–12.0s — what the project is. */
export const Presentation: React.FC = () => (
  <AbsoluteFill>
    <WordCycle
      start={26}
      every={62}
      top={TOP}
      size={86}
      tone="paper"
      beats={[
        { text: "CIENCIA", colour: brand.blue },
        { text: "HISTORIAS", colour: brand.crimson },
        { text: "EXPERIENCIAS", colour: brand.gold },
      ]}
    />
  </AbsoluteFill>
);

/** 12.0–20.1s — how it does it. Four pillars arrive around him. */
export const How: React.FC = () => (
  <AbsoluteFill>
    <Pillars
      start={22}
      stagger={26}
      top={TOP - 26}
      items={[
        { text: "Literatura", emoji: "📖", colour: brand.crimson },
        { text: "Naturaleza", emoji: "🌱", colour: brand.green },
        { text: "Ciencia", emoji: "🔬", colour: brand.blue },
        { text: "Comunidad", emoji: "👥", colour: brand.orange },
      ]}
    />
  </AbsoluteFill>
);

/** 20.1–26.0s — what it means. */
export const Meaning: React.FC = () => (
  <AbsoluteFill>
    <WordCycle
      start={18}
      every={52}
      top={TOP}
      size={88}
      tone="paper"
      beats={[
        { text: "CONTARSE.", colour: brand.cyan },
        { text: "VIVIRSE.", colour: brand.gold },
        { text: "ACTUAR.", colour: brand.green },
      ]}
    />
  </AbsoluteFill>
);

/** 26.0–34.2s — mirar, nombrar, proteger. */
export const CloseIntro: React.FC = () => (
  <AbsoluteFill>
    <Headline
      start={4}
      size={62}
      top={TOP}
      tone="paper"
      words={[
        { text: "MIRAR," },
        { text: "NOMBRAR" },
        { text: "Y" },
        { text: "PROTEGER" },
      ]}
    />
  </AbsoluteFill>
);

export const CloseLook: React.FC = () => (
  <AbsoluteFill>
    <EmojiBeat emoji="👁️" caption="MIRAR" start={0} top={TOP} />
  </AbsoluteFill>
);

export const CloseName: React.FC = () => (
  <AbsoluteFill>
    <EmojiBeat emoji="✍️" caption="NOMBRAR" start={0} top={TOP} />
  </AbsoluteFill>
);

export const CloseProtect: React.FC = () => (
  <AbsoluteFill>
    <EmojiBeat emoji="🌎" caption="PROTEGER" start={0} top={TOP} />
  </AbsoluteFill>
);

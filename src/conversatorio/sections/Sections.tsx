import { AbsoluteFill } from "remotion";
import { brand } from "../../shared/theme";
import { Headline } from "../../shared/components/Headline";
import { WordStack } from "../../shared/components/WordStack";
import { LowerThird } from "../../shared/components/LowerThird";
import { WordCycle } from "../components/WordCycle";

/**
 * He fills more of the frame than the previous presenter, so the clear band of
 * wall runs roughly y 150–470 rather than down to 660. Every headline here is
 * sized and placed for that shallower band; anything longer goes on a card.
 */
const TOP = 168;

/** 0–6.1s — the hook: what science, literature and leadership share. */
export const Hook: React.FC = () => (
  <AbsoluteFill>
    <Headline
      start={10}
      stagger={13}
      size={74}
      top={TOP}
      words={[
        { text: "CIENCIA", highlight: brand.blue },
        { text: "LITERATURA", highlight: brand.crimson },
        { text: "LIDERAZGO", highlight: brand.gold },
      ]}
    />
  </AbsoluteFill>
);

/** 6.1–14.6s — the conversation itself. The card carries the full title. */
export const Conversation: React.FC = () => (
  <AbsoluteFill>
    <Headline
      start={6}
      size={72}
      top={TOP}
      words={[
        { text: "25" },
        { text: "DE" },
        { text: "SEPTIEMBRE", highlight: brand.orange },
      ]}
    />
  </AbsoluteFill>
);

/** 14.6–22.0s — what the conversation covers. */
export const Topics: React.FC = () => (
  <AbsoluteFill>
    <WordStack
      start={46}
      beat={44}
      top={TOP}
      size={62}
      items={[
        { text: "RETOS.", colour: brand.cyan },
        { text: "RESPONSABILIDADES.", colour: brand.gold },
        { text: "POSIBILIDADES.", colour: brand.green },
      ]}
    />
    <LowerThird
      start={150}
      bottom={210}
      size={40}
      chips={[{ text: "AGENDA 2030 🌱", colour: brand.ink }]}
    />
  </AbsoluteFill>
);

/** 22.0–29.4s — the invitation. One verb at a time, handing over. */
export const Invitation: React.FC = () => (
  <AbsoluteFill>
    <WordCycle
      start={34}
      every={58}
      top={TOP}
      size={90}
      beats={[
        { text: "DIALOGAR.", colour: brand.blue },
        { text: "COMPRENDER.", colour: brand.crimson },
        { text: "TRANSFORMAR.", colour: brand.green },
      ]}
    />
  </AbsoluteFill>
);

/** 29.4–35.8s — the close: details, then the QR takes the frame. */
export const Close: React.FC = () => (
  <AbsoluteFill>
    <Headline
      start={4}
      size={68}
      top={TOP}
      words={[
        { text: "ÚNETE" },
        { text: "A" },
        { text: "LA" },
        { text: "CONVERSACIÓN", highlight: brand.green },
      ]}
    />
  </AbsoluteFill>
);

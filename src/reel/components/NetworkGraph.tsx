import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { brand } from "../theme";

type Node = { x: number; y: number; r: number; colour: string };

const nodes: Node[] = [
  { x: 120, y: 150, r: 34, colour: brand.cyan },
  { x: 300, y: 72, r: 26, colour: brand.gold },
  { x: 470, y: 148, r: 38, colour: brand.green },
  { x: 640, y: 66, r: 25, colour: brand.orange },
  { x: 800, y: 152, r: 33, colour: brand.blue },
  { x: 232, y: 288, r: 28, colour: brand.crimson },
  { x: 560, y: 300, r: 30, colour: brand.red },
  { x: 736, y: 296, r: 24, colour: brand.cyan },
];

const edges: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [0, 5],
  [5, 2],
  [2, 6],
  [6, 4],
  [6, 7],
  [7, 4],
  [5, 6],
];

/**
 * Scientists, young people and communities appearing and wiring themselves
 * together — each edge draws itself rather than cutting in.
 */
export const NetworkGraph: React.FC<{ start: number; width: number }> = ({
  start,
  width,
}) => {
  const frame = useCurrentFrame() - start;
  const { fps } = useVideoConfig();
  const scale = width / 920;

  return (
    <svg width={width} height={380 * scale} viewBox="0 0 920 380">
      {edges.map(([a, b], i) => {
        const at = 16 + i * 3.4;
        const draw = interpolate(frame, [at, at + 16], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const len = Math.hypot(
          nodes[a].x - nodes[b].x,
          nodes[a].y - nodes[b].y,
        );
        return (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={brand.ink}
            strokeOpacity={0.3}
            strokeWidth={2}
            strokeDasharray={len}
            strokeDashoffset={len * (1 - draw)}
          />
        );
      })}
      {nodes.map((node, i) => {
        const pop = spring({
          frame: frame - (6 + i * 3),
          fps,
          config: { damping: 12, mass: 0.6 },
        });
        return (
          <g key={i} opacity={pop}>
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r * pop}
              fill={node.colour}
            />
            <circle
              cx={node.x}
              cy={node.y}
              r={node.r * pop + 9}
              fill="none"
              stroke={node.colour}
              strokeOpacity={0.3}
              strokeWidth={2}
            />
          </g>
        );
      })}
    </svg>
  );
};

import { interpolate, useCurrentFrame } from "remotion";
import { brand, plume } from "../theme";

/**
 * A coarse dot map of the world, 44 columns wide. Wide and short so it sits in
 * the clear band of wall above the presenter instead of over her head.
 */
const LAND = [
  "........XXXXXXX......XXX....XXXXXXXXXXXXX...",
  "......XXXXXXXXXX.....XX.XXXXXXXXXXXXXXXXXX..",
  ".....XXXXXXXXXX........XXXXXXXXXXXXXXXXXX...",
  ".....XXXXXXXX..........XXXXXXXXXXXXXXXX.....",
  "......XXXXX............XXXXXXXXXXXXXXXX.....",
  ".........XXX...........XXXXXXX..XX..XXXX....",
  ".............XXXX.......XXXXXX......XXXXX...",
  ".............XXXXX.......XXXXX.......XXX....",
  "..............XXXX.......XXXX.........XXXXX.",
  "..............XXX.........XX..........XXXXX.",
  "..............XX............................",
];

const COLS = 44;
const ROWS = LAND.length;

/** The project's own community, in South America — where the spread starts. */
const SEED = { c: 15, r: 7 };

const cells = (() => {
  const out: { c: number; r: number; d: number }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (LAND[r][c] === "X") {
        out.push({ c, r, d: Math.hypot(c - SEED.c, (r - SEED.r) * 1.7) });
      }
    }
  }
  return out;
})();

const maxD = Math.max(...cells.map((p) => p.d));

/**
 * One community lights up, then its neighbours, then the map — the
 * "de lo local a lo global" beat, drawn rather than stated.
 */
export const WorldSpread: React.FC<{ start: number; width: number }> = ({
  start,
  width,
}) => {
  const frame = useCurrentFrame() - start;
  const step = width / COLS;
  const height = step * ROWS;
  const reach = interpolate(frame, [8, 96], [0, maxD * 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${COLS} ${ROWS}`}>
      {cells.map((p, i) => {
        const lit = interpolate(reach, [p.d - 3.5, p.d], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <circle
            key={i}
            cx={p.c + 0.5}
            cy={p.r + 0.5}
            r={interpolate(lit, [0, 0.55, 1], [0.17, 0.46, 0.33])}
            fill={lit > 0.03 ? plume[i % plume.length] : brand.ink}
            opacity={0.16 + lit * 0.84}
          />
        );
      })}
      {/* The originating community keeps a marker and a slow pulse. */}
      <circle
        cx={SEED.c + 0.5}
        cy={SEED.r + 0.5}
        r={0.62}
        fill={brand.crimson}
      />
      <circle
        cx={SEED.c + 0.5}
        cy={SEED.r + 0.5}
        r={interpolate(frame % 40, [0, 39], [0.7, 4.4])}
        fill="none"
        stroke={brand.crimson}
        strokeWidth={0.13}
        opacity={frame > 6 ? interpolate(frame % 40, [0, 39], [0.6, 0]) : 0}
      />
    </svg>
  );
};

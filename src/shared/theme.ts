// Brand palette sampled from the "La Ciencia de las Letras" logo:
// an open book with a fanned plume of coloured pages.
export const brand = {
  ink: "#1D1D1B",
  cyan: "#00B0E0",
  blue: "#0C74B8",
  green: "#33A54A",
  crimson: "#C2103C",
  red: "#D81E32",
  gold: "#FAAF1B",
  orange: "#F26A22",
  paper: "#FFFFFF",
} as const;

/** The plume colours in the order they fan out in the logo, left to right. */
export const plume = [
  brand.cyan,
  brand.blue,
  brand.green,
  brand.crimson,
  brand.red,
  brand.gold,
  brand.orange,
  brand.cyan,
] as const;

export const FONT = "Montserrat";

/**
 * The presenter sits low in frame with a bright, empty wall above her, so all
 * copy lives in the upper third and reads as dark ink on that wall.
 */
export const layout = {
  width: 1080,
  height: 1920,
  gutter: 84,
  /** Top of the safe text zone (clear of platform chrome). */
  textTop: 210,
  /** Below this the presenter's head starts. */
  textBottom: 660,
} as const;

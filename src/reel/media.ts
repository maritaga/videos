/**
 * Drop-in slots for the project's own photographs.
 *
 * Put files in `public/images/` and list the filenames here. Every section
 * is designed to stand on its own with motion graphics only, so leaving these
 * empty produces a finished reel — adding photos enriches it rather than
 * filling a hole.
 */
export const photos = {
  /** 0–5s: schools, nature, young people orbiting the hook. */
  hook: [] as string[],
  /** 5–15s: real activity photographs behind the "local to global" map. */
  vision: [] as string[],
  /** 15–21s: faces for the network nodes (circular crop). */
  network: [] as string[],
  /** 21–28s: book, learning, nature — one per word. */
  objective: [] as string[],
  /** 28–34s: closing montage. */
  closing: [] as string[],
};

/**
 * The logo lockup. Drop `logo.png` into `public/images/` to switch the end
 * card from the text lockup to the real mark.
 */
export const LOGO: string | null = null;

export const HANDLE = "@lacienciadelasletras.oficial";

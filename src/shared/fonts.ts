import { continueRender, delayRender } from "remotion";
import { FONT } from "./theme";
import "../index.css";

/**
 * Hold the render until Montserrat is actually rasterisable. Without this the
 * first frames can be captured against a fallback serif.
 */
const handle = delayRender("Loading Montserrat");

Promise.all([
  document.fonts.load(`600 100px ${FONT}`),
  document.fonts.load(`700 100px ${FONT}`),
  document.fonts.load(`800 100px ${FONT}`),
  document.fonts.load(`900 100px ${FONT}`),
])
  .then(() => document.fonts.ready)
  .then(() => {
    if (!document.fonts.check(`900 100px ${FONT}`)) {
      throw new Error(`${FONT} failed to load`);
    }
    continueRender(handle);
  });

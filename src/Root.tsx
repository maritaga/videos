import { Conversatorio } from "./conversatorio/Conversatorio";
import { FPS as CFPS, TOTAL as CTOTAL } from "./conversatorio/timeline";
import { Reel } from "./reel/Reel";
import { FPS, TOTAL } from "./reel/timeline";
import "./index.css";
import { Composition, staticFile } from "remotion";
import {
  CaptionedVideo,
  calculateCaptionedVideoMetadata,
  captionedVideoSchema,
} from "./CaptionedVideo";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CaptionedVideo"
        component={CaptionedVideo}
        calculateMetadata={calculateCaptionedVideoMetadata}
        schema={captionedVideoSchema}
        width={1080}
        height={1920}
        defaultProps={{
          src: staticFile("sample-video.mp4"),
        }}
      />
      <Composition
        id="Reel"
        component={Reel}
        durationInFrames={TOTAL}
        fps={FPS}
        width={1080}
        height={1920}
      />
      <Composition
        id="Conversatorio"
        component={Conversatorio}
        durationInFrames={CTOTAL}
        fps={CFPS}
        width={1080}
        height={1920}
      />
    </>
  );
};

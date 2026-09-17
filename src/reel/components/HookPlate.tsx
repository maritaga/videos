import { AbsoluteFill, Audio, OffthreadVideo, staticFile } from "remotion";
import { HOOK_CLIP, HOOK_VOICE } from "../timeline";

/**
 * The hook shows the stand footage rather than the presenter, with her voice
 * laid over it. The clip carries no audio track of its own.
 */
export const HookPlate: React.FC<{ playbackRate: number }> = ({
  playbackRate,
}) => (
  <>
    <AbsoluteFill>
      <OffthreadVideo
        src={staticFile(HOOK_CLIP)}
        playbackRate={playbackRate}
        muted
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </AbsoluteFill>
    <Audio src={staticFile(HOOK_VOICE)} />
  </>
);

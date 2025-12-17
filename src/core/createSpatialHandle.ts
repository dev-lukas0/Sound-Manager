import { SoundHandle } from "./options";
import { fadeIn, fadeOut } from "../utils/functions";

/**
 * Create a Spatial Handle
 * @param assetId Asset ID
 * @param emitters Emitter
 */
export function createSpatialHandle(assetId: string, emitters: BasePart[]): SoundHandle {
    const player = new Instance("AudioPlayer");
    player.Asset = assetId;
    player.Volume = 1;
    player.Parent = game.GetService("ReplicatedStorage");

    const emitterInstances: AudioEmitter[] = [];

    for (const part of emitters) {
        const emitter = new Instance("AudioEmitter");
        emitter.Parent = part;

        const wire = new Instance("Wire");
        wire.SourceInstance = player;
        wire.TargetInstance = emitter;
        wire.Parent = emitter;

        emitterInstances.push(emitter);
    }

    return {
        play() {
            player.Play()
        },

        stop() {
            player.Stop()
        },

        fadeIn(duration: number) {
            fadeIn(player, 1, duration)
        },

        fadeOut(duration: number) {
            fadeOut(player, duration)
        },

        destroy() {
            player.Destroy()
            emitterInstances.forEach(e => e.Destroy())
        }
    };
}
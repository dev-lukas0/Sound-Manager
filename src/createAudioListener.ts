import { AudioListenerHandle } from "./core/options";

type ListenerParent = BasePart | Camera | Model;

/**
 * Creates an Audio Listener
 * @param parent BasePart | Camera | Model
 */
export function createAudioListener(parent: ListenerParent, name?: string): AudioListenerHandle | undefined {
    if (parent.FindFirstChild("Sound-Manager-AudioListener")) {
        warn("AudioListener already exists on this parent");
        return;
    }
    const listener = new Instance("AudioListener");
    listener.Name = name ?? "Sound-Manager-AudioListener";
    listener.Parent = parent;

    const output = new Instance("AudioDeviceOutput");
    output.Name = "Sound-Manager-AudioOutput";

    const wire = new Instance("Wire");
    wire.Name = "ListenerToOutput";

    wire.SourceInstance = listener;
    wire.TargetInstance = output;

    output.Parent = wire;
    wire.Parent = listener;

    return {
        listener,
        output,
        wire,
        destroy() {
            listener.Destroy();
        },
    };
}

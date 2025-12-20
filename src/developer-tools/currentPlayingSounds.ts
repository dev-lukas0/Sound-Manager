/**
 * @returns the current playing legacy sounds and spatial sounds
 */
export function currentPlayingSounds(): Array<string> {
    const ReplicatedStorage = game.GetService("ReplicatedStorage");

    const playingSounds = new Array<string>()

    const soundsFolder = ReplicatedStorage.FindFirstChild("Sounds");
    if (soundsFolder && soundsFolder.IsA("Folder")) {
        for (const category of soundsFolder.GetChildren()) {
            if (!category.IsA("Folder")) continue;

            for (const instance of category.GetChildren()) {
                if (instance.IsA("Sound")) {
                    playingSounds.push(`${instance.Name}`);
                }
            }
        }
    }

    for (const instance of ReplicatedStorage.GetChildren()) {
        if (instance.IsA("AudioPlayer")) {
            playingSounds.push(`${instance.Name}`);
        }
    }

    return playingSounds;
}
/**
 * @returns Total count of legacy sounds and spatial sounds
 */
export function TotalSoundCount(): number {
    const ReplicatedStorage = game.GetService("ReplicatedStorage");

    let count = 0;

    const soundsFolder = ReplicatedStorage.FindFirstChild("Sounds");
    if (soundsFolder && soundsFolder.IsA("Folder")) {
        for (const category of soundsFolder.GetChildren()) {
            if (!category.IsA("Folder")) continue;

            for (const instance of category.GetChildren()) {
                if (instance.IsA("Sound")) {
                    count++;
                }
            }
        }
    }

    for (const instance of ReplicatedStorage.GetChildren()) {
        if (instance.IsA("AudioPlayer")) {
            count++;
        }
    }

    return count;
}

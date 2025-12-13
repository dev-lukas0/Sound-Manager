import { CategoryOptions } from "./options";

/**
 * Create a sound category Registry
 * @param definitions Define the Categorys
 */
export function createSoundCategoryRegistry<T extends Record<string, CategoryOptions>>(definitions: T) {
    type SoundCategory = keyof T;

    const ReplicatedStorage = game.GetService("ReplicatedStorage");

    let folder = ReplicatedStorage.FindFirstChild("Sounds") as Folder;
    if (!folder) {
        folder = new Instance("Folder");
        folder.Name = "Sounds";
        folder.Parent = ReplicatedStorage;
    }

    /**
     * Loads a Category
     * @param name Define which Sound Category should be loaded
     */
    function loadCategory(name: SoundCategory) {
        if (folder.FindFirstChild(name as string)) return;

        const config = definitions[name];

        let category = folder.FindFirstChild(config.category as string) as Folder;
        if (!category) {
            category = new Instance("Folder");
            category.Name = config.category;
            category.Parent = folder;
        }


        for (const [sound, soundConfig] of pairs(config.sounds)) {
            if (category.FindFirstChild(sound)) continue;

            const newSound = new Instance("Sound");
            newSound.Name = sound;
            newSound.SoundId = soundConfig.id;
            newSound.Volume = soundConfig.volume ?? 1;
            newSound.Looped = soundConfig.loop ?? false;
            newSound.Parent = category;
        }
    }


    return {
        loadCategory,
    }
}
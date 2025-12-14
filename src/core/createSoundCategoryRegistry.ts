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

    /**
     * Play every Sound from a Sound Category
     * @param name Sound Category
     */
    function playCategory<C extends SoundCategory>(name: C) {
        loadCategory(name);
        const config = definitions[name];

        const ReplicatedStorage = game.GetService("ReplicatedStorage");

        const soundsFolder = ReplicatedStorage.FindFirstChild("Sounds") as Folder;
        if (!soundsFolder) return;

        const categoryFolder = soundsFolder.FindFirstChild(config.category as string) as Folder;
        if (!categoryFolder) return;
            for (const [sound] of pairs(config.sounds)) {
                const _sound = categoryFolder.FindFirstChild(sound as string);
                if (!_sound) continue;
                if (_sound?.IsA("Sound")) {
                    _sound.Play();
                }
        }
    }

    /**
     * Stop every Sound from a Sound Category
     * @param name Sound Category
     */
    function stopCategory<C extends SoundCategory>(name: C) {
        const config = definitions[name];

        const ReplicatedStorage = game.GetService("ReplicatedStorage");

        const soundsFolder = ReplicatedStorage.FindFirstChild("Sounds") as Folder;
        if (!soundsFolder) return;

        const categoryFolder = soundsFolder.FindFirstChild(config.category as string) as Folder;
        if (!categoryFolder) return;
            for (const [sound] of pairs(config.sounds)) {
                const _sound = categoryFolder.FindFirstChild(sound as string);
                if (!_sound) continue;
                if (_sound?.IsA("Sound")) {
                    _sound.Stop();
                }
        }
    }

    /**
     * Stops every Sound from every Sound Category
     */
    function stopAllCategories() {
        const ReplicatedStorage = game.GetService("ReplicatedStorage");

        const soundsFolder = ReplicatedStorage.FindFirstChild("Sounds") as Folder;
        if (!soundsFolder) return;

        for (const category of soundsFolder.GetChildren()) {
            if (!category.IsA("Folder")) continue;

            for (const sound of category.GetChildren()) {
                if (!sound.IsA("Sound")) continue;

                sound.Stop();
            }
        }
    }


    return {
        loadCategory,
        playCategory,
        stopCategory,
        stopAllCategories,
    }
}
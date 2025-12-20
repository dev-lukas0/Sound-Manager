import { CategoryOptions } from "./options";
import { createSpatialHandle } from "./createSpatialHandle";
import { SoundHandle } from "./options";

/**
 * Create a sound category Registry
 * @param definitions Define the Categorys
 */
export function createSoundCategoryRegistry<T extends Record<string, CategoryOptions>>(definitions: T) {
    type SoundCategory = keyof T;
    const spatialHandles = new Map<SoundCategory, Map<string, SoundHandle>>();

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
    function playCategory<C extends SoundCategory>(
        name: C,
        spatial?: { emitters: BasePart[] }
    ) {
        loadCategory(name);
        const config = definitions[name];

        const categoryFolder = folder.FindFirstChild(config.category as string) as Folder;
        if (!categoryFolder) return;

        let categoryHandles: Map<string, SoundHandle> | undefined;

        if (spatial && spatial.emitters.size() > 0) {
            categoryHandles = spatialHandles.get(name);
            if (!categoryHandles) {
                categoryHandles = new Map();
                spatialHandles.set(name, categoryHandles);
            }
        }

        for (const instance of categoryFolder.GetChildren()) {
            if (!instance.IsA("Sound")) continue;

            if (spatial && spatial.emitters.size() > 0 && categoryHandles) {
                const old = categoryHandles.get(instance.Name);
                if (old) {
                    old.stop();
                    old.destroy();
                }

                const handle = createSpatialHandle(
                    instance.SoundId,
                    spatial.emitters,
                    instance.Volume
                );

                categoryHandles.set(instance.Name, handle);
                handle.play();
            } else {
                instance.Play();
            }
        }
    }



    /**
     * Stop every Sound from a Sound Category
     * @param name Sound Category
     */
    function stopCategory<C extends SoundCategory>(name: C) {
        const categoryHandles = spatialHandles.get(name);
        if (categoryHandles) {
            for (const [_, handle] of categoryHandles) {
                handle.stop();
                handle.destroy();
            }
            categoryHandles.clear();
            spatialHandles.delete(name);
        }

        const config = definitions[name];
        const categoryFolder = folder.FindFirstChild(config.category as string) as Folder;
        if (!categoryFolder) return;

        for (const instance of categoryFolder.GetChildren()) {
            if (instance.IsA("Sound")) {
                instance.Stop();
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

    /**
     * Set the Volume of a Sound Category
     * @param category Sound Category
     * @param volume Volume
     */
    function setCategoryVolume<C extends SoundCategory>(category: C, volume: number) {
        const config = definitions[category];
        const ReplicatedStorage = game.GetService("ReplicatedStorage");

        const soundsFolder = ReplicatedStorage.FindFirstChild("Sounds") as Folder;
        if (!soundsFolder) return;

        const categoryFolder = soundsFolder.FindFirstChild(config.category as string) as Folder;
        if (!categoryFolder) return;

        for (const sound of categoryFolder.GetChildren()) {
            if (!sound.IsA("Sound")) continue;

            sound.Volume = volume;
        }
    }

    /**
     * Set the Global Volume of every Sound Category
     * @param volume Volume
     */
    function setGlobalCategoryVolume(volume: number) {
        const ReplicatedStorage = game.GetService("ReplicatedStorage");

        const soundsFolder = ReplicatedStorage.FindFirstChild("Sounds") as Folder;
        if (!soundsFolder) return;

        for (const category of soundsFolder.GetChildren()) {
            if (!category.IsA("Folder")) continue;

            for (const sound of category.GetChildren()) {
                if (!sound.IsA("Sound")) continue;

                sound.Volume = volume;
            } 
        }
    }

    /**
     * Whether a Category is playing or not
     * @param category Sound Category
     * @returns Whether a Category is playing or not
     */
    function isCategoryPlaying<C extends SoundCategory>(category: C): boolean {
        const config = definitions[category];
        const ReplicatedStorage = game.GetService("ReplicatedStorage");

        const soundsFolder = ReplicatedStorage.FindFirstChild("Sounds") as Folder;
        if (!soundsFolder) return false;

        const categoryFolder = soundsFolder.FindFirstChild(config.category as string) as Folder;
        if (!categoryFolder) return false;

        const sounds = categoryFolder.GetChildren().filter(sound => sound.IsA("Sound")) as Sound[];
        if (sounds.size() === 0) return false;

        for (const sound of sounds) {
            if (!sound.IsPlaying) {
                return false;
            }
        }

        return true; 
    }

    /**
     * Play a Sound from a Category
     * @param category Sound Category
     * @param sound Sound Instance
     */
    function playSoundFromCategory<C extends SoundCategory, S extends keyof T[C]["sounds"]>(category: C, sound: S) {
        loadCategory(category);

        const config = definitions[category];

        const ReplicatedStorage = game.GetService("ReplicatedStorage");
        const soundsFolder = ReplicatedStorage.FindFirstChild("Sounds") as Folder;
        if (!soundsFolder) return;

        const categoryFolder = soundsFolder.FindFirstChild(config.category as string) as Folder;
        if (!categoryFolder) return;

        const soundInstance = categoryFolder.FindFirstChild(sound as string) as Sound;
        if (soundInstance?.IsA("Sound")) {
            soundInstance.Play();
        }
    }

    /**
     * Reset a Sound Category Timeposition to 0
     * @param category Sound Category
     */
    function resetCategory<C extends SoundCategory>(category: C) {
        const config = definitions[category];

        const ReplicatedStorage = game.GetService("ReplicatedStorage");
        const soundsFolder = ReplicatedStorage.FindFirstChild("Sounds") as Folder;
        if (!soundsFolder) return;

        const categoryFolder = soundsFolder.FindFirstChild(config.category as string) as Folder;
        if (!categoryFolder) return;

        for (const sound of categoryFolder.GetChildren()) {
            if (!sound.IsA("Sound")) continue;

            sound.TimePosition = 0;
        }
    }

    /**
     * Resets every Sound from every Sound Category
     * @param category Sound Category
     */
    function resetAllCategories<C extends SoundCategory>(category: C) {
        const config = definitions[category];

        const ReplicatedStorage = game.GetService("ReplicatedStorage");
        const soundsFolder = ReplicatedStorage.FindFirstChild("Sounds") as Folder;
        if (!soundsFolder) return;

        for (const folder of soundsFolder.GetChildren()) {
            if (!folder.IsA("Folder")) continue;

            for (const sound of folder.GetChildren()) {
                if (!sound.IsA("Sound")) continue;

                sound.TimePosition = 0;
            }
        }
    }

    /**
     * Preloads a Sound Category
     * @param category Sound Category
     */
    function preloadCategory<C extends SoundCategory>(category: C) {
        loadCategory(category);
    }

    /**
     * Preloads every Sound Category
     */
    function preloadAllCategories() {
        for (const [category] of pairs(definitions)) {
            loadCategory(category as SoundCategory);
        }
    }

    /**
     * Smoothly fade in a Sound Category
     * @param category Sound Category
     * @param duration Duration
     * @param volume Volume
     */
    function fadeInCategory<C extends SoundCategory>(category: C, duration: number, volume: number) {
        const config = definitions[category];

        const ReplicatedStorage = game.GetService("ReplicatedStorage");
        const soundsFolder = ReplicatedStorage.FindFirstChild("Sounds") as Folder;
        if (!soundsFolder) return;

        const categoryFolder = soundsFolder.FindFirstChild(config.category as string) as Folder;
        if (!categoryFolder) return;

        for (const sound of categoryFolder.GetChildren()) {
            if (!sound.IsA("Sound")) continue;

            sound.Volume = 0;
            sound.Play();

            const step = 0.05;
            const interval = duration * step;

            task.spawn(() => {
                let vol = 0;
                while (vol < volume) {
                    vol += step;
                    sound.Volume = math.clamp(vol, 0, volume)
                    task.wait(interval);
                }
            })
        }
    }

    /**
     * Smoothly fade out a Sound Category
     * @param category Sound Category
     * @param duration Duration
     * @param targetVolume Target Volume
     */
    function fadeOutCategory<C extends SoundCategory>(category: C, duration: number, targetVolume?: number) {
        const config = definitions[category];

        const ReplicatedStorage = game.GetService("ReplicatedStorage");
        const soundsFolder = ReplicatedStorage.FindFirstChild("Sounds") as Folder;
        if (!soundsFolder) return;

        const categoryFolder = soundsFolder.FindFirstChild(config.category as string) as Folder;
        if (!categoryFolder) return;

        for (const sound of categoryFolder.GetChildren()) {
            if (!sound.IsA("Sound")) continue;

            const startVolume = sound.Volume;
            const endVolume = targetVolume ?? 0;

            const step = 0.05;
            const interval = duration * step;

            task.spawn(() => {
                let vol = startVolume;
                while (vol > endVolume) {
                    vol = math.clamp(vol - step, endVolume, startVolume);
                    sound.Volume = vol;
                    task.wait(interval);
                }
                sound.Volume = endVolume;
                if (endVolume === 0) sound.Stop();
            });
        }
    }

    /**
     * Does something on Category end
     * @param category Sound Category
     * @param callback Callback
     */
    function onCategoryEnd<C extends SoundCategory>(category: C, callback: () => void) {
        const config = definitions[category];

        const ReplicatedStorage = game.GetService("ReplicatedStorage");
        const soundsFolder = ReplicatedStorage.FindFirstChild("Sounds") as Folder;
        if (!soundsFolder) return;

        const categoryFolder = soundsFolder.FindFirstChild(config.category as string) as Folder;
        if (!categoryFolder) return;

        const sounds = categoryFolder.GetChildren().filter(s => s.IsA("Sound")) as Sound[];
        if (sounds.size() === 0) return;

        let remaining = sounds.size();

        for (const sound of sounds) {
            sound.Ended.Connect(() => {
                remaining -= 1;
                if (remaining <= 0) {
                    callback(); 
                }
            });
        }
    }


    return {
        loadCategory,
        playCategory,
        stopCategory,
        stopAllCategories,
        setCategoryVolume,
        setGlobalCategoryVolume,
        isCategoryPlaying,
        playSoundFromCategory,
        resetCategory,
        resetAllCategories,
        preloadAllCategories,
        preloadCategory,
        fadeInCategory,
        fadeOutCategory,
        onCategoryEnd,
    }
}
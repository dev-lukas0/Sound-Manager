import { SoundOptions } from "./options";

/**
 * 
 * @param definitions Define the Sounds
 * @returns 
 */
export function createSoundRegistry<T extends Record<string, SoundOptions>>(definitions: T) {
    type SoundName = keyof T;

    const ReplicatedStorage = game.GetService("ReplicatedStorage");

    let folder = ReplicatedStorage.FindFirstChild("Sounds") as Folder;
    if (!folder) {
        folder = new Instance("Folder");
        folder.Name = "Sounds";
        folder.Parent = ReplicatedStorage;
    }

    /**
     * 
     * @param name Define which Sound should be loaded
     * @returns 
     */
    function load(name: SoundName) {
        if (folder.FindFirstChild(name as string)) return;

        const config = definitions[name];

        const sound = new Instance("Sound");
        sound.Name = name as string;
        sound.SoundId = config.id;
        sound.Volume = config.volume ?? 1;
        sound.Looped = config.loop ?? false;
        sound.Parent = folder;
    }

    /**
     * 
     * @param name Define which Sound should be played
     */
    function play(name: SoundName) {
        load(name);
        const sound = folder.FindFirstChild(name as string) as Sound;
        sound?.Play();
    }

    /**
     * 
     * @param name Define which Sound should be stopped
     */
    function stop(name: SoundName) {
        const sound = folder.FindFirstChild(name as string) as Sound;
        sound?.Stop();
    }

    /**
     * Loads every Sound
     */
    function preloadAll() {
        for (const [name] of pairs(definitions)) {
            load(name as SoundName);
        }
    }

    return {
        play,
        stop,
        preloadAll,
        load,
    }
}
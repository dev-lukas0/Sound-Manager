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
     * Loads a Sound
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
     * Plays a Sound
     * @param name Define which Sound should be played
     */
    function play(name: SoundName) {
        load(name);
        const sound = folder.FindFirstChild(name as string) as Sound;
        sound?.Play();
    }

    /**
     * Stops a Sound
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

    /**
     * Smoothly fad in a sound
     * @param soundName Sound Instance
     * @param duration Time in Seconds
     * @param volume Volume
     */
    function fadeIn(soundName: SoundName, duration: number, volume: number) {
        const sound = folder.FindFirstChild(soundName as string) as Sound;
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

    /**
     * Smoothly fade out a sound
     * @param soundName Sound name from Registry
     * @param duration Time in seconds
     * @param targetVolume Optional target volume (default 0)
     */
    function fadeOut(soundName: SoundName, duration: number, targetVolume?: number) {
        const sound = folder.FindFirstChild(soundName as string) as Sound;
        if (!sound) return;

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

    /**
     * 
     * @param sound Sound Instance
     */
    function reset(sound: SoundName) {
        const _sound = folder.FindFirstChild(sound as string) as Sound;
        if (!sound) return;

        _sound.TimePosition = 0;
    }

    /**
     * 
     * @param sound Sound Instance
     * @param timePosition Time Position
     */
    function setTimePosition(sound: SoundName, timePosition: number) {
        const _sound = folder.FindFirstChild(sound as string) as Sound;
        if (!sound) return;

        _sound.TimePosition = timePosition;
    }


    return {
        play,
        stop,
        preloadAll,
        load,
        fadeIn,
        fadeOut,
        reset,
        setTimePosition,
    }
}
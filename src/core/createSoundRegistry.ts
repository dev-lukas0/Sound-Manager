import { SoundHandle, SoundOptions } from "./options";
import { createSpatialHandle } from "./createSpatialHandle";

/**
 * Create a sound Registry
 * @param definitions Define the Sounds
 */
export function createSoundRegistry<T extends Record<string, SoundOptions>>(definitions: T) {
    type SoundName = keyof T;
    const spatialHandles = new Map<string, SoundHandle>();

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
     * @param spatial Array of BaseParts
     */
    function load(name: SoundName, spatial?: { emitters: BasePart[] }) {
        const config = definitions[name];
        if (!spatial || !spatial.emitters) {
            if (folder.FindFirstChild(name as string)) return;

            const config = definitions[name];

            const sound = new Instance("Sound");
            sound.Name = name as string;
            sound.SoundId = config.id;
            sound.Volume = config.volume ?? 1;
            sound.Looped = config.loop ?? false;
            sound.Parent = folder;
        } else {

        const emittersArray = spatial.emitters;
        const handle = createSpatialHandle(config.id, emittersArray, config.volume ?? 1, config.loop ?? false, config.playbackSpeed ?? 1);

        spatialHandles.set(name as string, handle);

        return handle;
        }

    }

    /**
     * Plays a Sound
     * @param name Define which Sound should be played
     * @param spatial Array of Baseparts
     */
    function play(name: SoundName, spatial?: { emitters: BasePart[] }) {
        const config = definitions[name];

        if (!spatial || !spatial.emitters) {
            load(name);
            const sound = folder.FindFirstChild(name as string) as Sound;
            sound?.Play();
            return;
        } else {
            const emittersArray = spatial.emitters;
            const handle = createSpatialHandle(config.id, emittersArray, config.volume ?? 1, config.loop ?? false, config.playbackSpeed ?? 1);

            spatialHandles.set(name as string, handle);
            handle.play();

            return handle;
        }
    }

    /**
     * Stops a Sound
     * @param name Define which Sound should be stopped
     * @param spatial Array of Baseparts
     */
    function stop(name: SoundName, spatial?: { emitters: BasePart[] }) {
        if (!spatial) {
            const sound = folder.FindFirstChild(name as string) as Sound;
            if (!sound) {
                warn(`${name as string} not found! Tip: Preload the sound first before using it.`);
                return;
            }
            sound?.Stop();
            return;
        }

        const handle = spatialHandles.get(name as string);
        if (!handle) return;

        handle.stop();
        handle.destroy();
        spatialHandles.delete(name as string);
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
     * Preloads all spatial Sounds
     * @param emittersMap
     */
    function preloadAllSpatial(
        emittersMap: Partial<Record<SoundName, BasePart[]>>
    ) {
        for (const [name, emitters] of pairs(emittersMap)) {
            const emitterArray = emitters as BasePart[] | undefined;
            if (!emitterArray) continue;

            const soundName = name as SoundName;

            if (spatialHandles.has(soundName as string)) continue;

            const config = definitions[soundName];

            const handle = createSpatialHandle(
                config.id,
                emitterArray,
                config.volume ?? 1,
                config.loop ?? false,
                config.playbackSpeed ?? 1
            );

            spatialHandles.set(soundName as string, handle);
        }
    }

    /**
     * Preloads a spatial sound
     * @param name Sound Name
     * @param emitters Emitters
     */
    function preloadSpatial(name: SoundName, emitters: BasePart[]) {
        if (spatialHandles.has(name as string)) return;

        const config = definitions[name];
        if (!config) {
            warn(`${name as string} is not defined in the registry.`);
            return;
        }

        const handle = createSpatialHandle(
            config.id,
            emitters,
            config.volume ?? 1,
            config.loop ?? false,
            config.playbackSpeed ?? 1
        );

        spatialHandles.set(name as string, handle);
    }


    /**
     * Smoothly fade in a sound
     * @param soundName Sound Instance
     * @param duration Time in Seconds
     * @param volume Volume
     * @param spatial Array of Baseparts
     */
    function fadeIn(soundName: SoundName, duration: number, volume: number, spatial?: { emitters: BasePart[] }) {
        const config = definitions[soundName];
        if (!spatial || !spatial.emitters) {
            const sound = folder.FindFirstChild(soundName as string) as Sound;
            if (!sound) {
                warn(`${soundName as string} not found! Tip: Preload the sound first before using it.`);
                return;
            }
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
        } else {
            const emittersArray = spatial.emitters;
            const handle = createSpatialHandle(config.id, emittersArray, config.volume ?? 1, config.loop ?? false, config.playbackSpeed ?? 1);
            handle.fadeIn?.(duration, volume);
            if (!config.loop === true) {
                handle.played(() => {
                    handle.destroy();
                });
            }
        }
    }

    /**
     * Smoothly fade out a sound
     * @param soundName Sound name from Registry
     * @param duration Time in seconds
     * @param targetVolume Optional target volume (default 0)
     * @param spatial Array of Baseparts
     */
    function fadeOut(soundName: SoundName, duration: number, targetVolume?: number, spatial?: { emitters: BasePart[] }) {
        const config = definitions[soundName];
        if (!spatial || !spatial.emitters) {
            const sound = folder.FindFirstChild(soundName as string) as Sound;
            if (!sound) {
                warn(`${soundName as string} not found! Tip: Preload the sound first before using it.`);
                return;
            }

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
        } else {
            const emittersArray = spatial.emitters;
            const handle = createSpatialHandle(config.id, emittersArray, config.volume ?? 1, config.loop ?? false, config.playbackSpeed ?? 1);
            handle.fadeOut?.(duration);
            if (!config.loop === true) {
                handle.played(() => {
                    handle.destroy();
                });
            }
        }
    }

    /**
     * Reset a Sound
     * @param sound Sound Instance
     * @param spatial Define whether this sound is a spatial sound or not
     */
    function reset(sound: SoundName, spatial?: boolean) {
        if (!spatial) {
            const _sound = folder.FindFirstChild(sound as string) as Sound;
            if (!_sound) {
                    warn(`${sound as string} not found! Tip: Preload the sound first before using it.`);
                    return;
                }

            _sound.TimePosition = 0;
        }

        const _sound = spatialHandles.get(sound as string);
        _sound?.setTimePosition(0);
    }

    /**
     * Reset every Sound
     * @param sound Sound Instance
     * @param spatial Define whether this sound is a spatial sound or not
     */
    function resetAll(sound: SoundName, spatial?: boolean) {
        if (!spatial) {
            for (const sound of folder.GetChildren()) {
                if (sound.IsA("Sound")) {
                    sound.TimePosition = 0;
                }
            }
        }

        for (const instance of folder.GetChildren()) {
            if (instance.IsA("AudioPlayer")) {
                instance.TimePosition = 0;
            }
        }
    }

    /**
     * Set Time Position
     * @param sound Sound Instance
     * @param timePosition Time Position
     * @param spatial Define whether this sound is a spatial sound or not
     */
    function setTimePosition(sound: SoundName, timePosition: number, spatial?: boolean) {
        if (!spatial) {
            const _sound = folder.FindFirstChild(sound as string) as Sound;
            if (!_sound) {
                    warn(`${sound as string} not found! Tip: Preload the sound first before using it.`);
                    return;
                }

            _sound.TimePosition = timePosition;
        }
        const _sound = spatialHandles.get(sound as string);
        _sound?.setTimePosition(timePosition);
    }

    /**
     * Stop every Sound
     * @param reset Define whether every Sound should also be reset?
     * @param spatial Define whether this sound is a spatial sound or not
     */
    function stopAll(reset?: true, spatial?: boolean) {
        if (!spatial) {
            for (const instance of folder.GetChildren()) {
                if (!instance.IsA("Sound")) continue;

                instance.Stop();

                if (reset) {
                    instance.TimePosition = 0;
                }
            }
        }
        for (const instance of folder.GetChildren()) {
            if (!instance.IsA("AudioPlayer")) continue;

            instance.Stop();

            if (reset) {
                instance.TimePosition = 0;
            }
        }
    }

    /**
     * Set Sound Volume
     * @param sound Sound Instance
     * @param volume Sound Volume
     * @param spatial Array of Baseparts
     */
    function setVolume(sound: SoundName, volume: number, spatial?: { emitters: BasePart[] }) {
        const config = definitions[sound];
        if (!spatial || spatial.emitters) {
            const _sound = folder.FindFirstChild(sound as string) as Sound;
            if (!_sound) {
                warn(`${sound as string} not found! Tip: Preload the sound first before using it.`);
                return;
            }

            _sound.Volume = volume;
        } else {
            const emittersArray = spatial.emitters;
            const handle = createSpatialHandle(config.id, emittersArray, volume, config.loop ?? false, config.playbackSpeed ?? 1);
        }
    }

    /**
     * Set the global Sound Volume
     * @param volume Sound Volume
     * @param spatial Define whether this sound is a spatial sound or not
     */
    function setGlobalVolume(volume: number, spatial?: boolean) {
        if (!spatial) {
            for (const instance of folder.GetChildren()) {
                if (!instance.IsA("Sound")) continue;

                if (instance.IsA("Sound")) {
                    instance.Volume = volume;
                };
            }
        }
        for (const instance of folder.GetChildren()) {
            if (!instance.IsA("AudioPlayer")) continue;

            if (instance.IsA("AudioPlayer")) {
                instance.Volume = volume;
            }
        }
    }

    /**
     * Does something on Sound end
     * @param name Sound Name
     * @param callback Callback
     * @param spatial Define whether this sound is a spatial sound or not
     */
    function onEnd(sound: SoundName, callback: () => void, spatial?: { emitters: BasePart[] }) {
        if (!spatial) {
            const _sound = folder.WaitForChild(sound as string) as Sound;
            if (!_sound) {
                warn(`${sound as string} not found! Tip: Preload the sound first before using it.`);
                return;
            }
            _sound.Ended.Connect(callback);
        } else {
            const handle = spatialHandles.get(sound as string);
            if (!handle) return;

            handle.played(callback);
        }
        
    }

    /**
     * Preloads a Sound
     * @param sound Sound Instance
     */
    function preload(sound: SoundName) {
        load(sound);
    }

    /**
     * Check whether a Sound is playing
     * @param sound Sound Instance
     * @returns Boolean
     * @param spatial Define whether this sound is a spatial sound or not
     */
    function isPlaying(sound: SoundName, spatial?: boolean): boolean {
        if (!spatial) {
            const _sound = folder.FindFirstChild(sound as string) as Sound;
            if (!_sound) {
                warn(`${sound as string} not found! Tip: Preload the sound first before using it.`);
            }
            if (_sound.IsPlaying === true) {
                return true;
            } else {
                return false;
            }
        }

        const _sound = spatialHandles.get(sound as string);
        if (!_sound) {
            warn(`${sound as string} not found! Tip: Preload the sound first before using it.`);
        }
        if (_sound?.playing() === true) {
            return true;
        }
        return false;
    }   

    /**
     * Delete a sound instance
     * @param sound Sound Instance
     * @param spatial Define whether this sound is a spatial sound or not
     */
    function destroy(sound: SoundName, spatial?: boolean) {
        if (!spatial) {
            const instance = folder.FindFirstChild(sound as string) as Sound | undefined;
            if (!instance) {
                warn(`${sound as string} not found! Tip: Preload the sound first before using it.`);
                return;
            }
            instance.Destroy();
            return;
        }

        const handle = spatialHandles.get(sound as string);
        if (!handle) {
            warn(`${sound as string} not found! Tip: Preload the sound first before using it.`);
            return;
        }

        handle.destroy();
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
        stopAll,
        preload,
        setGlobalVolume,
        setVolume,
        resetAll,
        onEnd,
        isPlaying,
        preloadAllSpatial,
        preloadSpatial,
        destroy,
    }
}
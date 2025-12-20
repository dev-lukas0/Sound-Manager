import { SoundOptions } from "../core/options";

/**
 * @returns Properties of a sound
 */
export function soundProperties<T extends Record<string, SoundOptions>>(name: keyof T, definitions: T) {
    const sound = definitions[name];
    if (!sound) throw `Sound ${tostring(name)} not found`;

    return {
        id: sound.id,
        volume: sound.volume ?? 1,
        loop: sound.loop ?? false,
        spatial: sound.spatial ?? {},
    }
}

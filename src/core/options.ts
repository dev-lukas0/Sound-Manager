export interface SoundOptions {
    volume?: number;
    loop?: boolean;
    id: string;
}

interface SoundDefinition {
    id: string,
    volume?: number;
    loop?: boolean;
}

export interface CategoryOptions {
    category: string;
    sounds: Record<string, SoundDefinition>;
}
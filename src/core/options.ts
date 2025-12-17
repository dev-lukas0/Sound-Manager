export interface SoundOptions {
    volume?: number;
    loop?: boolean;
    id: string;
    spatial?: {
        attenuation?: number;
        directional?: boolean;
    }
}

export interface SoundHandle {
    play(): void;
    stop(): void;
    fadeIn?(duration: number, volume: number): void;
    fadeOut?(duration: number): void;
    destroy(): void;
    played(callback: () => void): void;
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
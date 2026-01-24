export interface SoundOptions {
    volume?: number;
    loop?: boolean;
    playbackSpeed?: number;
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
    playing(): boolean;
    setTimePosition(timeposition: number): void;
    setPlayBackSpeed(playbackspeed: number): void;
}

interface SoundDefinition {
    id: string,
    volume?: number;
    loop?: boolean;
    playBackSpeed?: number;
}

export interface CategoryOptions {
    category: string;
    sounds: Record<string, SoundDefinition>;
}

export interface AudioListenerHandle {
    listener: AudioListener;
    output: AudioDeviceOutput;
    wire: Wire;
    destroy(): void;
}
import { SoundOptions } from "./core/options";

export namespace Sounds {
	/** * * @param sound Define the Sound to play */
    export function play(soundName: string) {
        const soundFolder = game.GetService("ReplicatedStorage").FindFirstChild("Sounds") as Folder;
        if (!soundFolder) {
            warn("Sound folder not found in ReplicatedStorage.");
            return;
        }

        const _sound = soundFolder.FindFirstChild(soundName) as Sound;
        if (_sound) {
            _sound.Play();
        } else {
            warn(`Sound: ${soundName} not found! Make sure to load it first.`);
        }
    }

	/** * * @param soundname Define the name of the Sound * @param soundid Define the SoundID of the Sound * @param options Define the options for the Sound (e.g. volume) */
    export function load(soundName: string, soundId: string, options?: SoundOptions) {
        let soundFolder = game.GetService("ReplicatedStorage").FindFirstChild("Sounds") as Folder;
        if (!soundFolder) {
            soundFolder = new Instance("Folder");
            soundFolder.Name = "Sounds";
            soundFolder.Parent = game.GetService("ReplicatedStorage");
        }

        if (soundFolder.FindFirstChild(soundName)) {
            warn(`Sound: ${soundName} already exists.`);
            return;
        }

        const newSound = new Instance("Sound");
        newSound.Name = soundName;
        newSound.SoundId = soundId;
        newSound.Parent = soundFolder;

        if (options?.volume !== undefined) newSound.Volume = options.volume;
        if (options?.loop !== undefined) newSound.Looped = options.loop;
    }
}

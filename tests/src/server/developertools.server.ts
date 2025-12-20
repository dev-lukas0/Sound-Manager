import { Developer_Tools } from "@rbxts/sound-manager";
import { createSoundRegistry } from "@rbxts/sound-manager";

const Sounds = {
    SCP096: {
        id: "rbxassetid://4714389545",
        volume: 1,
        loop: false,
    },

    Test: {
        id: "rbxassetid://17771398985",
        volume: 1,
        loop: true,
    }
} as const;

const registry = createSoundRegistry(Sounds);

registry.preloadAll();
print(registry.isPlaying("SCP096"));
task.wait(2);
print(Developer_Tools.getTotalSoundCount());
print(Developer_Tools.getCurrentPlayingSounds());
print(Developer_Tools.getSoundProperties<typeof Sounds>("SCP096", Sounds));
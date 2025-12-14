import { createSoundCategoryRegistry } from "@rbxts/sound-manager";

const SoundCategories = createSoundCategoryRegistry({
    SCP096: {
        category: "SCP",
        sounds: {
            Sound096: {
                id: "rbxassetid://4714389545",
                volume: 1,
                loop: false,
            },

            Test: {
                id: "rbxassetid://17771398985",
                volume: 1,
                loop: false,
            }
        }
    }
});

task.wait(5);
SoundCategories.playCategory("SCP096");
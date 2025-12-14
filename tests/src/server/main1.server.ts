import { SoundService } from "@rbxts/services";
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
task.wait(3);
SoundCategories.stopCategory("SCP096");
task.wait(2);
SoundCategories.fadeInCategory("SCP096", 3, 1);
print(SoundCategories.isCategoryPlaying("SCP096"));
task.wait(3);
SoundCategories.fadeOutCategory("SCP096", 3);
task.wait(3);
SoundCategories.stopCategory("SCP096");
print(SoundCategories.isCategoryPlaying("SCP096"));
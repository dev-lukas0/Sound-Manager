import { createSoundRegistry } from "@rbxts/sound-manager";

const Sounds = createSoundRegistry({
    SCP096: {
        id: "rbxassetid://4714389545",
        volume: 1,
        loop: false,
    } 
});

Sounds.preloadAll();

Sounds.play("SCP096");
task.wait(5);
Sounds.stop("SCP096");

task.wait(2);
Sounds.fadeIn("SCP096", 1.5, 1);
task.wait(3);
Sounds.fadeOut("SCP096", 1);
import { createSoundRegistry } from "@rbxts/sound-manager";

const Sounds = createSoundRegistry({
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
});


Sounds.play("SCP096");
task.wait(3);
Sounds.stop("SCP096");


const speaker = game.Workspace.WaitForChild("Speaker") as BasePart;
const spatialHandle1 = Sounds.play("Test", { emitters: [speaker] });
spatialHandle1?.fadeIn?.(1);
task.wait(10);
spatialHandle1?.fadeOut?.(2);
spatialHandle1?.destroy?.();

const left = game.Workspace.WaitForChild("LeftSpeaker") as BasePart;
const right = game.Workspace.WaitForChild("RightSpeaker") as BasePart;

const spatialHandle2 = Sounds.play("Test", { emitters: [left, right] });
spatialHandle2?.fadeIn?.(2);
task.wait(5);
spatialHandle2?.fadeOut?.(2);
spatialHandle2?.destroy?.();
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

/*
Sounds.play("SCP096");
task.wait(3);
Sounds.stop("SCP096");


const speaker = game.Workspace.WaitForChild("Speaker") as BasePart;
Sounds.play("Test", { emitters: [speaker] });
task.wait(3);
Sounds.stop("Test", { emitters: [speaker] });

const left = game.Workspace.WaitForChild("LeftSpeaker") as BasePart;
const right = game.Workspace.WaitForChild("RightSpeaker") as BasePart;

Sounds.play("Test", { emitters: [left, right] });
task.wait(3);
Sounds.stop("Test", { emitters: [left, right] });
task.wait(5);
Sounds.play("Test", { emitters: [left, right] });
task.wait(3);
Sounds.stop("Test", { emitters: [left, right] });
*/

Sounds.fadeIn("SCP096", 5, 0.5);
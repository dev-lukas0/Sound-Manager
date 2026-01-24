import { Workspace } from "@rbxts/services";
import { createSoundRegistry } from "@rbxts/sound-manager";
import { createAudioListener } from "@rbxts/sound-manager";

const Sounds = createSoundRegistry({
    SCP096: {
        id: "rbxassetid://4714389545",
        volume: 1,
        loop: true,
        playbackSpeed: 5,
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
const newaudioListener = createAudioListener(Workspace.CurrentCamera!, "Test");
newaudioListener?.destroy();

//Sounds.preloadSpatial("SCP096", [Workspace.WaitForChild("Part") as BasePart]);
//Sounds.preload("SCP096")
//Sounds.fadeIn("SCP096", 5, 0.5);
//task.wait(3);
//Sounds.destroy("SCP096");
//Sounds.destroy("SCP096");
const sound = Sounds.play("SCP096", { emitters: [Workspace.WaitForChild("Part") as BasePart] });
task.wait(3);
sound?.setPlayBackSpeed(1);
print("Set Speed")
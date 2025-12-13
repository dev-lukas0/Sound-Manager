/// <reference types="@rbxts/testez/globals" />

import { RunService } from "@rbxts/services";

export = () => {
    afterAll(() => {
        if (RunService.IsRunMode()) {
            return;
        }
    })
}
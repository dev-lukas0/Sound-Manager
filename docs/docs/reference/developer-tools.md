---
sidebar_position: 3
description: Developer tools for Sound-Manager
---

# Developer Tools

_Sound-Manager_ provides several developer tools to help you debug and optimize your code for sound management in Roblox-TS projects.

## Current Playing Sounds

You can use the `getCurrentPlayingSounds` function to retrieve a list of all currently playing sounds in your Sound-Registry or Sound-Category-Registry. This is useful for debugging and monitoring sound playback in your game.

```ts
const playingSounds = Developer_Tools.getCurrentPlayingSounds();
```

## Total Sound Count

You can use the `getTotalSoundCount` function to get the total number of loaded sounds in your Sound-Registry or Sound-Category-Registry. This helps you keep track of the number of sounds in your project.

```ts
const totalSounds = Developer_Tools.getTotalSoundCount();
```

## Sound Properties

You can use the `getSoundProperties` function to retrieve the properties of a specific sound by its name. This is useful for inspecting sound settings and configurations.

```ts
const Sounds = {
    TestSound: {
        id: "rbxassetid://4714389545",
        volume: 1,
        loop: false,
    },
} as const;

const soundProps = Developer_Tools.getSoundProperties<typeof Sounds>("TestSound", sounds);
```
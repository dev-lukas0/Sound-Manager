---
sidebar_position: 1
description: Manage your project sounds.
---

# createSoundRegistry

`createSoundRegistry` lets you create a Sound-Registry to manage sounds in your Roblox-TS project.

```ts
const soundRegistry = createSoundRegistry(sounds);
```

---

## Reference

### `createSoundRegistry(definitions: Record<string, SoundOptions>)`

Creates a Sound-Registry from a record of sound definitions.

```ts
const sounds = {
    backgroundMusic: {
        id: "rbxassetid://1234567890",
        volume: 0.5,
        looped: true,
    },
    jumpSound: {
        id: "rbxassetid://0987654321",
        volume: 1.0,
        looped: false,
    },
} as const;

export const soundRegistry = createSoundRegistry(sounds);
```
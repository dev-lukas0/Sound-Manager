---
description: API Reference for Sound-Manager
---

# Reference

_Sound-Manager_ allows you to easily manage sounds in your Roblox-TS Project. This page documents the core Sound-Manager APIs.

Sound-Manager provides these top-level exports:

-   [`createSoundRegistry(definitions: Record<string, SoundOptions>)`](create-sound-registry)
-   [`createSoundCategoryRegistry(definitions: Record<string, CategoryOptions>)`](create-sound-category-registry)

[See the source code on GitHub →](https://github.com/dev-lukas0/Sound-Manager)

---

## Sound-Registry

_Sound-Registry_ is the core of Sound-Manager. It allows you to define, create, and manage sounds in your Roblox-TS Project.

Explore how to use Sound-Registry to manage your game:

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

---

## Sound-Categories

If your projects contains many sounds, you can organize them by using _Sound-Categories_ . Sound-Categories allow you to group sounds together and manage them as a single unit.

```ts
const categories = {
    music: {
        category: "Music",
        sounds: {
            backgroundMusic: {
                id: "rbxassetid://1234567890",
                volume: 0.5,
                looped: true,
            },
        },
    }
} as const;

export const soundCategoryRegistry = createSoundCategoryRegistry(categories);
```

---

---
sidebar_position: 2
description: Manage your project sound-categories.
---

# createSoundCategoryRegistry

`createSoundCategoryRegistry` lets you create a Sound-Category-Registry to manage sound categories in your Roblox-TS project.

```ts
const soundCategoryRegistry = createSoundCategoryRegistry(soundCategories);
```

---

## Reference

### `createSoundCategoryRegistry(definitions: Record<string, CategoryOptions>)`

Creates a Sound-Category-Registry from a record of sound definitions.

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

### Why use Sound-Categories?

If your project contains many sounds, you can organize them by using _Sound-Categories_. Sound-Categories allow you to group sounds together and manage them as a single unit. This makes it easier to control volume, playback, and other properties for related sounds.
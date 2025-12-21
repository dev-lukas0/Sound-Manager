---
sidebar_position: 2
description: Manage spatial sounds in your Roblox-TS project
---

# Spatial Sounds

By using Spatial Sounds, you can use the new Roblox audio API for your sounds.

```ts
const emitters: BasePart[] = [
    game.Workspace.WaitForChild("Part1") as BasePart,
];

SoundCategories.playCategory("SCP096", { emitters });
```

### Why use Spatial Sounds?
Spatial sounds allow your project to have **immersive 3D audio**. This is ideal for games with environmental sounds, footsteps, explosions, or any audio that should react naturally to player movement.
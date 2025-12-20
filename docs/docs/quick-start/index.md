---
description: Get started with Sound-Manager
slug: /
---

# Quick Start

_Sound-Manager_ is a sound management library that lets create and manage sounds.
## Installation

Sound-Manager is available on [npm](https://www.npmjs.com/package/@rbxts/sound-manager)

```bash title="Terminal"
npm install @rbxts/sound-manager
```


```bash title="Terminal"
yarn add @rbxts/sound-manager
```

```bash title="Terminal"
pnpm add @rbxts/sound-manager
```


## Start using Sound-Manager

You're now ready to use Sound-Manager! Create a SoundRegistry to start managing sounds in your project.

```ts showLineNumbers
import { createSoundRegistry } from "@rbxts/sound-manager";

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


## Use your Sound-Registry anywhere

With Sound-Manager, you can easily play, stop, etc. sounds from your SoundRegistry anywhere in your project.

```ts showLineNumbers
soundRegistry.play("backgroundMusic"); // Plays the background music
```
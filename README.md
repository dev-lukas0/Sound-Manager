# Sound Manager

A Roblox sound management library built with Roblox-TS

## Getting Started
To use the Sound Manager library in your Roblox-TS project, install it via npm:
```bash
npm install @rbxts/sound-manager
```

Example usage:
```typescript
import { createSoundRegistry } from "@rbxts/sound-manager";

const Sounds = createSoundRegistry({
    SCP096: {
        id: "rbxassetid://4714389545",
        volume: 1,
        loop: false,
    } 
});

Sounds.preloadAll();

Sounds.play("SCP096");
```

For more Details:
https://dev-lukas0.github.io/Sound-Manager-Docs/
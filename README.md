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

## Roadmap

### Core API
- [x] load
- [x] play
- [x] stop / stopAll
- [x] preload / preloadAll
- [x] fadeIn / fadeOut
- [x] reset / resetAll
- [x] setTimePosition
- [x] setVolume / setGlobalVolume
- [x] onEnd
- [x] isPlaying

### Development Utilities
- [ ] Total Sound Count function
- [ ] Currently Playing Sounds function
- [ ] Sound Instance Getter function
- [ ] Sound Properties Getter function

### Category API
- [x] playCategory
- [x] stopCategory / stopAllCategories
- [ ] setCategoryVolume / setGlobalCategoryVolume
- [ ] fadeInCategory / fadeOutCategory
- [ ] preloadCategory / preloadAllCategories
- [ ] isCategoryPlaying
- [ ] onCategoryEnd
- [ ] resetCategory / resetAllCategories
- [ ] playSoundFromCategory

### Features
- [x] Sound Autocompletion
- [ ] Sound Categories
- [ ] Sound Creation functions
- [ ] Sound Priority


For more Details:
https://dev-lukas0.github.io/Sound-Manager-Docs/
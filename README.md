# Sound Manager

A Roblox sound management library built with Roblox-TS

## Getting Started
To use the Sound Manager library in your Roblox-TS project install it via npm:
```bash
   npm install @rbxts/sound-manager
   ```

Example usage:
```typescript
import { Sounds } from "@rbxts/sound-manager";

Sounds.load("TestSound", "rbxassetid://4714389545", { volume: 1, loop: false });     
Sounds.play("TestSound")
```
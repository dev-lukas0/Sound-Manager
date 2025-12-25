---
sidebar_position: 4
description: Create a new audio listener
---

# createAudioListener

`createAudioListener` lets you create an AudioListener and manage it.

```ts
const newAudioListener = createAudioListener(Workspace.CurrentCamera);
```

---

## Reference

### `createAudioListener(parent: BasePart | Camera | Model, name?: "string"): AudioListenerHandle | undefined`

Creates an Audio-Listener

```ts
import { Workspace } from "@rbxts/services";
import { createAudioListener } from "@rbxts/sound-manager";

export const newAudioListener = createAudioListener(Workspace.CurrentCamera, "Test");
```

### Why use createAudioListener?

_createAudioListener_ lets you set up a dedicated audio listener in your project, which is essential for managing 3D spatial audio correctly
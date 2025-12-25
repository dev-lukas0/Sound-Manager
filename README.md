<h1 align="center">
	<a href="https://www.npmjs.com/package/@rbxts/sound-manager">
		<img src="https://github.com/dev-lukas0/Sound-Manager/blob/master/public/logo.png?raw=true" alt="Sound-Manager" width="200" />
	</a>
	<br />
	<b>Sound Manager</b>
    
</h1>

<div align="center">

![npm](https://img.shields.io/npm/dt/@rbxts/sound-manager?style=flat-square) ![npm](https://img.shields.io/npm/v/@rbxts/sound-manager?style=flat-square) ![GitHub](https://img.shields.io/github/license/dev-lukas0/Sound-Manager?style=flat-square)

</div>

---

&nbsp;


## 🔉 Sound Manager

**Sound Manager** is a roblox sound-management library built with Roblox-TS, designed to simplify sound handling in your roblox projects.

&nbsp;

## 📦 Installation

To use the Sound Manager library in your Roblox-TS project, install it via npm:

```bash
npm install @rbxts/sound-manager
```

&nbsp;

## 🚀 Quick Start

[See the Documentation ->](https://dev-lukas0.github.io/Sound-Manager/)

### ⚡ Starting with Sound Manager

Sound-Manager uses [`createSoundRegistry`](https://dev-lukas0.github.io/Sound-Manager/docs/reference/create-sound-registry) and [`createSoundCategoryRegistry`](https://dev-lukas0.github.io/Sound-Manager/docs/reference/create-sound-category-registry) to create sounds and categories.

```ts
import { createSoundRegistry } from "@rbxts/sound-manager";

const Sounds = createSoundRegistry({
    SCP096: {
        id: "rbxassetid://4714389545",
        volume: 1,
        loop: false,
    },

    Test: {
        id: "rbxassetid://17771398985",
        volume: 1,
        loop: true,
    }
});
```

### 🎵 Playing Sounds

To play a sound, you can use the [`play`](https://dev-lukas0.github.io/Sound-Manager-Docs/docs/API/play) method on the sound registry:

```ts
Sounds.play("SCP096");
```

&nbsp;

## 🗺️ Roadmap
-------
See the [Roadmap](./Roadmap.md) for planned features and current progress.

&nbsp;

## 📝 License

**Sound Manager** is licensed under the [MIT LICENSE](./LICENSE).

&nbsp;

For more Details:
https://dev-lukas0.github.io/Sound-Manager-Docs/
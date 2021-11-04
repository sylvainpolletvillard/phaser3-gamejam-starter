import {SPRITESHEETS} from "../data/spritesheets";

export interface AnimConfig {
	name: string
	nbFrames: number
	fileName?: string
	framerate?: number
	repeat?: number
}

export function declareAnims(
	scene: Phaser.Scene,
	spriteName: string,
	anims: AnimConfig[]
) {
	for (let anim of anims) {
		scene.anims.create({
			key: `${spriteName}_${anim.name}`,
			frameRate: anim.framerate ?? 15,
			repeat: anim.repeat ?? -1,
			frames: scene.anims.generateFrameNames(spriteName, {
				start: 0,
				end: anim.nbFrames-1,
				zeroPad: 3,
				prefix: `${anim.fileName ?? anim.name}_`,
				suffix: ".png",
			}),
		})
	}
}

export function declareAllAnims(scene: Phaser.Scene) {
	declareAnims(scene, SPRITESHEETS.CAVEMAN, [
		{ name: "Idle", /*fileName: "Idle Blinking",*/ nbFrames: 11 },
		{ name: "Jump Start", nbFrames: 6, repeat: 0 },
		{ name: "Jump Loop", nbFrames: 6 },
		{ name: "Running", nbFrames: 15 },
	])

	scene.anims.create({
		key: SPRITESHEETS.EXPLOSION,
		frameRate: 10,
		repeat: 0,
		frames: scene.anims.generateFrameNames(SPRITESHEETS.EXPLOSION, {
			start: 1,
			end: 4,
			zeroPad: 0,
			prefix: `explosion`,
			suffix: ".png",
		}),
	})
}

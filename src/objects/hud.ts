import { playSound } from "../utils/sound-manager"
import { openOptions } from "../scenes/options-scene"
import {SOUNDS} from "../data/sounds";
import {IMAGES} from "../data/images";
import {gamestate} from "../data/gamestate";

export class HUD {
	scene: Phaser.Scene
	hpBarOuter: Phaser.GameObjects.Image
	hpBarInner: Phaser.GameObjects.Image
	optionsButton: Phaser.GameObjects.Image

	constructor(scene: Phaser.Scene) {
		this.scene = scene
		const W = scene.cameras.main.width
		this.hpBarOuter = scene.add.image(200, 60, IMAGES.HP_BAR_OUTER).setDepth(5000)
		this.hpBarInner = scene.add.image(201,59, IMAGES.HP_BAR_INNER).setDepth(5001)

		this.optionsButton = scene.add.image(W - 50, 50, IMAGES.OPTIONS_BUTTON)
			.setTint(0xeeeeee)
			.setInteractive()
			.on("pointerover", () => {
				this.optionsButton.tint = 0xffffff
				playSound(SOUNDS.HOVER)
			})
			.on("pointerout", () => {
				this.optionsButton.tint = 0xeeeeee
			})
			.on("pointerdown", (pointer: Phaser.Input.Pointer,x: number,y: number, event: PointerEvent) => {
				event.stopPropagation()
				playSound(SOUNDS.CLICK)
				openOptions(this.scene.scene)
			})
	}

	update() {
		const LIFE = gamestate.health / 100
		this.hpBarInner.setCrop(0,0,LIFE * this.hpBarInner.width,this.hpBarInner.height)
	}

	destroy() {
		this.hpBarInner.destroy()
		this.hpBarOuter.destroy()
	}
}

import { playSound } from "../../utils/sound-manager"
import {SOUNDS} from "../../data/sounds";

export class Button {
	frame: Phaser.GameObjects.Image
	text: Phaser.GameObjects.Text

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		textContent: string,
		actionCallback: Function
	) {
		this.frame = scene.add.image(x, y, "button_frame")

		this.text = scene.add.text(x, y, textContent, {
			font: `48px Arial Black`,
			wordWrap: { width: this.frame.width },
			align: "center",
		})
		.setStroke("#000", 5)
		.setShadow(2, 2, "#333333", 2, true, true)
		.setOrigin(0.5)

		this.frame.setInteractive()
		this.frame.on("pointerover", () => {
			this.frame.setTexture("button_frame_hover")
			 playSound(SOUNDS.HOVER)
		})
		this.frame.on("pointerout", () => this.frame.setTexture("button_frame"))
		this.frame.on("pointerdown", () => {
			playSound(SOUNDS.CLICK)
			actionCallback()
		})

		this.frame.depth = 11000
		this.text.depth = 11001
	}

	setScale(scale: number){
		this.frame.scale = scale
		this.text.style.fontSize = `${scale*48}px`
		return this
	}

	destroy() {
		this.frame.destroy()
		this.text.destroy()
	}
}

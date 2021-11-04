import { Slider } from "./ui/slider"
import { Button } from "./ui/button"
import { OptionsScene} from "../scenes/options-scene"
import { updateVolumeOptions, volumeOptions } from "../utils/sound-manager"
import { addText} from "../utils/text-utils";
import { L } from "../data/labels"
import {IMAGES} from "../data/images";

export class OptionsMenu extends Phaser.GameObjects.Container {
	override scene: OptionsScene;

	constructor(scene: OptionsScene) {
		const { centerX, centerY } = scene.cameras.main
		super(scene, centerX, centerY)
		this.scene = scene
		scene.add.existing(this)
		this.draw()
	}

	draw() {
		this.depth = 10000
		this.add(this.scene.add.image(0, 0, IMAGES.OPTIONS_MENU_FRAME))

		const saveButton = new Button(this.scene,0,320, L.CLOSE, () => { this.scene.close() })
		saveButton.setScale(0.75)
		this.add(saveButton.frame)
		this.add(saveButton.text)

		let originX = 0
		let originY = -250

		this.addText( originX, originY + 75, L.OPTIONS_VOLUME, 360, 48, "center")

		const volumeSliders: [string, string][] = [
			["sfx", L.OPTIONS_SFX],
			["music", L.OPTIONS_MUSIC],
			["ambiance", L.OPTIONS_AMBIENCE],
		]

		volumeSliders.forEach(([key, label]: [string, string], i) => {
			this.addText(
				originX - 100,
				originY + 150 + 50 * i,
				label,
				280,
				36,
				"right"
			)
			let textValue = this.addText(
				originX + 100,
				originY + 150 + 50 * i,
				`${Math.round(volumeOptions[key] * 100)}%`,
				120,
				36,
				"left"
			)
			let volumeSlider = new Slider({
				scene: this.scene,
				x: originX - 76,
				y: originY + 144 + 50 * i,
				min: 0,
				max: 100,
				value: volumeOptions[key] * 100,
			})
			this.add(volumeSlider)
			volumeSlider.on("value", (val: number) => {
				textValue.text = `${Math.round(val)}%`
				updateVolumeOptions({ [key]: val / 100 })
			})
		})
	}

	addText(
		x: number,
		y: number,
		initialText = "",
		width: number,
		size: number = 48,
		align: string = "center"
	) {
		const text = addText(this.scene, x,y, initialText,{
			font: `${size}px Arial Black`,
			wordWrap: { width, useAdvancedWrap: true },
			align
		})
		text.setStroke("#000", 5)
		text.setShadow(2, 2, "#333333", 2, true, true)
		text.setOrigin(align === "left" ? 0 : align === "right" ? 1 : 0.5, 0.5)
		text.setDepth(10001)
		this.add(text)
		return text
	}
}

import { playSound } from "../../utils/sound-manager"
import {SOUNDS} from "../../data/sounds";
import {IMAGES} from "../../data/images";

export class Slider extends Phaser.GameObjects.Container {
	frame: Phaser.GameObjects.Image
	fill: Phaser.GameObjects.Image
	thumb: Phaser.GameObjects.Image
	value: number
	min: number
	max: number

	constructor(params: {
		scene: Phaser.Scene
		x: number
		y: number
		value?: number
		min?: number
		max?: number
		scale?: number
	}) {
		super(params.scene, params.x, params.y)
		this.min = params.min ?? 0
		this.max = params.max ?? 100
		this.value = Phaser.Math.Clamp(params.value ?? 50, this.min, this.max)
		this.frame = this.scene.add.image(0, 0, IMAGES.SLIDER_OUTER).setOrigin(0, 0)
		this.fill = this.scene.add.image(0, 0, IMAGES.SLIDER_INNER).setOrigin(0, 0)
		this.thumb = this.scene.add.image(this.frame.x + (this.value / this.max) * this.frame.width, 0, IMAGES.SLIDER_THUMB)

		this.frame.scale = params.scale ?? 1
		this.fill.scale = params.scale ?? 1
		this.thumb.scale = params.scale ?? 1
		this.add([this.frame, this.fill, this.thumb])

		this.fill.setInteractive()
		this.thumb.setInteractive()
		this.scene.input.setDraggable(this.thumb)

		this.fill.on("pointerdown", (pointer: Phaser.Input.Pointer, localX: number) => {
			playSound(SOUNDS.CLICK)
			this.updateX(localX)
		})

		this.thumb.on("dragstart", () => {
			playSound(SOUNDS.HOVER)
		})

		this.thumb.on("drag", (pointer: Phaser.Input.Pointer, dragX: number) => {
			this.updateX(dragX)
		})

		this.thumb.on("dragend", () => {
			playSound(SOUNDS.CLICK)
		})

		this.frame.depth = 11000
	}

	updateX(x: number) {
		this.thumb.x = Phaser.Math.Clamp(
			x,
			this.frame.x,
			this.frame.x + this.frame.width
		)
		this.fill.setCrop(0, 0, this.thumb.x, this.fill.height)
		this.value =
			this.min +
			((this.thumb.x - this.frame.x) / this.frame.width) *
				(this.max - this.min)
		this.emit("value", this.value)
	}
}

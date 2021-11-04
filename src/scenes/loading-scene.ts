import { addSounds } from "../utils/sound-manager"
import { L } from "../data/labels"
import { Button } from "../objects/ui/button"
import {addText} from "../utils/text-utils";
import {loadSounds} from "../data/sounds";
import {loadImages} from "../data/images";
import {loadSpritesheets} from "../data/spritesheets";

import GUI_BUTTON_FRAME from "/assets/gui/gui_button_frame.png"
import GUI_BUTTON_FRAME_HOVER from "/assets/gui/gui_button_frame_hover.png"

export class LoadingScene extends Phaser.Scene {
	constructor() {
		super({
			key: "LoadingScene",
		})
	}

	preload() {
		this.load.image("button_frame", GUI_BUTTON_FRAME);
		this.load.image("button_frame_hover", GUI_BUTTON_FRAME_HOVER)

		const { width: W, height: H } = this.cameras.main;
		const BAR_WIDTH = 300
		const loadingIndicator = this.add.container(W - BAR_WIDTH - 50,H - 80)
		const barOuter = this.add.rectangle(0,50, BAR_WIDTH, 10, 0x000000).setOrigin(0,0.5).setStrokeStyle(4, 0xffffff)
		const barInner = this.add.rectangle(0,50, 0, 10, 0xffffff).setOrigin(0,0.5)
		const loadingText = addText(this, -10,0, L.LOADING_INDICATOR, { align: "left" }).setOrigin(0,0)
		loadingIndicator.add(barOuter).add(barInner).add(loadingText)

		addText(this, 50,30, L.LOADING_TEXT,{ align: "left", fontSize: "28px", wordWrap: { width: 1850 } }).setOrigin(0,0)

		this.load.on("progress", (pc: number) => {
			loadingText.text = `${L.LOADING_INDICATOR} ${Math.round(pc * 100)}%`
			barInner.width = Math.round(BAR_WIDTH * pc)
		})

		this.load.on("complete", () => {
			addSounds(this)
			loadingIndicator.destroy()
			new Button(this, W - 270, H - 75, L.LOADING_COMPLETE as string,() => this.scene.start("MenuScene"))
		})

		loadImages(this)
		loadSpritesheets(this)
		loadSounds(this)

	}
}

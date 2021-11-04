import { addSounds,	playMusic, stopMusic } from "../utils/sound-manager"
import { L } from "../data/labels"
import { Button } from "../objects/ui/button"
import {SOUNDS} from "../data/sounds";
import pkg from "../../package.json"
import {addText} from "../utils/text-utils";
import {IMAGES} from "../data/images";
import {openOptions} from "./options-scene";

export class MenuScene extends Phaser.Scene {
	logoTitle!: Phaser.GameObjects.Image;
	playButton!: Button;
	optionsButton!: Button;
	creditsButton!: Button;

	constructor() {
		super({
			key: "MenuScene",
		})
	}

	create() {
		stopMusic()
		addSounds(this)
		playMusic(SOUNDS.MUSIC_MENU)

		const { centerX, centerY } = this.cameras.main
		this.add.image(centerX, centerY, IMAGES.BACKGROUND)
		this.events.on("resume", () => this.drawMenu())
		this.drawMenu()
	}

	drawMenu() {
		const { centerX, centerY } = this.cameras.main
		this.logoTitle = this.add.image(centerX, centerY - 200, IMAGES.LOGO)

		this.playButton = new Button(
			this,
			centerX,
			centerY + 150,
			L.MENU_NEW_GAME,
			() => {
				stopMusic()
				this.scene.start("MainScene")
			}
		)

		this.optionsButton = new Button(
			this,
			centerX,
			centerY + 300,
			L.OPTIONS,
			() => {
				this.eraseMenu()
				openOptions(this.scene)
			}
		)

		this.creditsButton = new Button(
			this,
			centerX,
			centerY + 450,
			L.MENU_CREDITS,
			() => {
				this.eraseMenu()
				this.drawCredits()
			}
		)

		addText(this, this.cameras.main.width - 130, 20, `v${pkg.version}`)
	}

	eraseMenu(){
		this.logoTitle.destroy()
		this.playButton.destroy()
		this.creditsButton.destroy()
		this.optionsButton.destroy()
	}

	drawCredits() {
		const { centerX, centerY } = this.cameras.main
		const creditsImage = this.add.image(centerX, centerY - 100, IMAGES.CREDITS)

		const backButton = new Button(
			this,
			centerX,
			centerY + 400,
			L.BACK_TO_MENU as string,
			() => {
				creditsImage.destroy()
				backButton.destroy()
				this.drawMenu()
			}
		)
	}
}

import { L } from "../data/labels"
import { Button } from "../objects/ui/button"
import {addText} from "../utils/text-utils";
import {IMAGES} from "../data/images";
import {gamestate} from "../data/gamestate";

export class GameOverScene extends Phaser.Scene {
	backButton!: Button;

	constructor() {
		super({
			key: "GameOverScene",
		})
	}

	create() {
		const { centerX, centerY } = this.cameras.main
		this.add.image(centerX, centerY, IMAGES.BACKGROUND)
		this.add.image(centerX, centerY - 200, IMAGES.GAMEOVER)

		addText(this, centerX, centerY - 80, L.SCORE.replace("$1", gamestate.score.toFixed(0)))

		this.backButton = new Button(
			this,
			centerX,
			centerY + 150,
			L.BACK_TO_MENU,
			() => {
				this.scene.start("MenuScene")
			}
		)
	}

}

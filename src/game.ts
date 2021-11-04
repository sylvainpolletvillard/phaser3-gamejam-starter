import "phaser"
import { GameScene } from "./scenes/game-scene"
import { LanguageScene } from "./scenes/language-scene"
import { LoadingScene } from "./scenes/loading-scene"
import { MenuScene } from "./scenes/menu-scene"
import { OptionsScene } from "./scenes/options-scene"
import {GameOverScene} from "./scenes/gameover-scene";
import {LANGUAGES} from "./data/labels";

const SCENES = [LoadingScene, GameScene, GameOverScene, MenuScene, OptionsScene]

const usei18n = Object.values(LANGUAGES).length > 1
if(usei18n)	SCENES.unshift(LanguageScene)

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
	width: 1920,
	height: 1080,
	type: Phaser.AUTO,
	backgroundColor: "black",
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	input: {
		gamepad: true,
	},
	parent: "game",
	scene: SCENES,
}

export class Game extends Phaser.Game {
	constructor(config: Phaser.Types.Core.GameConfig) {
		super(config)
	}
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
	// @ts-ignore
	globalThis.game = new Game(config)
})

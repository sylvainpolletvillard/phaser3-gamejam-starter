import { Player } from "../objects/player"
import { HUD } from "../objects/hud"
import { playMusic,	addSounds } from "../utils/sound-manager"
import { declareAllAnims } from "../utils/anim-utils"
import {SOUNDS} from "../data/sounds";
import {handleInputs, setupControls} from "../utils/input-utils";
import {IMAGES} from "../data/images";
import {Explosion} from "../objects/explosion";
import {randomInt} from "../utils/utils";
import {gamestate, resetGameState} from "../data/gamestate";


export class GameScene extends Phaser.Scene {
	background!: Phaser.GameObjects.Image;
	hud!: HUD
	player!: Player
	ignoreControls: boolean = false

	constructor() {
		super({
			key: "MainScene",
		})
	}

	preload() { }

	create() {
		// @ts-ignore
		globalThis.scene = this
		const { centerX, centerY, width, height } = this.cameras.main
		this.background = this.add.image(centerX, centerY, IMAGES.BACKGROUND)

		resetGameState()
		addSounds(this)
		playMusic(SOUNDS.MUSIC_GAME)
		declareAllAnims(this)
		setupControls(this)

		this.player = new Player(this, centerX, centerY + 150)
		this.hud = new HUD(this)

		this.time.addEvent({
			delay: 1000,
			loop: true,
			callback: () => {
				gamestate.score++;
				new Explosion(this, randomInt(width), randomInt(height))
			}
		})
	}

	update() {
		this.player.update()
		if (!this.ignoreControls) handleInputs(this)
		this.hud && this.hud.update()
	}

	handlePointerDown(pointer: Phaser.Input.Pointer) {
		if (this.ignoreControls) return
		let { x, y } = pointer.position

		x = Phaser.Math.Clamp(x, 0, this.cameras.main.width)
		y = Phaser.Math.Clamp(y, 400, this.cameras.main.height)

		this.player.moveTo(x, y)
	}

	onPressA(){}
	onPressB(){}
	onPressX(){}
	onPressY(){}

	handleDirection(vec: Phaser.Math.Vector2){
		this.player.moveVector = vec.scale(30)
	}
}

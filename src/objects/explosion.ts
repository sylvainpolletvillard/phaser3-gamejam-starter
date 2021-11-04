import { playSound } from "../utils/sound-manager"
import {SOUNDS} from "../data/sounds";
import {SPRITESHEETS} from "../data/spritesheets";
import {GameScene} from "../scenes/game-scene";
import { isSpriteInRange} from "../utils/sprite-utils";

export class Explosion extends Phaser.GameObjects.Sprite {
	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y, SPRITESHEETS.EXPLOSION, 0)
		this.scene.add.existing(this)
		this.depth = 4000
		this.anims.play(SPRITESHEETS.EXPLOSION)
		this.once("animationcomplete", () => this.destroy())
		playSound(SOUNDS.EXPLOSION)

		if(isSpriteInRange(new Phaser.Math.Vector2(x,y), scene.player, 500)){
			scene.player.hurt()
		}
	}
}

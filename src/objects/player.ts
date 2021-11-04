import {SPRITESHEETS} from "../data/spritesheets";
import {gamestate} from "../data/gamestate";
import {GameScene} from "../scenes/game-scene";

export class Player extends Phaser.GameObjects.Sprite {
	scene: GameScene;
	moveTarget: Phaser.Math.Vector2 | null
	moveVector!: Phaser.Math.Vector2
	isMoving: boolean = false
	inputDelay: number = 0
	canMove: boolean = true
	speed: number
	health: number;

	constructor(scene: GameScene, x: number, y: number) {
		super(scene, x, y, SPRITESHEETS.CAVEMAN, 0)
		this.scene = scene
		this.speed = 5
		this.anims.play(SPRITESHEETS.CAVEMAN+"_Idle")
		this.scene.add.existing(this)
		this.moveTarget = this.getBottomCenter()
		this.health = 100;
		this.canMove = true
	}

	update() {
		const moveVector = this.getMoveVector()
		const distance = moveVector.length()

		if (this.canMove && distance > 10) {
			if (!this.isMoving) {
				this.anims.play(SPRITESHEETS.CAVEMAN+"_Running")
				this.isMoving = true
			}
			this.x += (this.speed * moveVector.x) / distance
			this.y += (this.speed * moveVector.y) / distance
			this.x = Phaser.Math.Clamp(
				this.x,
				50,
				this.scene.cameras.main.width - 50
			)
			this.y = Phaser.Math.Clamp(
				this.y,
				370,
				this.scene.cameras.main.height - 50
			)
			this.flipX = moveVector.x < 0
		} else if (this.isMoving && this.inputDelay === 0) {
			// reached destination
			this.anims.play(SPRITESHEETS.CAVEMAN+"_Idle")
			this.isMoving = false
		}

		this.depth = this.y + 15

		if (this.inputDelay > 0) {
			this.inputDelay--
		}
	}

	moveTo(x: number, y: number) {
		x = Phaser.Math.Clamp(x, 40, this.scene.cameras.main.width - 50)
		y = Phaser.Math.Clamp(y, 430, this.scene.cameras.main.height - 10)
		this.moveTarget = new Phaser.Math.Vector2(x, y + 65)
	}

	stopMoving() {
		this.isMoving = false
		this.moveVector = new Phaser.Math.Vector2(0, 0)
		this.moveTarget = this.getBottomCenter()
	}

	getMoveVector(): Phaser.Math.Vector2 {
		if (this.moveVector && this.moveVector.length() > 10) {
			this.moveTarget = null
			return this.moveVector
		} else if (this.moveTarget) {
			return this.moveTarget.clone().subtract(this.getBottomCenter())
		} else {
			return new Phaser.Math.Vector2(0, 0)
		}
	}

	hurt(){
		gamestate.health -= 10;
		if(gamestate.health <= 0) this.scene.scene.start("GameOverScene")
		this.scene.hud.update()
	}
}

import { OptionsMenu } from "../objects/options-menu"

let previousScene: string | null;

export class OptionsScene extends Phaser.Scene {
	menu!: OptionsMenu

	constructor() {
		super({
			key: "OptionsScene",
		})
	}

	create() {
		this.menu = new OptionsMenu(this)
	}

	close(){
		this.menu.destroy()
		if(previousScene){
			this.scene.manager.resume(previousScene)
			previousScene = null
		}
	}
}

export function openOptions(scene: Phaser.Scenes.ScenePlugin) {
	previousScene = scene.key;
	scene.manager.pause(scene.key)
	scene.manager.start("OptionsScene")
}

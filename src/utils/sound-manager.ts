import { pickRandomIn } from "./utils"
import {SOUNDS} from "../data/sounds";

export const volumeOptions = Object.assign(
	{
		sfx: 0.8,
		music: 1,
		ambiance: 0.75,
	},
	JSON.parse(localStorage.getItem("volumeOptions") ?? "{}")
)

export const updateVolumeOptions = (newParams: Object) => {
	Object.assign(volumeOptions, newParams)
	localStorage.setItem("volumeOptions", JSON.stringify(volumeOptions))
	if (soundManager.music && "music" in newParams) {
		playMusic([soundManager.music])
	}
	if (soundManager.ambiance && "ambiance" in newParams) {
		playAmbiance([soundManager.ambiance])
	}
}

export const soundManager: {
	music?: string
	ambiance?: string
	scene?: Phaser.Scene
	soundsAdded: { [key: string]: Phaser.Sound.BaseSound }
} = { soundsAdded: {} }

export function playSound(
	variations: string[],
	params?: Phaser.Types.Sound.SoundConfig
) {
	params = { volume: volumeOptions.sfx, ...params }
	const soundName = pickRandomIn(variations)
	if (soundName in soundManager.soundsAdded) {
		soundManager.soundsAdded[soundName].play(params)
	}
}

export function stopSound(key: string){
	if(key in soundManager.soundsAdded){
		soundManager.soundsAdded[key].stop()
	}
}

export function playMusic(variations: string[]) {
	stopMusic()
	soundManager.music = pickRandomIn(variations)
	soundManager.soundsAdded[soundManager.music!].play({
		loop: true,
		volume: volumeOptions.music
	})
}

export function stopMusic(){
	soundManager.music && stopSound(soundManager.music)
}

export function playAmbiance(variations: string[]) {
	if (soundManager.ambiance) {
		soundManager.soundsAdded[soundManager.ambiance].stop()
	}
	soundManager.ambiance = pickRandomIn(variations)
	soundManager.soundsAdded[soundManager.ambiance!].play({
		loop: true,
		volume: volumeOptions.ambiance,
	})
}

export function addSounds(scene: Phaser.Scene) {
	soundManager.scene = scene
	scene.sound.pauseOnBlur = true
	Object.values(SOUNDS).forEach((urls: string[]) => {
		urls.forEach(url => {
			soundManager.soundsAdded[url] = scene.sound.add(url)
		})
	})
}
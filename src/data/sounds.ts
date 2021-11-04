import MUSIC_MENU from "/assets/sound/musique_menu.mp3";
import MUSIC_GAME from "/assets/sound/musique_jeu.mp3";
import SOUND_VICTORY from "/assets/sound/son_victoire.mp3";
import SOUND_DEFEAT from "/assets/sound/son_gameover.mp3";
import SOUND_UI_CLICK from "/assets/sound/son_interface_clique.mp3";
import SOUND_UI_HOVER from "/assets/sound/son_interface_survol.mp3";
import SOUND_EXPLOSION_1 from "/assets/sound/son_petard_explose-001.mp3";
import SOUND_EXPLOSION_2 from "/assets/sound/son_petard_explose-002.mp3";
import SOUND_EXPLOSION_3 from "/assets/sound/son_petard_explose-003.mp3";
import SOUND_EXPLOSION_4 from "/assets/sound/son_petard_explose-004.mp3";
import SOUND_EXPLOSION_5 from "/assets/sound/son_petard_explose-005.mp3";
import SOUND_EXPLOSION_6 from "/assets/sound/son_petard_explose-006.mp3";

export const SOUNDS: { [key: string]: string[] } = {
    MUSIC_MENU: [MUSIC_MENU],
    MUSIC_GAME:[MUSIC_GAME],
    VICTORY: [SOUND_VICTORY],
    DEFEAT: [SOUND_DEFEAT],
    CLICK: [SOUND_UI_CLICK],
    HOVER: [SOUND_UI_HOVER],
    EXPLOSION: [SOUND_EXPLOSION_1, SOUND_EXPLOSION_2, SOUND_EXPLOSION_3, SOUND_EXPLOSION_4, SOUND_EXPLOSION_5, SOUND_EXPLOSION_6]
}

export function loadSounds(scene: Phaser.Scene){
    Object.values(SOUNDS).forEach((urls) => {
        urls.forEach(url => scene.load.audio(url, [url]))
    })
}

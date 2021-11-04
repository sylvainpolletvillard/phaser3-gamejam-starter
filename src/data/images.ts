import BACKGROUND from "/assets/images/background.png"
import LOGO from "/assets/images/logo.png"
import CREDITS from "/assets/images/credits.png"
import GAMEOVER from "/assets/images/gameover.png"
import HP_BAR_OUTER from "/assets/gui/gui_hp_bar_frame.png"
import HP_BAR_INNER from "/assets/gui/gui_hp_bar_fill.png"
import OPTIONS_BUTTON from "/assets/gui/gui_option.png"
import OPTIONS_MENU_FRAME from "/assets/gui/options_frame.png"
import SLIDER_INNER from "/assets/gui/slider_fill.png"
import SLIDER_OUTER from "/assets/gui/slider_frame.png"
import SLIDER_THUMB from "/assets/gui/slider_thumb.png"

export const IMAGES = {
    BACKGROUND,
    LOGO,
    CREDITS,
    GAMEOVER,
    HP_BAR_INNER,
    HP_BAR_OUTER,
    OPTIONS_BUTTON,
    OPTIONS_MENU_FRAME,
    SLIDER_OUTER,
    SLIDER_INNER,
    SLIDER_THUMB
}

export function loadImages(scene: Phaser.Scene){
    Object.values(IMAGES).forEach(url => scene.load.image(url, url))
}
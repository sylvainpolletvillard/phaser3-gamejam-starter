import Phaser from "phaser"
import { Button } from "../objects/ui/button"
import {LANGUAGES} from "../data/labels";

import GUI_BUTTON_FRAME from "/assets/gui/gui_button_frame.png"
import GUI_BUTTON_FRAME_HOVER from "/assets/gui/gui_button_frame_hover.png"
import {addText} from "../utils/text-utils";

export class LanguageScene extends Phaser.Scene {
    constructor() {
        super({ key: "LanguageScene" })
    }

    preload() {                
        this.load.image("button_frame", GUI_BUTTON_FRAME);
        this.load.image("button_frame_hover", GUI_BUTTON_FRAME_HOVER)
    }

    create() {
        if(localStorage.getItem("language") != null){
            return this.scene.start("LoadingScene")
        }

        const { centerX, centerY } = this.cameras.main
        addText(this, centerX,centerY - 100, "Language / Langue",{ align: "center" })

        Object.entries(LANGUAGES).forEach(([ref, label], i) => {
            new Button(
                this,
                centerX + (i-0.5)*500,
                centerY + 100,
                label,
                () => {
                    localStorage.setItem("language", ref)
                    this.scene.start("LoadingScene")
                }
            )
        })
    }
}
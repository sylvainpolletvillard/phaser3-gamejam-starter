const DEFAULT_TEXT_PARAMS = {
    align: "left",
    color: "white",
    fontSize: "32px",
    fontFamily: 'Arial Black',
    stroke: "black",
    strokeThickness: 5,
    shadow: {
        offsetX: 2,
        offsetY: 2,
        color: '#333333',
        blur: 2,
        stroke: true,
        fill: true
    }
}

export function addText(scene: Phaser.Scene, x: number, y:number, text: string | string[], params: object = {}){
    return scene.add.text(x, y, text, { ...DEFAULT_TEXT_PARAMS, ...params })
        .setScrollFactor(0)
        .setOrigin(0.5, 0.5)
}
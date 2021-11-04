import {GameScene} from "../scenes/game-scene";

export enum KEY { UP="UP", DOWN="DOWN", LEFT="LEFT", RIGHT="RIGHT", ACTION1="ACTION1", ACTION2="ACTION2", ACTION3="ACTION3", ACTION4="ACTION4" }

export const KEYS_MAPPING: { [key in KEY]: number[] } = {
    [KEY.UP]: [Phaser.Input.Keyboard.KeyCodes.UP],
    [KEY.DOWN]: [Phaser.Input.Keyboard.KeyCodes.DOWN],
    [KEY.LEFT]: [Phaser.Input.Keyboard.KeyCodes.LEFT],
    [KEY.RIGHT]: [Phaser.Input.Keyboard.KeyCodes.RIGHT],
    [KEY.ACTION1]: [Phaser.Input.Keyboard.KeyCodes.ONE,  Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE],
    [KEY.ACTION2]: [Phaser.Input.Keyboard.KeyCodes.TWO,  Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO],
    [KEY.ACTION3]: [Phaser.Input.Keyboard.KeyCodes.THREE,  Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE],
    [KEY.ACTION4]: [Phaser.Input.Keyboard.KeyCodes.FOUR,  Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR],
}

const KEYS: { [key in KEY]: Phaser.Input.Keyboard.Key[] } = {
    [KEY.UP]: [],
    [KEY.DOWN]: [],
    [KEY.LEFT]: [],
    [KEY.RIGHT]: [],
    [KEY.ACTION1]: [],
    [KEY.ACTION2]: [],
    [KEY.ACTION3]: [],
    [KEY.ACTION4]: [],
}

export function setupControls(scene: GameScene){
    scene.input.on("pointerdown", scene.handlePointerDown, scene)

    Object.entries(KEYS_MAPPING).forEach(([ref, keys]) => {
        KEYS[ref as KEY] = keys.map(key => scene.input.keyboard.addKey(key))
    })
}

export function handleInputs(scene: GameScene) {
    let pad = scene.input.gamepad.getPad(0),
        usesGamepad = pad && pad.axes.length,
        direction;

    if (usesGamepad) {
        direction = new Phaser.Math.Vector2(pad.axes[0].getValue(), pad.axes[1].getValue())
    } else {
        const goUp = KEYS[KEY.UP].some((key) => key.isDown)
        const goLeft = KEYS[KEY.LEFT].some((key) => key.isDown)
        const goRight = KEYS[KEY.RIGHT].some((key) => key.isDown)
        const goDown = KEYS[KEY.DOWN].some((key) => key.isDown)
        direction = new Phaser.Math.Vector2(goLeft ? -1 : goRight ? +1 : 0, goUp ? -1 : goDown ? +1 : 0)
    }

    scene.handleDirection(direction)

    if (KEYS["ACTION1"].some(key => Phaser.Input.Keyboard.JustDown(key)) || (pad && pad.A)) {
        scene.onPressA()
    }
    if (KEYS["ACTION2"].some(key => Phaser.Input.Keyboard.JustDown(key)) || (pad && pad.B)) {
        scene.onPressB()
    }
    if (KEYS["ACTION3"].some(key => Phaser.Input.Keyboard.JustDown(key)) || (pad && pad.X)) {
        scene.onPressX()
    }
    if (KEYS["ACTION4"].some(key => Phaser.Input.Keyboard.JustDown(key)) || (pad && pad.Y)) {
        scene.onPressY()
    }
}
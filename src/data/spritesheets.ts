export const SPRITESHEETS = {
    EXPLOSION: "/assets/sprites/explosion.json",
    CAVEMAN: "/assets/sprites/caveman.json"
}

export function loadSpritesheets(scene: Phaser.Scene){
    Object.values(SPRITESHEETS).forEach(url => scene.load.multiatlas(url, url, "/assets/sprites"))

}
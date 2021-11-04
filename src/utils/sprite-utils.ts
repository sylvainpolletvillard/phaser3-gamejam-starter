export function findNearestSprite(
	position: Phaser.Math.Vector2,
	sprites: Phaser.GameObjects.Sprite[],
	minDistance: number = 1500
) {
	let nearest = null
	for (let sprite of sprites) {
		let distance = sprite.getCenter().distance(position)
		if (distance < minDistance) {
			nearest = sprite
			minDistance = distance
		}
	}
	return nearest
}

export function findSpritesInRange(
	position: Phaser.Math.Vector2,
	sprites: Phaser.GameObjects.Sprite[],
	maxDistance: number = 1500
) {
	return sprites.filter((sprite) => isSpriteInRange(position, sprite, maxDistance))
}

export function isSpriteInRange(
	position: Phaser.Math.Vector2,
	sprite: Phaser.GameObjects.Sprite,
	maxDistance: number = 1500
){
	return sprite.getCenter().distance(position) <= maxDistance
}
export function randomInt(start: number, end?: number){
	if(end === undefined){
		end = start;
		start = 0;
	}
	return Math.floor((end-start)*Math.random() + start)
}

export function range(start: number, end: number) {
	return Array(end - start)
		.fill(0)
		.map((_, i) => start + i)
}

export function removeInArray(array: Array<any>, elem: any) {
	return array.splice(array.indexOf(elem), 1)
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
export function shuffleArray(array: any[]) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1))
		let temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}
}

export function pickRandomIn(array: any[]) {
	return array[array.length === 1 ? 0 : Math.floor(Math.random() * array.length)]
}

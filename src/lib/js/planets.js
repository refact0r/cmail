export function scaleDiam(diameter) {
	const ratio = diameter / 4879;
	const log = Math.log2(ratio + 4);
	return log * 5;
}

export function scaleDist(distance) {
	const ratio = distance / 57.9;
	const log = Math.log2(ratio + 1);
	return log * 70;
}
export function coords(planet, hor) {
	const radians = Math.atan2(hor.y, hor.x);
	const x = scaleDist(planet.distance) * Math.cos(radians + Math.PI) + 500;
	const y = scaleDist(planet.distance) * Math.sin(radians + Math.PI) + 500;
	return { displayX: x, displayY: y };
}

export function dist(hor1, hor2) {
	const a = Math.pow(hor2.x - hor1.x, 2);
	const b = Math.pow(hor2.y - hor1.y, 2);
	const c = Math.pow(hor2.z - hor1.z, 2);
	return Math.sqrt(a + b + c);
}

export function sunDist(hor) {
	const a = Math.pow(hor.x, 2);
	const b = Math.pow(hor.y, 2);
	const c = Math.pow(hor.z, 2);
	return Math.sqrt(a + b + c);
}

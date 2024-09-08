export function scaleDiam(diameter) {
	const ratio = diameter / 4879;
	const log = Math.log2(ratio + 4);
	return log * 4;
}

export function scaleDist(distance) {
	const ratio = distance / 57.9;
	const log = Math.log2(ratio + 1);
	return log * 70;
}

export function getCoords(planet) {
	const diff = new Date().getTime() - new Date(2000, 0, 1);
	const period = planet.period * 24 * 60 * 60 * 1000;
	const degrees = ((diff % period) / period) * 360 + planet.startDegrees;
	const radians = (degrees * Math.PI) / 180;
	const x = scaleDist(planet.distance) * Math.cos(radians + Math.PI) + 500;
	const y = scaleDist(planet.distance) * Math.sin(radians + Math.PI) + 500;
	return { x, y };
}

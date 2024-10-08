import { formatCSVDate } from '$lib/js/utils.js';

export function scaleDiam(diameter) {
	const ratio = diameter / 4879;
	const log = Math.log2(ratio + 5);
	return log * 5;
}

export function scaleDist(distance) {
	const ratio = distance / 57.9; //
	const log = Math.log2(ratio + 1);
	return log * 70;
}
export function coords(planet) {
	const radians = Math.atan2(planet.y, planet.x);
	const x = scaleDist(planet.distance) * Math.cos(radians + Math.PI) + 500;
	const y = scaleDist(planet.distance) * Math.sin(radians + Math.PI) + 500;
	return { displayX: x, displayY: y };
}

export function dist(planet1, planet2) {
	const a = Math.pow(planet2.x - planet1.x, 2);
	const b = Math.pow(planet2.y - planet1.y, 2);
	const c = Math.pow(planet2.z - planet1.z, 2);
	return Math.sqrt(a + b + c);
}

export function sunDist(planet) {
	const a = Math.pow(planet.x, 2);
	const b = Math.pow(planet.y, 2);
	const c = Math.pow(planet.z, 2);
	return Math.sqrt(a + b + c);
}

export function convertPlanet(planet, date) {
	let hor = {};
	const today = formatCSVDate(date);
	for (const row of planet.full) {
		if (row.calendar.includes(today)) {
			hor = row;
			break;
		}
	}
	return { ...planet, ...hor };
}

export function msgCoord(message, planet, currDisplay) {
	const frac =
		(new Date() - new Date(message.created_at)) /
		(new Date(message.arrives_at) - new Date(message.created_at));
	// total distance: pythagorean theorem
	const totalDist = Math.sqrt(
		Math.pow(currDisplay.displayX - planet.displayX, 2) +
			Math.pow(currDisplay.displayY - planet.displayY, 2)
	);
	// distance traveled: total distance * fraction of message traveled
	const dist = totalDist * frac;
	const rad = Math.atan2(
		planet.displayY - currDisplay.displayY,
		planet.displayX - currDisplay.displayX
	);
	const x = currDisplay.displayX + dist * Math.cos(rad);
	const y = currDisplay.displayY + dist * Math.sin(rad);
	return { displayX: x, displayY: y };
}

import { loadCSV } from '$lib/js/loadCSV.js';
import planetData from '$lib/data/planetData.js';
import { dev } from '$app/environment';
import { formatCSVDate } from '$lib/js/utils.js';

let csvData = null;

export async function handle({ event, resolve }) {
	if (!csvData || dev) {
		console.log('Loading CSV files...');
		csvData = await loadCSV();
		console.log('CSV files loaded.');
	}

	let horizons = {};
	for (const [key, value] of Object.entries(csvData)) {
		const today = formatCSVDate(new Date());
		for (const row of value) {
			if (row.calendar.includes(today)) {
				horizons[key] = row;
				break;
			}
		}
	}

	let finalData = {};
	for (const [index, planet] of planetData.entries()) {
		finalData[planet.name] = {
			index,
			...planet,
			...horizons[planet.name]
		};
	}

	event.locals.planets = finalData;

	const response = await resolve(event);
	return response;
}

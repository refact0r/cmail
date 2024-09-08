import { loadCSV } from '$lib/js/loadCSV.js';
import planetData from '$lib/data/planetData.js';
import { dev } from '$app/environment';
import { supabase } from '$lib/js/supabaseClient';

let csvData = null;

export async function handle({ event, resolve }) {
	if (!csvData || dev) {
		console.log('Loading CSV files...');
		csvData = await loadCSV();
		console.log('CSV files loaded.');
	}

	let finalData = {};
	for (const [index, planet] of planetData.entries()) {
		finalData[planet.name] = {
			index,
			...planet,
			full: csvData[planet.name]
		};
	}

	event.locals.planets = finalData;

	const { data } = await supabase.from('messages').select('*');
	event.locals.messages = data ?? [];

	const response = await resolve(event);
	return response;
}

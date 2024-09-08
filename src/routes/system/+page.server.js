import { error } from '@sveltejs/kit';

const modules = import.meta.glob('$lib/data/horizons/*.csv', { eager: true });

function formatDate(date) {
	const year = date.getFullYear();
	const month = date.toLocaleString('default', { month: 'short' });
	const day = date.getDate().toString().padStart(2, '0');

	return `${year}-${month}-${day}`;
}

export async function load() {
	let data = {};

	try {
		for (const [path, content] of Object.entries(modules)) {
			const filename = path.split('/').pop().replace('.csv', '');

			const today = formatDate(new Date());
			for (const row of content.default) {
				if (row.calendar.includes(today)) {
					data[filename] = row;
					break;
				}
			}
		}

		return {
			horizons: data
		};
	} catch (e) {
		console.error('Error processing CSV files:', e);
		error(404, {
			message: 'Error processing CSV files'
		});
	}
}

const modules = import.meta.glob('$lib/data/horizons/*.csv', { eager: true });

export async function loadCSV() {
	let data = {};

	try {
		for (const [path, content] of Object.entries(modules)) {
			const filename = path.split('/').pop().replace('.csv', '');
			data[filename] = content.default;
		}

		return data;
	} catch (e) {
		console.error('Error processing CSV files:', e);
	}
}

export async function load({ locals }) {
	return {
		planets: locals.planets,
		messages: locals.messages
	};
}

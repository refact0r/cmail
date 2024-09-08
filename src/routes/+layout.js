export async function load({ url, data }) {
	const { pathname } = url;

	return {
		...data,
		pathname
	};
}

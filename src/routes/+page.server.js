export async function load({ fetch }) {
	const result = await fetch('/api/bodies');
    const data = await result.json();
    console.log(data);

	return {};
}

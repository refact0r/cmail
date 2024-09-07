const astronomyId = '4f1185cc-61df-483e-8eb4-3c04e188e7f5';
const astronomySecret =
	'add8ddf8e8f5d4061ee35652f3534682bc20c053643a7ca2ebbf66929dfd6a630ec0a1d2e10b308011c6bbf2b3e0a9f641ca6ae472bc7fc86b55cafa7cc8bab44a73075a822884432a53bcbf27187b58dd7374f8e1a37a6e17c62c3a0ec8e5908f5b21cfa06faab009c0ac4f494ecee5';
const authString = btoa(`${astronomyId}:${astronomySecret}`);

const latitude = 0;
const longitude = 0;
const elevation = 1;

export async function GET({ fetch }) {
	const date = new Date().toLocaleDateString('en-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});
	const time = new Date().toLocaleTimeString([], {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false
	});
	const response = await fetch(
		`https://api.astronomyapi.com/api/v2/bodies/positions?latitude=${latitude}&longitude=${longitude}&elevation=${elevation}&from_date=${date}&to_date=${date}&time=${time}&output=rows`,
		{
			headers: {
				Authorization: `Basic ${authString}`
			}
		}
	);
	const data = await response.json();

    let bodies = {};
    for (const body of data.data.rows) {
        bodies[body.positions[0].id] = body.positions[0].distance.fromEarth.km
    }
    //console.log(bodies)

	return new Response(JSON.stringify(bodies));
}

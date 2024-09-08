export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatAU(km) {
	return (km / 149597870.69).toFixed(2);
}

export function formatSecs(s) {
	console.log(s);
	// const days = Math.floor(seconds / 86400);
	const hrs = Math.floor(s / 3600);
	const mins = Math.floor((s % 3600) / 60);
	const secs = Math.floor(s % 60);

	return `${hrs}h ${mins}m ${secs}s`;
}

export function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatAU(km) {
	return (km / 149597870.69).toFixed(2);
}

export function formatSecs(s) {
	// const days = Math.floor(seconds / 86400);
	const hrs = Math.floor(s / 3600);
	const mins = Math.floor((s % 3600) / 60);
	const secs = Math.floor(s % 60);

	return `${hrs}h ${mins}m ${secs}s`;
}

export function formatCSVDate(date) {
	const year = date.getFullYear();
	const month = date.toLocaleString('default', { month: 'short' });
	const day = date.getDate().toString().padStart(2, '0');

	return `${year}-${month}-${day}`;
}

export function formatDate(datetime) {
	const d = new Date(datetime);
	const date = d.toLocaleString('default', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	});

	return date;
}

export function formatTime(datetime) {
	const d = new Date(datetime);
	const time = d.toLocaleTimeString('default', {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		hour12: false
	});

	return time;
}

export function outgoingProgressIndicator(created_at, arrives_at) {
    return  (new Date() - new Date(created_at))/(new Date(arrives_at) - new Date(created_at));
}
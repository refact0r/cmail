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

export function formatDate(datetime, type = 'numeric') {
	const d = new Date(datetime);
	const date = d.toLocaleString('default', {
		year: 'numeric',
		month: type,
		day: type
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
	return (new Date() - new Date(created_at)) / (new Date(arrives_at) - new Date(created_at));
}

export function hexToHSL(H) {
	let r = 0,
		g = 0,
		b = 0;
	if (H.length == 7) {
		r = parseInt(H.substring(1, 3), 16);
		g = parseInt(H.substring(3, 5), 16);
		b = parseInt(H.substring(5, 7), 16);
	}
	// Then to HSL
	r /= 255;
	g /= 255;
	b /= 255;
	let cmin = Math.min(r, g, b),
		cmax = Math.max(r, g, b),
		delta = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;

	if (delta == 0) h = 0;
	else if (cmax == r) h = ((g - b) / delta) % 6;
	else if (cmax == g) h = (b - r) / delta + 2;
	else h = (r - g) / delta + 4;

	h = Math.round(h * 60);

	if (h < 0) h += 360;

	l = (cmax + cmin) / 2;
	s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
	s = +(s * 100).toFixed(1);
	l = +(l * 100).toFixed(1);
	console.log('H: ' + h + ', S: ' + s + ', L: ' + l);
	return [h, s, l];
}

export function darken(h, s, l, amt) {
	console.log(h + ', ' + s + ', ' + (l - amt));
	return 'hsl(' + h + ', ' + s + '%, ' + (l - amt) + '%)';
}

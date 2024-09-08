import { supabase } from '$lib/js/supabaseClient';

export const actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const profile = data.get('profile');
		const destination = data.get('destination');
		const message = data.get('message');
		const created = new Date();
		const arrives = new Date();
		arrives.setSeconds(created.getSeconds() + parseInt(data.get('delay')));

		const { error } = await supabase.from('messages').insert({
			created_at: created.toISOString(),
			arrives_at: arrives.toISOString(),
			from: profile,
			to: destination,
			content: message
		});
	}
};

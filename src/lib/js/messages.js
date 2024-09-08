export function filterMessages(messages, profile, messagesRead, n = 0) {
	let newMessages = messages
		.filter((message) => message.to === profile)
		.filter((message) => !messagesRead.includes(message.id))
		.filter((message) => new Date(message.arrives_at) < new Date())
		.sort((a, b) => b.created_at - a.created_at)
		.map((message) => {
			return {
				...message,
				read: false
			};
		});
	let oldMessages = messages
		.filter((message) => message.to !== profile)
		.filter((message) => messagesRead.includes(message.id))
		.filter((message) => new Date(message.arrives_at) < new Date())
		.sort((a, b) => b.created_at - a.created_at)

		.map((message) => {
			return {
				...message,
				read: true
			};
		});
	if (n > 0) {
		newMessages = newMessages.splice(0, n);
		oldMessages = oldMessages.splice(0, n - newMessages.length);
	}
	return [...newMessages, ...oldMessages];
}

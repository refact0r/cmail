export function filterMessages(messages, profile, messagesRead) {
	const newMessages = messages
		.filter((message) => message.to === profile)
		.filter((message) => !messagesRead.includes(message.id))
		.sort((a, b) => b.created_at - a.created_at)
		.splice(0, 6)
		.map((message) => {
			return {
				...message,
				read: false
			};
		});
	const oldMessages = messages
		.filter((message) => message.to !== profile)
		.filter((message) => messagesRead.includes(message.id))
		.sort((a, b) => b.created_at - a.created_at)
		.splice(0, 6 - newMessages.length)
		.map((message) => {
			return {
				...message,
				read: true
			};
		});
	return [...newMessages, ...oldMessages];
}

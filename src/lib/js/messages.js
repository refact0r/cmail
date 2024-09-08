export function filterMessages(messages, profile, messagesRead, n = null) {
	return messages
		.filter((message) => message.to === profile)
		.filter((message) => new Date(message.arrives_at) < new Date())
		.sort((a, b) => b.created_at - a.created_at)
		.splice(0, n ?? 10000);
}

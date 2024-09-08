import { persisted } from 'svelte-persisted-store';

export const defaultProfile = [];

export const messagesRead = persisted('messagesRead', defaultProfile);

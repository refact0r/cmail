import {persisted} from 'svelte-persisted-store';

export const defaultProfile = 'earth';

export const profile = persisted('profile', defaultProfile);

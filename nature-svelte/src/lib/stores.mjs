import { writable } from "svelte/store";

export const identifications = writable({ results: [], total_results: -1 });

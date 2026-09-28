import { PUBLIC_API_BASE_URL } from '$env/static/public';

type Fetch = typeof fetch;

/**
 * Calls the logivity-api backend and parses the JSON response.
 * Pass SvelteKit's `fetch` from a load function so requests work during SSR.
 */
export async function apiGet<T>(fetchFn: Fetch, path: string): Promise<T> {
	const url = new URL(path, PUBLIC_API_BASE_URL);
	const response = await fetchFn(url, { headers: { Accept: 'application/json' } });

	if (!response.ok) {
		throw new Error(`GET ${url} failed with ${response.status} ${response.statusText}`);
	}

	return (await response.json()) as T;
}

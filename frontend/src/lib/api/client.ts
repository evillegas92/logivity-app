import { PUBLIC_API_BASE_URL } from '$env/static/public';

type Fetch = typeof fetch;

/** ASP.NET Core's validation error body (`ValidationProblemDetails`). */
export interface ValidationProblem {
	title?: string;
	status?: number;
	errors?: Record<string, string[]>;
}

/** Thrown when the API answers with a non-2xx status. */
export class ApiError extends Error {
	constructor(
		readonly status: number,
		readonly problem: ValidationProblem | null,
		message: string
	) {
		super(message);
	}
}

async function request<T>(fetchFn: Fetch, method: string, path: string, body?: unknown): Promise<T> {
	const url = new URL(path, PUBLIC_API_BASE_URL);
	const response = await fetchFn(url, {
		method,
		headers: {
			Accept: 'application/json',
			...(body === undefined ? {} : { 'Content-Type': 'application/json' })
		},
		body: body === undefined ? undefined : JSON.stringify(body)
	});

	if (!response.ok) {
		const problem = (await response.json().catch(() => null)) as ValidationProblem | null;
		throw new ApiError(
			response.status,
			problem,
			`${method} ${url} failed with ${response.status} ${response.statusText}`
		);
	}

	return (await response.json()) as T;
}

/**
 * Calls the logivity-api backend and parses the JSON response.
 * Pass SvelteKit's `fetch` from a load function or form action so requests work during SSR.
 */
export function apiGet<T>(fetchFn: Fetch, path: string): Promise<T> {
	return request<T>(fetchFn, 'GET', path);
}

export function apiPost<T>(fetchFn: Fetch, path: string, body: unknown): Promise<T> {
	return request<T>(fetchFn, 'POST', path, body);
}

/**
 * Turns a validation error body into messages keyed by camelCase field name:
 * both `{ Origin: [...] }` and `{ "$.origin": [...] }` become `{ origin: [...] }`.
 */
export function fieldErrors(problem: ValidationProblem | null): Record<string, string[]> {
	const result: Record<string, string[]> = {};
	for (const [key, messages] of Object.entries(problem?.errors ?? {})) {
		const field = key.replace(/^\$\./, '');
		result[field.charAt(0).toLowerCase() + field.slice(1)] = messages;
	}
	return result;
}

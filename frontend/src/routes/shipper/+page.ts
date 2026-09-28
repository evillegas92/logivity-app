import { error } from '@sveltejs/kit';
import { getShipments } from '$lib/api/shipments';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		return { shipments: await getShipments(fetch) };
	} catch (e) {
		console.error(e);
		error(502, 'Could not load shipments from the API.');
	}
};

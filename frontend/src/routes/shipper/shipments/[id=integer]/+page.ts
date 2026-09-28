import { error } from '@sveltejs/kit';
import { ApiError } from '$lib/api/client';
import { getBids } from '$lib/api/bids';
import { getShipment } from '$lib/api/shipments';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const id = Number(params.id);
	try {
		const [shipment, bids] = await Promise.all([getShipment(fetch, id), getBids(fetch, id)]);
		return { shipment, bids };
	} catch (e) {
		if (e instanceof ApiError && e.status === 404) {
			error(404, 'Shipment not found.');
		}
		console.error(e);
		error(502, 'Could not load the shipment from the API.');
	}
};

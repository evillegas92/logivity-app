import { error, fail } from '@sveltejs/kit';
import { ApiError, fieldErrors } from '$lib/api/client';
import { createBid } from '$lib/api/bids';
import { getShipment } from '$lib/api/shipments';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	try {
		return { shipment: await getShipment(fetch, Number(params.id)) };
	} catch (e) {
		if (e instanceof ApiError && e.status === 404) {
			error(404, 'Shipment not found.');
		}
		console.error(e);
		error(502, 'Could not load the shipment from the API.');
	}
};

export const actions = {
	default: async ({ request, fetch, params }) => {
		const data = await request.formData();
		const values = {
			carrierName: String(data.get('carrierName') ?? ''),
			price: String(data.get('price') ?? ''),
			note: String(data.get('note') ?? '')
		};

		try {
			const bid = await createBid(fetch, Number(params.id), {
				carrierName: values.carrierName,
				price: values.price.trim() === '' ? null : Number(values.price),
				note: values.note.trim() === '' ? null : values.note
			});
			return { bid };
		} catch (e) {
			if (e instanceof ApiError) {
				if (e.status === 400) {
					return fail(400, { values, errors: fieldErrors(e.problem) });
				}
				if (e.status === 404) {
					return fail(404, { values, message: 'This shipment no longer exists.' });
				}
				if (e.status === 409) {
					return fail(409, { values, message: 'This shipment is no longer accepting bids.' });
				}
			}
			console.error(e);
			return fail(502, { values, message: "Couldn't place the bid. Please try again." });
		}
	}
} satisfies Actions;

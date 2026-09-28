import { fail, redirect } from '@sveltejs/kit';
import { ApiError, fieldErrors } from '$lib/api/client';
import { createShipment } from '$lib/api/shipments';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const values = {
			origin: String(data.get('origin') ?? ''),
			destination: String(data.get('destination') ?? ''),
			pickupDate: String(data.get('pickupDate') ?? ''),
			description: String(data.get('description') ?? '')
		};

		try {
			await createShipment(fetch, { ...values, pickupDate: values.pickupDate || null });
		} catch (e) {
			if (e instanceof ApiError && e.status === 400) {
				return fail(400, { values, errors: fieldErrors(e.problem) });
			}
			console.error(e);
			return fail(502, { values, message: "Couldn't save the shipment. Please try again." });
		}

		redirect(303, '/shipper');
	}
} satisfies Actions;

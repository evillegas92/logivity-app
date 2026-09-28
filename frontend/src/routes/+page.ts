import { error } from '@sveltejs/kit';
import { getWeatherForecasts } from '$lib/api/weather-forecasts';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		return { forecasts: await getWeatherForecasts(fetch) };
	} catch (e) {
		console.error(e);
		error(502, 'Could not load weather forecasts from the API.');
	}
};

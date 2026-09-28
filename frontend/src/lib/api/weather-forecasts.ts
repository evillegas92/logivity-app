import { apiGet } from './client';

/** Mirrors logivity-api's `WeatherForecast` model (camelCase via System.Text.Json). */
export interface WeatherForecast {
	id: number;
	/** ISO date, e.g. "2026-09-27" (serialized from `DateOnly`). */
	date: string;
	temperatureC: number;
	summary: string | null;
}

export function getWeatherForecasts(fetchFn: typeof fetch): Promise<WeatherForecast[]> {
	return apiGet<WeatherForecast[]>(fetchFn, '/api/WeatherForecasts');
}

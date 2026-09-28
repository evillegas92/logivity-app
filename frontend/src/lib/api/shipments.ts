import { apiGet, apiPost } from './client';

/** Mirrors logivity-api's `ShipmentStatus` enum (sent as its name). */
export type ShipmentStatus = 'Open';

export const shipmentStatusLabels: Record<ShipmentStatus, string> = {
	Open: 'Open'
};

/** Mirrors logivity-api's `ShipmentResponse` model (camelCase via System.Text.Json). */
export interface Shipment {
	id: number;
	origin: string;
	destination: string;
	/** ISO date, e.g. "2026-10-15" (serialized from `DateOnly`). */
	pickupDate: string;
	description: string;
	status: ShipmentStatus;
	/** ISO timestamp in UTC. */
	createdAt: string;
}

/** Mirrors logivity-api's `CreateShipmentRequest` model. */
export interface CreateShipmentInput {
	origin: string;
	destination: string;
	/** ISO date, or `null` when none was picked (the API rejects that with a field error). */
	pickupDate: string | null;
	description: string;
}

export function getShipments(fetchFn: typeof fetch): Promise<Shipment[]> {
	return apiGet<Shipment[]>(fetchFn, '/api/Shipments');
}

export function createShipment(fetchFn: typeof fetch, input: CreateShipmentInput): Promise<Shipment> {
	return apiPost<Shipment>(fetchFn, '/api/Shipments', input);
}

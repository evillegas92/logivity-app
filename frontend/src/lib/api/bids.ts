import { apiPost } from './client';

/** Mirrors logivity-api's `BidResponse` model (camelCase via System.Text.Json). */
export interface Bid {
	id: number;
	shipmentId: number;
	carrierName: string;
	/** Price in SEK. */
	price: number;
	note: string | null;
	/** ISO timestamp in UTC. */
	createdAt: string;
}

/** Mirrors logivity-api's `CreateBidRequest` model. */
export interface CreateBidInput {
	carrierName: string;
	/** Price in SEK, or `null` when none was entered (the API rejects that with a field error). */
	price: number | null;
	note: string | null;
}

/**
 * Places a bid on a shipment. Throws an `ApiError` with status 404 if the shipment doesn't exist,
 * or 409 if it no longer accepts bids.
 */
export function createBid(fetchFn: typeof fetch, shipmentId: number, input: CreateBidInput): Promise<Bid> {
	return apiPost<Bid>(fetchFn, `/api/shipments/${shipmentId}/bids`, input);
}

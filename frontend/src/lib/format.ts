const dateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' });
const priceFormat = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'SEK' });

/** Formats a price in SEK, e.g. "SEK 12,500.00". */
export function formatPrice(amount: number): string {
	return priceFormat.format(amount);
}

/** Formats an ISO date ("2026-10-15") as "15 Oct 2026", without shifting it across time zones. */
export function formatDate(isoDate: string): string {
	const [year, month, day] = isoDate.split('-').map(Number);
	return dateFormat.format(new Date(year, month - 1, day));
}

/**
 * Formats an ISO timestamp as e.g. "28 Sep 2026, 14:11", in `timeZone`
 * (the runtime's own time zone when omitted).
 */
export function formatDateTime(isoTimestamp: string, timeZone?: string): string {
	return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short', timeZone }).format(
		new Date(isoTimestamp)
	);
}

/** Today's date in the browser's time zone, as an ISO date. */
export function todayIsoDate(): string {
	const now = new Date();
	const pad = (n: number) => String(n).padStart(2, '0');
	return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

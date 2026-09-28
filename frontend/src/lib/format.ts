const dateFormat = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium' });

/** Formats an ISO date ("2026-10-15") as "15 Oct 2026", without shifting it across time zones. */
export function formatDate(isoDate: string): string {
	const [year, month, day] = isoDate.split('-').map(Number);
	return dateFormat.format(new Date(year, month - 1, day));
}

/** Today's date in the browser's time zone, as an ISO date. */
export function todayIsoDate(): string {
	const now = new Date();
	const pad = (n: number) => String(n).padStart(2, '0');
	return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

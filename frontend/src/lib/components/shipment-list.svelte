<script lang="ts">
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import { Badge } from '$lib/components/ui/badge';
	import { shipmentStatusLabels, type Shipment } from '$lib/api/shipments';
	import { formatDate } from '$lib/format';

	let {
		shipments,
		hrefFor
	}: {
		shipments: Shipment[];
		/** When set, each row links to the page this returns. */
		hrefFor?: (shipment: Shipment) => string;
	} = $props();

	const rowClass = 'flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4';
</script>

{#snippet row(shipment: Shipment)}
	<div class="flex min-w-0 flex-col">
		<span class="font-medium">{shipment.origin} → {shipment.destination}</span>
		<span class="text-sm text-muted-foreground">{shipment.description}</span>
	</div>
	<div class="flex shrink-0 items-center gap-3">
		<span class="text-sm">
			<span class="text-muted-foreground">Pickup</span>
			{formatDate(shipment.pickupDate)}
		</span>
		<Badge variant="secondary">{shipmentStatusLabels[shipment.status]}</Badge>
		{#if hrefFor}
			<ChevronRightIcon class="hidden size-4 text-muted-foreground sm:block" aria-hidden="true" />
		{/if}
	</div>
{/snippet}

<ul class="flex flex-col divide-y overflow-hidden rounded-lg border">
	{#each shipments as shipment (shipment.id)}
		<li>
			{#if hrefFor}
				<a
					href={hrefFor(shipment)}
					class="{rowClass} outline-none transition-colors hover:bg-accent focus-visible:bg-accent"
				>
					{@render row(shipment)}
				</a>
			{:else}
				<div class={rowClass}>
					{@render row(shipment)}
				</div>
			{/if}
		</li>
	{/each}
</ul>

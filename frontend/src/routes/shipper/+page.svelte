<script lang="ts">
	import PlusIcon from '@lucide/svelte/icons/plus';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { shipmentStatusLabels } from '$lib/api/shipments';
	import { formatDate } from '$lib/format';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head><title>My shipments · Logivity</title></svelte:head>

<div class="flex items-center justify-between gap-4">
	<h1 class="text-2xl font-semibold">My shipments</h1>
	<Button href="/shipper/shipments/new">
		<PlusIcon data-icon="inline-start" />
		New shipment
	</Button>
</div>

{#if data.shipments.length === 0}
	<p class="text-muted-foreground">You haven't created any shipments yet.</p>
{:else}
	<ul class="flex flex-col divide-y rounded-lg border">
		{#each data.shipments as shipment (shipment.id)}
			<li class="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
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
				</div>
			</li>
		{/each}
	</ul>
{/if}

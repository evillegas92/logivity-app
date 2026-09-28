<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { shipmentStatusLabels, type Shipment } from '$lib/api/shipments';
	import { formatDate } from '$lib/format';

	let { shipments }: { shipments: Shipment[] } = $props();
</script>

<ul class="flex flex-col divide-y rounded-lg border">
	{#each shipments as shipment (shipment.id)}
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

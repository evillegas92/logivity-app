<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { shipmentStatusLabels, type Shipment } from '$lib/api/shipments';
	import { formatDate } from '$lib/format';

	let { shipment }: { shipment: Shipment } = $props();
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Shipment details</Card.Title>
	</Card.Header>
	<Card.Content>
		<dl class="grid gap-4 sm:grid-cols-2">
			<div class="flex flex-col gap-1">
				<dt class="text-muted-foreground">Origin</dt>
				<dd>{shipment.origin}</dd>
			</div>
			<div class="flex flex-col gap-1">
				<dt class="text-muted-foreground">Destination</dt>
				<dd>{shipment.destination}</dd>
			</div>
			<div class="flex flex-col gap-1">
				<dt class="text-muted-foreground">Pickup date</dt>
				<dd>{formatDate(shipment.pickupDate)}</dd>
			</div>
			<div class="flex flex-col gap-1">
				<dt class="text-muted-foreground">Status</dt>
				<dd>{shipmentStatusLabels[shipment.status]}</dd>
			</div>
			<div class="flex flex-col gap-1 sm:col-span-2">
				<dt class="text-muted-foreground">Description</dt>
				<dd class="whitespace-pre-line">{shipment.description}</dd>
			</div>
		</dl>
	</Card.Content>
</Card.Root>

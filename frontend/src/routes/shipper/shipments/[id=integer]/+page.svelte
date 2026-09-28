<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import LocalTime from '$lib/components/local-time.svelte';
	import ShipmentDetails from '$lib/components/shipment-details.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table';
	import { shipmentStatusLabels } from '$lib/api/shipments';
	import { formatPrice } from '$lib/format';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const shipment = $derived(data.shipment);
	const bids = $derived(data.bids);
	const lowestPrice = $derived(bids.length > 0 ? Math.min(...bids.map((bid) => bid.price)) : null);
</script>

<svelte:head><title>{shipment.origin} → {shipment.destination} · Logivity</title></svelte:head>

<div class="flex flex-col gap-1">
	<Button href="/shipper" variant="link" class="w-fit px-0">
		<ArrowLeftIcon data-icon="inline-start" />
		My shipments
	</Button>
	<div class="flex flex-wrap items-center gap-3">
		<h1 class="text-2xl font-semibold">{shipment.origin} → {shipment.destination}</h1>
		<Badge variant="secondary">{shipmentStatusLabels[shipment.status]}</Badge>
	</div>
</div>

<ShipmentDetails {shipment} />

<Card.Root>
	<Card.Header>
		<Card.Title>Bids</Card.Title>
		<Card.Description>
			{#if bids.length === 0}
				No bids yet. Carriers can bid on this shipment while it's open.
			{:else}
				{bids.length === 1 ? '1 bid' : `${bids.length} bids`}, cheapest first.
			{/if}
		</Card.Description>
	</Card.Header>
	{#if bids.length > 0}
		<Card.Content>
			<Table.Root>
				<Table.Header>
					<Table.Row>
						<Table.Head>Carrier</Table.Head>
						<Table.Head class="text-right">Price</Table.Head>
						<Table.Head>Note</Table.Head>
						<Table.Head>Placed</Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each bids as bid (bid.id)}
						<Table.Row>
							<Table.Cell class="font-medium">{bid.carrierName}</Table.Cell>
							<Table.Cell class="text-right tabular-nums">
								<span class="inline-flex items-center justify-end gap-2">
									{#if bids.length > 1 && bid.price === lowestPrice}
										<Badge>Lowest</Badge>
									{/if}
									{formatPrice(bid.price)}
								</span>
							</Table.Cell>
							<Table.Cell class="max-w-sm whitespace-normal">
								{#if bid.note}
									{bid.note}
								{:else}
									<span class="text-muted-foreground">—</span>
								{/if}
							</Table.Cell>
							<Table.Cell class="text-muted-foreground"><LocalTime value={bid.createdAt} /></Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
	{/if}
</Card.Root>

<script lang="ts">
	import ShipmentList from '$lib/components/shipment-list.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head><title>Open shipments · Logivity</title></svelte:head>

<div class="flex flex-col gap-1">
	<h1 class="text-2xl font-semibold">Open shipments</h1>
	<p class="text-muted-foreground">Shipments that are still looking for a carrier.</p>
</div>

{#if data.shipments.length === 0}
	<p class="text-muted-foreground">There are no open shipments right now.</p>
{:else}
	<ShipmentList shipments={data.shipments} hrefFor={(shipment) => `/carrier/shipments/${shipment.id}`} />
{/if}

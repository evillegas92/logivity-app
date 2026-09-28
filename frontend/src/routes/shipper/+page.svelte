<script lang="ts">
	import PlusIcon from '@lucide/svelte/icons/plus';
	import ShipmentList from '$lib/components/shipment-list.svelte';
	import { Button } from '$lib/components/ui/button';
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
	<ShipmentList shipments={data.shipments} hrefFor={(shipment) => `/shipper/shipments/${shipment.id}`} />
{/if}

<script lang="ts">
	import { enhance } from '$app/forms';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import CircleCheckIcon from '@lucide/svelte/icons/circle-check';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { shipmentStatusLabels } from '$lib/api/shipments';
	import { formatDate, formatPrice } from '$lib/format';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

	const shipment = $derived(data.shipment);
	const acceptsBids = $derived(shipment.status === 'Open');

	let submitting = $state(false);

	const errors: Record<string, string[] | undefined> = $derived(form?.errors ?? {});
	const toFieldErrors = (messages: string[] | undefined) => messages?.map((message) => ({ message }));
</script>

<svelte:head><title>{shipment.origin} → {shipment.destination} · Logivity</title></svelte:head>

<div class="flex flex-col gap-1">
	<Button href="/carrier" variant="link" class="w-fit px-0">
		<ArrowLeftIcon data-icon="inline-start" />
		Open shipments
	</Button>
	<div class="flex flex-wrap items-center gap-3">
		<h1 class="text-2xl font-semibold">{shipment.origin} → {shipment.destination}</h1>
		<Badge variant="secondary">{shipmentStatusLabels[shipment.status]}</Badge>
	</div>
</div>

<div class="grid items-start gap-6 lg:grid-cols-[1fr_24rem]">
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

	<Card.Root>
		<Card.Header>
			<Card.Title>Place a bid</Card.Title>
			<Card.Description>Other carriers can't see your bid.</Card.Description>
		</Card.Header>
		<Card.Content class="flex flex-col gap-6">
			{#if form?.bid}
				<p
					role="status"
					class="flex items-start gap-2 rounded-md bg-secondary p-3 text-secondary-foreground"
				>
					<CircleCheckIcon class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
					<span>
						Your bid of <strong>{formatPrice(form.bid.price)}</strong> was placed. You can place
						another one if you like.
					</span>
				</p>
			{/if}

			{#if acceptsBids}
				<form
					method="POST"
					use:enhance={() => {
						submitting = true;
						return async ({ update }) => {
							await update();
							submitting = false;
						};
					}}
				>
					<Field.Group>
						<Field.Field data-invalid={errors.carrierName ? true : undefined}>
							<Field.Label for="carrierName">Carrier name</Field.Label>
							<Input
								id="carrierName"
								name="carrierName"
								required
								maxlength={100}
								autocomplete="organization"
								placeholder="e.g. Nordic Freight AB"
								value={form?.values?.carrierName ?? form?.bid?.carrierName ?? ''}
								aria-invalid={errors.carrierName ? true : undefined}
							/>
							<Field.Error errors={toFieldErrors(errors.carrierName)} />
						</Field.Field>

						<Field.Field data-invalid={errors.price ? true : undefined}>
							<Field.Label for="price">Price (SEK)</Field.Label>
							<Input
								id="price"
								name="price"
								type="number"
								required
								min={1}
								max={100000000}
								step={0.01}
								inputmode="decimal"
								placeholder="e.g. 12500"
								value={form?.values?.price ?? ''}
								aria-invalid={errors.price ? true : undefined}
							/>
							<Field.Error errors={toFieldErrors(errors.price)} />
						</Field.Field>

						<Field.Field data-invalid={errors.note ? true : undefined}>
							<Field.Label for="note">Note <span class="text-muted-foreground">(optional)</span></Field.Label>
							<Textarea
								id="note"
								name="note"
								maxlength={500}
								rows={3}
								placeholder="e.g. Can pick up a day early"
								value={form?.values?.note ?? ''}
								aria-invalid={errors.note ? true : undefined}
							/>
							<Field.Error errors={toFieldErrors(errors.note)} />
						</Field.Field>

						{#if form?.message}
							<p role="alert" class="text-sm text-destructive">{form.message}</p>
						{/if}

						<Button type="submit" disabled={submitting} class="w-fit">
							{submitting ? 'Placing bid…' : 'Place bid'}
						</Button>
					</Field.Group>
				</form>
			{:else}
				<p class="text-muted-foreground">This shipment is no longer accepting bids.</p>
			{/if}
		</Card.Content>
	</Card.Root>
</div>

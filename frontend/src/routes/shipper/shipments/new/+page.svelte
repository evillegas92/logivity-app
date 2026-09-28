<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { Button } from '$lib/components/ui/button';
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { todayIsoDate } from '$lib/format';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();

	let submitting = $state(false);
	// Set in the browser so "today" is the shipper's local date, not the server's.
	let minPickupDate = $state<string>();
	onMount(() => {
		minPickupDate = todayIsoDate();
	});

	const errors: Record<string, string[] | undefined> = $derived(form?.errors ?? {});
	const toFieldErrors = (messages: string[] | undefined) => messages?.map((message) => ({ message }));
</script>

<svelte:head><title>New shipment · Logivity</title></svelte:head>

<div class="flex flex-col gap-1">
	<Button href="/shipper" variant="link" class="w-fit px-0">
		<ArrowLeftIcon data-icon="inline-start" />
		My shipments
	</Button>
	<h1 class="text-2xl font-semibold">New shipment</h1>
	<p class="text-muted-foreground">Carriers will see it as an open shipment and can bid on it.</p>
</div>

<form
	method="POST"
	class="max-w-xl"
	use:enhance={() => {
		submitting = true;
		return async ({ update }) => {
			await update({ reset: false });
			submitting = false;
		};
	}}
>
	<Field.Group>
		<div class="grid gap-6 sm:grid-cols-2">
			<Field.Field data-invalid={errors.origin ? true : undefined}>
				<Field.Label for="origin">Origin</Field.Label>
				<Input
					id="origin"
					name="origin"
					required
					maxlength={200}
					placeholder="e.g. Rotterdam, NL"
					value={form?.values.origin ?? ''}
					aria-invalid={errors.origin ? true : undefined}
				/>
				<Field.Error errors={toFieldErrors(errors.origin)} />
			</Field.Field>

			<Field.Field data-invalid={errors.destination ? true : undefined}>
				<Field.Label for="destination">Destination</Field.Label>
				<Input
					id="destination"
					name="destination"
					required
					maxlength={200}
					placeholder="e.g. Gothenburg, SE"
					value={form?.values.destination ?? ''}
					aria-invalid={errors.destination ? true : undefined}
				/>
				<Field.Error errors={toFieldErrors(errors.destination)} />
			</Field.Field>
		</div>

		<Field.Field data-invalid={errors.pickupDate ? true : undefined} class="sm:max-w-[calc(50%-0.75rem)]">
			<Field.Label for="pickupDate">Pickup date</Field.Label>
			<Input
				id="pickupDate"
				name="pickupDate"
				type="date"
				required
				min={minPickupDate}
				value={form?.values.pickupDate ?? ''}
				aria-invalid={errors.pickupDate ? true : undefined}
			/>
			<Field.Error errors={toFieldErrors(errors.pickupDate)} />
		</Field.Field>

		<Field.Field data-invalid={errors.description ? true : undefined}>
			<Field.Label for="description">Description</Field.Label>
			<Textarea
				id="description"
				name="description"
				required
				maxlength={500}
				rows={3}
				placeholder="What's being shipped, e.g. 12 pallets of packaged electronics, 4.8 t"
				value={form?.values.description ?? ''}
				aria-invalid={errors.description ? true : undefined}
			/>
			<Field.Description>A short summary for carriers, up to 500 characters.</Field.Description>
			<Field.Error errors={toFieldErrors(errors.description)} />
		</Field.Field>

		{#if form?.message}
			<p role="alert" class="text-sm text-destructive">{form.message}</p>
		{/if}

		<div class="flex gap-3">
			<Button type="submit" disabled={submitting}>
				{submitting ? 'Creating…' : 'Create shipment'}
			</Button>
			<Button href="/shipper" variant="outline">Cancel</Button>
		</div>
	</Field.Group>
</form>

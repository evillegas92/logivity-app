<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<main class="flex flex-col gap-4 p-8">
	<h1 class="text-2xl font-semibold">Weather forecasts</h1>

	{#if data.forecasts.length === 0}
		<p class="text-muted-foreground">No weather forecasts yet.</p>
	{:else}
		<ul class="flex flex-col divide-y rounded-lg border">
			{#each data.forecasts as forecast (forecast.id)}
				<li class="flex items-center justify-between gap-4 px-4 py-3">
					<div class="flex flex-col">
						<span class="font-medium">{forecast.date}</span>
						<span class="text-sm text-muted-foreground">{forecast.summary ?? 'No summary'}</span>
					</div>
					<span class="tabular-nums">{forecast.temperatureC} °C</span>
				</li>
			{/each}
		</ul>
	{/if}
</main>

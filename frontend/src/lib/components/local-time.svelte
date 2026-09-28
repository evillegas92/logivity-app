<script lang="ts">
	import { onMount } from 'svelte';
	import { formatDateTime } from '$lib/format';

	/** An ISO timestamp, e.g. from an API `createdAt` field. */
	let { value }: { value: string } = $props();

	// The server doesn't know the viewer's time zone, so server-rendered HTML shows UTC and the
	// browser switches to local time once the page has loaded.
	let inBrowser = $state(false);
	onMount(() => {
		inBrowser = true;
	});

	const text = $derived(inBrowser ? formatDateTime(value) : `${formatDateTime(value, 'UTC')} UTC`);
</script>

<time datetime={value}>{text}</time>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import ArrowLeftRightIcon from '@lucide/svelte/icons/arrow-left-right';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { roles, type Role } from '$lib/roles';

	let { role, children }: { role: Role; children: Snippet } = $props();

	const info = $derived(roles[role]);
</script>

<header class="flex items-center justify-between gap-4 border-b px-8 py-4">
	<div class="flex items-center gap-3">
		<a href={info.href} class="text-lg font-semibold">Logivity</a>
		<Badge variant="secondary">
			<info.icon data-icon="inline-start" />
			{info.label}
		</Badge>
	</div>
	<Button href="/" variant="ghost" size="sm">
		<ArrowLeftRightIcon data-icon="inline-start" />
		Switch role
	</Button>
</header>

<main class="flex flex-col gap-4 p-8">
	{@render children()}
</main>

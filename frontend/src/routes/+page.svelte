<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { roles } from '$lib/roles';
</script>

<svelte:head><title>Logivity</title></svelte:head>

<main class="mx-auto flex max-w-3xl flex-col gap-6 p-8">
	<div class="flex flex-col gap-1">
		<h1 class="text-2xl font-semibold">Welcome to Logivity</h1>
		<p class="text-muted-foreground">Choose how you want to use the marketplace.</p>
	</div>

	<div class="grid gap-4 sm:grid-cols-2">
		{#each Object.values(roles) as role (role.id)}
			<a href={role.href} class="group rounded-xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
				<Card.Root class="h-full transition-colors group-hover:bg-accent">
					<Card.Header>
						<role.icon class="mb-2 size-6 text-link" />
						<Card.Title>Continue as {role.label}</Card.Title>
						<Card.Description>{role.description}</Card.Description>
					</Card.Header>
				</Card.Root>
			</a>
		{/each}
	</div>

	<p class="text-sm text-muted-foreground">
		The role is part of each page's address, so you can use both at once: open one role here and the
		other in a new tab.
	</p>
</main>

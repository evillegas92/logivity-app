<script lang="ts">
	import RoleShell from '$lib/components/role-shell.svelte';

	let { children } = $props();
</script>

<RoleShell role="carrier">
	{@render children()}
</RoleShell>

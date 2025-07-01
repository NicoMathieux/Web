<script setup lang="ts">
defineProps<{
	links: Array<Array<String>>;
}>();
</script>

<template>
	<div class="mb-[40px] font-slussen">
		<PrismicLink
			:field="makePrismicLink('/')"
			class="transition-all border-b border-snow/0 hover:border-snow/100"
			>Accueil</PrismicLink
		>
		<span v-for="(link, index) in links">
			>
			<PrismicLink
				:field="makePrismicLink(link[1])"
				class="transition-all border-b border-snow/0 hover:border-snow/100"
				><h1 v-if="index === links.length - 1" class="inline font-bold">
					{{ link[0] }}
				</h1>
				<span v-else>{{ link[0] }}</span></PrismicLink
			></span
		>
	</div>
</template>

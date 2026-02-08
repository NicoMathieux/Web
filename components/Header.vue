<script setup lang="ts">
defineProps<{
	title: String;
	subtitle: String;
    withoutMarginBottom?: Boolean;
}>();
</script>

<template>
	<div
		class="flex items-center justify-between border-b border-snow/50 pb-[12px]"
        :class="{ 'mb-[24px]': !withoutMarginBottom }"
	>
		<div class="font-vermin text-s"><h2>{{ title }}</h2></div>
		<div class="flex gap-[6px] items-center">
			<span class="font-slussen text-right">{{ subtitle }}</span>
			<div class="w-[11px] h-[11px] bg-snow rounded-full mb-[4px]"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
    link: Object,
    revertColors?: Boolean,
    withArrow?: Boolean
}>()
</script>

<template>
    <PrismicLink class="inline-block font-slussen p-[12px] relative" :field="link">
        <img class="absolute top-1/2 -translate-y-1/2 left-0 -z-1 w-full h-[35px] object-fill" :src="revertColors ? '/assets/images/btn-brush-white.png' : '/assets/images/btn-brush.png'" />
        <div class="z-0 relative flex gap-[8px] items-center" :class="{ 'text-forest': revertColors }">{{ link.text || link.url }}<img v-if="withArrow" class="h-[15px] inline-block" src="/assets/images/arrow-forest.png" /></div>
    </PrismicLink>
</template>

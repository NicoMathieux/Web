<script setup lang="ts">
defineProps<{
    link: Object,
}>()
</script>

<template>
    <PrismicLink class="inline-block font-slussen p-[12px] relative" :field="link">
        <img class="absolute top-1/2 -translate-y-1/2 left-0 -z-1 w-full h-[35px] object-fill" src="/assets/images/btn-brush.png" />
        <span class="z-0 relative">{{ link.text || link.url }}</span>
    </PrismicLink>
</template>

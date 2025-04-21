<script setup lang="ts">
defineProps<{
    link: Object,
}>()
</script>

<template>
    <PrismicLink class="inline-block font-slussen p-[12px] bg-forest" :field="link" />
</template>

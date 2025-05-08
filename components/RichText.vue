<script setup lang="ts">
defineProps<{
    field: Object,
}>()
</script>

<template>
    <PrismicRichText :field wrapper="div" class="rich-text"/>
</template>

<style>
.rich-text p:not(:first-child) {
    margin-top: 20px;
}
</style>
<script setup lang="ts">
defineProps<{
    place: String,
    date: String,
}>()
</script>

<template>
    <div v-if="place && date" class="font-slussen m-[12px] lg:m-[24px] opacity-75 absolute top-0 left-0 z-[1]">
        <div>*{{ place }}</div>
        <div>{{ formatDate(date) }}</div>
    </div>
</template>

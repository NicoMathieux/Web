<script setup lang="ts">
defineProps<{
    link: Object,
}>()
</script>

<template>
    <div class="fixed bottom-[24px] right-[24px] z-[2]">
        <PrismicLink :field="link" class="relative inline-block rotate-[12deg]">
            <img class="-z-1 w-[100px] h-[100px] object-fill" src="/assets/images/circle.png" />
            <span class="z-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-slussen font-bold text-forest"><slot /></span>
        </PrismicLink>
    </div>
</template>

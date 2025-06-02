<script setup lang="ts">
defineProps<{
    image: Object,
    place?: String,
    date?: String,
    width?: String,
    height?: String
}>()
</script>

<template>
    <div :style="{ width, height }" class="relative custom-image overflow-hidden">
        <PrismicImage :field="image" class="object-cover w-full h-full" />
        <ImageDetails v-if="place && date" :place :date />
        <div v-else class="corners-container absolute w-full h-full top-0 left-0 p-[12px] lg:p-[24px] flex flex-col justify-between pointer-events-none">
            <div>
                <div class="tl"></div>
                <div class="tr"></div>
            </div>
            <div>
                <div class="bl"></div>
                <div class="br"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.corners-container > div {
    @apply w-full flex justify-between;

    & > div {
        @apply h-[8px] w-[8px] border-snow/75;

        &.tl {
            @apply border-t-[1.5px] border-l-[1.5px];
        }

        &.tr {
            @apply border-t-[1.5px] border-r-[1.5px];
        }

        &.bl {
            @apply border-b-[1.5px] border-l-[1.5px];
        }

        &.br {
            @apply border-b-[1.5px] border-r-[1.5px];
        }
    }
}
</style>
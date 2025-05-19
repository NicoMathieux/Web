<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.DoubleCardsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div class="grid grid-cols-2 gap-[24px]">
      <div class="flex flex-col gap-[24px]">
        <div
          class="flex items-center justify-between border-b border-snow/50 pb-[12px]"
        >
          <div class="font-vermin text-s">{{ slice.primary.left[0].title }}</div>
          <div class="flex gap-[4px] items-center">
            <span class="font-slussen">{{ slice.primary.left[0].subtitle }}</span>
            <div class="w-[11px] h-[11px] bg-snow rounded-full"></div>
          </div>
        </div>
        <CustomImage class="h-[400px]" :image="slice.primary.left[0].image" />
        <div class="font-slussen"><RichText :field="slice.primary.left[0].text" /></div>
      </div>
      <div class="flex flex-col gap-[24px]">
        <div
          class="flex items-center justify-between border-b border-snow/50 pb-[12px]"
        >
          <div class="font-vermin text-s">{{ slice.primary.right[0].title }}</div>
          <div class="flex gap-[4px] items-center">
            <span class="font-slussen">{{ slice.primary.right[0].subtitle }}</span>
            <div class="w-[11px] h-[11px] bg-snow rounded-full"></div>
          </div>
        </div>
        <CustomImage class="h-[400px]" :image="slice.primary.right[0].image" />
        <div class="font-slussen"><RichText :field="slice.primary.right[0].text" /></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.TitleTextImageSlice>([
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
    <div
      class="flex items-center justify-between border-b border-snow/50 pb-[12px] mb-[24px]"
    >
      <div class="font-vermin text-s">{{ slice.primary.title }}</div>
      <div class="flex gap-[4px] items-center">
        <span class="font-slussen">{{ slice.primary.subtitle }}</span>
        <div class="w-[11px] h-[11px] bg-snow rounded-full"></div>
      </div>
    </div>

      <div v-if="slice.primary.image" class="grid grid-cols-5">
        <div class="col-span-2">
          <div class="font-slussen"><RichText :field="slice.primary.text" /></div>
          <div class="mt-[18px]"><CustomButton :link="slice.primary.link" /></div>
        </div>
        <CustomImage :image="slice.primary.image" :date="slice.primary.image_date" :place="slice.primary.image_place" class="col-span-2 col-end-6" />
      </div>
  </section>
</template>


<style scoped>
.custom-image {
  height: 600px;
}
</style>
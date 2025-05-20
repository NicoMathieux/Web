<script setup lang="ts">
import type { Content } from "@prismicio/client";

const props = defineProps(
  getSliceComponentProps<Content.TwoImagesSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const withText = ref(props.slice.variation === "withText");
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
  >
    <div v-if="!withText" class="grid grid-cols-2 gap-[24px]">
      <CustomImage :image="slice.primary.left_image" />
      <CustomImage :image="slice.primary.right_image" />
    </div>
    <div v-else class="grid grid-cols-2 gap-[24px]">
      <div class="flex flex-col gap-[24px]">
        <CustomImage :image="slice.primary.left[0].image" />
        <RichText class="font-slussen" :field="slice.primary.left[0].text" />
      </div>
      <div class="flex flex-col gap-[24px]">
        <CustomImage :image="slice.primary.right[0].image" />
        <RichText class="font-slussen" :field="slice.primary.right[0].text" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.custom-image {
  width: 100%;
  height: 650px;
}
</style>
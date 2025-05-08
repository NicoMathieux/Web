<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.TwoImagesSlice>([
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
    <div class="flex justify-between gap-[24px]">
      <CustomImage :image="slice.primary.left_image" />
      <CustomImage :image="slice.primary.right_image" />
    </div>
  </section>
</template>

<style scoped>
.custom-image {
  width: 100%;
  height: 650px;
}
</style>
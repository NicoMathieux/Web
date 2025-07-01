<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.TextSlice>([
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
    <div v-if="slice.primary.title" class="font-rader leading-[35px] lg:leading-[50px] text-l lg:text-xl mb-[24px] w-full lg:w-[80%]">{{ slice.primary.title }}</div>
    <div class="font-slussen w-full lg:w-[80%]"><RichText :field="slice.primary.text" /></div>
  </section>
</template>

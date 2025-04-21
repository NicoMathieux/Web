<script setup lang="ts">
import type { Content } from "@prismicio/client";

// The array passed to `getSliceComponentProps` is purely optional.
// Consider it as a visual hint for you when templating your slice.
defineProps(
  getSliceComponentProps<Content.FullWidthTextSlice>([
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
    <div class="font-slussen mb-12">{{ slice.primary.title }}</div>
    <div class="font-rader text-xl w-[80%]"><PrismicRichText :field="slice.primary.text" /></div>
  </section>
</template>

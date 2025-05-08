<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.YoutubeVideoSlice>([
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
    <PrismicEmbed :field="slice.primary.link" class="youtube-video" />
  </section>
</template>

<style>
.youtube-video > iframe {
  width: 100vw;
  transform: translateX(-60px);
  height: calc(100vw * 9 / 16);
}
</style>
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
.youtube-video {
  display: flex;
  align-items: center;
  justify-content: center;

  & > iframe {
    @media (width < 1024px) {
      width: 100vw;
      height: calc(100vw * 9 / 16);
    }

    @media (width >= 1024px) {
      width: 80vw;
      height: calc(80vw * 9 / 16);
    }
  }
}
</style>

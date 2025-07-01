<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.LinksListSlice>([
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
    <Header :title="slice.primary.title" :subtitle="slice.primary.subtitle" />

    <div>
      <div v-for="link in slice.primary.links">
        <div v-if="link.link.url" class="flex justify-between items-end border-b border-snow/50 py-[24px]">
          <h3><PrismicLink :field="link.link" class="font-rader text-l lg:text-xl leading-[90%] lg:leading-[80%]" /></h3>
          <span class="font-slussen text-right">{{ link.subtitle }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

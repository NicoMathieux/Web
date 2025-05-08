<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.NumbersListSlice>([
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
  <div class="grid" :style="{ gridTemplateColumns: `repeat(${slice.primary.numbers.length}, minmax(0, 1fr))`}">
    <div v-for="(item, index) in slice.primary.numbers" class="flex flex-col items-center gap-12 border-snow/75" :class="{ 'border-r': index < (slice.primary.numbers.length - 1) }">
      <div class="font-rader"><span class="text-xl">{{ item.number }}</span><span v-if="item.unit" class="text-m ml-[5px]">{{ item.unit }}</span></div>
      <div class="font-slussen text-center">{{ item.description }}</div>
    </div>
  </div>
  </section>
</template>

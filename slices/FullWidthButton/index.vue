<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.FullWidthButtonSlice>([
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
    class="w-full bg-forest px-[60px] py-[48px] flex justify-between items-center"
  >
    <div class="font-rader text-xl w-[350px] leading-[110%]">{{ slice.primary.text }}</div>
    <CustomButton :link="slice.primary.link" :revertColors="true" :withArrow="true" />
  </section>
</template>

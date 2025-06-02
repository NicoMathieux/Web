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
    class="w-full bg-forest p-[30px] lg:px-[60px] lg:py-[48px] flex flex-col lg:flex-row justify-between items-center"
  >
    <div class="font-rader text-l lg:text-xl w-full lg:w-[350px] leading-[110%] mb-[16px] lg:mb-[0px]">{{ slice.primary.text }}</div>
    <CustomButton :link="slice.primary.link" :revertColors="true" :withArrow="true" />
  </section>
</template>

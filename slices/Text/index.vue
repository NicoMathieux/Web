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

const { isShopOn } = useShop();
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    v-if="!(slice.primary.shop_related && !isShopOn)"
  >
    <div v-if="slice.primary.title" class="font-rader leading-[35px] lg:leading-[50px] text-l lg:text-xl mb-[24px] w-full lg:w-[80%]">{{ slice.primary.title }}</div>
    <div class="font-slussen w-full lg:w-[80%]"><RichText :field="slice.primary.text" /></div>
  </section>
</template>

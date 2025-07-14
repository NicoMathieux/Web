<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.FullWidthTextSlice>([
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
    <div v-if="slice.primary.title" class="font-slussen mb-12">{{ slice.primary.title }}</div>
    <div class="font-rader leading-[35px] lg:leading-[50px] text-l lg:text-xl w-[80%]"><RichText :field="slice.primary.text" /></div>
  </section>
</template>

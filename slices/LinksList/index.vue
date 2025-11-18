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

const { isShopOn } = useShop();
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    v-if="!(slice.primary.shop_related && !isShopOn)"
  >
    <Header :title="slice.primary.title" :subtitle="slice.primary.subtitle" />

    <div>
      <div v-for="link in slice.primary.links">
        <PrismicLink v-if="link.link.url" :field="link.link" class="flex justify-between items-end border-b border-snow/50 py-[24px]">
          <h3 class="font-rader text-l lg:text-xl leading-[90%] lg:leading-[80%]">{{ link.link.text }}</h3>
          <span class="font-slussen text-right">{{ link.subtitle }}</span>
        </PrismicLink>
      </div>
    </div>
  </section>
</template>

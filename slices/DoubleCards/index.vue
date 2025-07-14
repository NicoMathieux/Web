<script setup lang="ts">
import type { Content } from "@prismicio/client";

defineProps(
  getSliceComponentProps<Content.DoubleCardsSlice>([
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
    <div class="flex flex-col lg:grid lg:grid-cols-2 gap-[80px] lg:gap-[24px]">
      <div class="flex flex-col gap-[24px]">
        <Header :title="slice.primary.left[0].title" :subtitle="slice.primary.left[0].subtitle" :withoutMarginBottom="true" />
        <CustomImage class="h-[200px] lg:h-[400px]" :image="slice.primary.left[0].image" />
        <div class="font-slussen"><RichText :field="slice.primary.left[0].text" /></div>
      </div>
      <div class="flex flex-col gap-[24px]">
        <Header :title="slice.primary.right[0].title" :subtitle="slice.primary.right[0].subtitle" :withoutMarginBottom="true" />
        <CustomImage class="h-[200px] lg:h-[400px]" :image="slice.primary.right[0].image" />
        <div class="font-slussen"><RichText :field="slice.primary.right[0].text" /></div>
      </div>
    </div>
  </section>
</template>

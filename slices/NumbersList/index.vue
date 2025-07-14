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

const { isMobile } = useDevice();

const { isShopOn } = useShop();
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    v-if="!(slice.primary.shop_related && !isShopOn)"
  >
  <div class="grid gap-y-[48px] lg:gap-y-[0px]" :style="{ gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : `repeat(${slice.primary.numbers.length}, minmax(0, 1fr))`}">
    <div v-for="(item, index) in slice.primary.numbers" class="flex flex-col items-center gap-12 border-snow/75" :class="{ 'border-r': isMobile ? (index < (slice.primary.numbers.length - 1) && (index % 2 === 0)) : index < (slice.primary.numbers.length - 1), 'col-span-2': isMobile && (index === (slice.primary.numbers.length - 1)) && (slice.primary.numbers.length % 2 === 1) }">
      <div class="font-rader leading-[90%]"><span class="text-xl">{{ item.number }}</span><span v-if="item.unit" class="text-m ml-[5px]">{{ item.unit }}</span></div>
      <div class="font-slussen text-center">{{ item.description }}</div>
    </div>
  </div>
  </section>
</template>
